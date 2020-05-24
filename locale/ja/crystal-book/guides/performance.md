# パフォーマンス

これらのTipsに従って、あなたのプログラムを速度とメモリ使用の両面で最高のものにしましょう。

## 早まった最適化

かつてドナルド・クヌースは言いました。

> 小さな効率性については考えないようにすべきであって、その97％において、早まった最適化は諸悪の根源である。ただし、クリティカルな3%についてまでその機会を逃してはらならい。

とはいえ、もしプログラムを書いている際に「意味的に同じ内容をより早く実行できるバージョン」がちょっとした変更で実現できるのであれば、その機会を見逃す手はありません。

そして、常に自分のプログラムをプロファイリングして、ボトルネックがどこにあるのかを確認するようにしましょう。プロファイリングには、macOS上であればXCodeに含まれている [Instruments Time Profiler](https://developer.apple.com/library/prerelease/content/documentation/DeveloperTools/Conceptual/InstrumentsUserGuide/Instrument-TimeProfiler.html) が利用できます。Linux であれば、[perf](https://perf.wiki.kernel.org/index.php/Main_Page) や [Callgrind](http://valgrind.org/docs/manual/cl-manual.html) のような、C/C++ プログラムをプロファイリング可能な仕組みが大抵は動作するでしょう。.

なお、プログラムのプロファイリングを行う際は、必ずコンパイルする際や実行時に `--release` フラグをつけて最適化を有効にするようにしてください。

## メモリの割り当てを避ける

プログラムの中で実施可能な一番良い最適化は、余分な/無用なメモリの割り当てを避けることです。メモリの割り当ては**クラス**のインスタンスを生成することで起き、結果としてヒープメモリが割り当てられます。**構造体**のインスタンスを使用する場合はスタックメモリ が使用されるので、パフォーマンス上のペナルティ発生しません。スタックメモリとヒープメモリの違いがわからない場合は、[ここを読んでみてください](https://stackoverflow.com/questions/79923/what-and-where-are-the-stack-and-heap)。

ヒープメモリの割り当ては低速で、後々そのメモリを解放するガーベジコレクタ（GC）に負荷をかけます。

ヒープメモリの割り当てを回避する方法はいくつかあります。標準ライブラリはそのようにデザインされているので参考になるでしょう。

### IOに書き込む際に中間的な文字列を生成しない

数値を標準出力へ書き出す際にはこう書きます。

```
puts 123
```

こうした際、多くのプログラミング言語では、`to_s`やそれに類する「オブジェクトを文字列表現に変換するメソッド」を実行し、その文字列を標準出力へ書きんでいます。そうした方法でも動作はしますが、そのためには書き込んだら廃棄するだけの中間的な文字列が、ヒープメモリ上に生成されることになります。これにより、ヒープメモリの割り当てが発生し、GCにちょっとした負荷がかかります。

Crystalでは、 `puts`はそれぞれのオブジェクトの`to_s(io)`に、そのオブジェクトの文字列表現を書き出したいIOを渡して実行します。

ですので、以下のようなことは決してしないでください。

```
puts 123.to_s
```

これでは、わざわざ中間文字列を作ってしまいます。常にIOへ直接オブジェクトを追加するようにしましょう。

独自の型を書く場合は、必ず`to_s`ではなく`to_s(io)`をオーバーライドするようにして、その中でも中間的な文字列を生成しないように注意してください。例をあげます。

```crystal
class MyClass
  # 良い方法
  def to_s(io)
    # 中間的な文字列を生成せずに "1, 2" を IO に追加する
    x = 1
    y = 2
    io << x << ", " << y
  end

  # 良くない方法
  def to_s(io)
    x = 1
    y = 2
    # 文字列の式展開により中間的な文字列を生成している
    # これは避けるべき
    io << "#{x}, #{y}"
  end
end
```

「中間文字列を返すのではなくIOに追加する」というこの哲学は、中間的な文字列を扱うよりも結果的に良いパフォーマンスを実現します。こうした戦略をあなた自身のAPI定義でも使用してください。

実行時間を比較してみましょう。

```crystal
# io_benchmark.cr
require "benchmark"

io = IO::Memory.new

Benchmark.ips do |x|
  x.report("without to_s") do
    io << 123
    io.clear
  end

  x.report("with to_s") do
    io << 123.to_s
    io.clear
  end
end
```

出力はこうなります。

```
$ crystal run --release io_benchmark.cr
without to_s  77.11M ( 12.97ns) (± 1.05%)       fastest
   with to_s  18.15M ( 55.09ns) (± 7.99%)  4.25× slower
```

常に忘れてならないのは、これが単に実行時間が短縮したというだけでなく、メモリ使用量の削減という面でも効果があると言うことです。

### 文字列の結合ではなく式展開を使う

しばしば、文字列リテラルと他の値とを組み合わせて文字列を直接構築しなければならいことがあります。このような文字列の構築では、`String#+(String)`メソッドによって文字列を結合するのではなく、文字列リテラルの中に式を埋め込める[文字列の式展開](../syntax_and_semantics/literals/string.html#interpolation)を使用しましょう。 `"Hello, #{name}"` の方が、`"Hello, " +  name.to_s`よりも良い結果になります。

式展開を含む文字列は、コンパイラによってIOへ追加する形に変換され、中間文字列の生成を自動的に回避します。上の例はこのように変換されます。
```crystal
String.build do |io|
  io << "Hello, " << name
end
```

### 文字列の構築にIOの割り当てを避ける

文字列の構築には、中間的な`IO::Memory`を使用するのではなく、文字列構築に最適化された`String.build`を使用するようにしましょう。

```crystal
require "benchmark"

Benchmark.ips do |bm|
  bm.report("String.build") do
    String.build do |io|
      99.times do
        io << "hello world"
      end
    end
  end

  bm.report("IO::Memory") do
    io = IO::Memory.new
    99.times do
      io << "hello world"
    end
    io.to_s
  end
end
```

出力はこうなります。

```
$ crystal run --release str_benchmark.cr
String.build 597.57k (  1.67µs) (± 5.52%)       fastest
  IO::Memory 423.82k (  2.36µs) (± 3.76%)  1.41× slower
```


### 何度も何度も一時的なオブジェクトを生成しない

以下のプログラムについて考えてみましょう。

```crystal
lines_with_language_reference = 0
while line = gets
  if ["crystal", "ruby", "java"].any?{ |string| line.includes?(string) }
    lines_with_language_reference += 1
  end
end
puts "Lines that mention crystal, ruby or java: #{lines_with_language_reference}"
```

上記のプログラムはちゃんと動作しますが、繰り返しのたびに`["crystal", "ruby", "java"]`を新しい配列として生成するという大きなパフォーマンス上の問題を抱えています。配列リテラルは新しい配列を作成してそこに値をいくつか追加するという処理のシンタックスシュガーでしかないことを忘れないでください。そのため、ここでは何度も何度もメモリの割り当てが行われています。

これを解決するには2つの方法があります。

1. タプルを使う。上記プログラムで `{"crystal", "ruby", "java"}`を使用すると、同じようにちゃんと動作しますが、タプルはヒープメモリをつかわないため、より高速でメモリ消費が少なく、コンパイラに対してプログラムを最適化するより多くの機会を提供できます。

```crystal
lines_with_language_reference = 0
while line = gets
  if {"crystal", "ruby", "java"}.any?{ |string| line.includes?(string) }
    lines_with_language_reference += 1
  end
end
puts "Lines that mention crystal, ruby or java: #{lines_with_language_reference}"
```

2. 配列を定数にする

```crystal
LANGS = ["crystal", "ruby", "java"]

lines_with_language_reference = 0
while line = gets
  if LANGS.any?{ |string| line.includes?(string) }
    lines_with_language_reference += 1
  end
end
puts "Lines that mention crystal, ruby or java: #{lines_with_language_reference}"
```

タプルを使用する方が推奨される方法です。

ループ内での明示的に配列リテラルを使うことは、一時的なオブジェクトが生成される状況の1つのですが、一時的なオブジェクトはメソッド呼び出しによっても生成される場合があります。例えば、`Hash#keys` は実行されるたびにキーを含む新しい配列を返します。代わりに`Hash#each_key`や`Hash#has_key?`といった他のメソッドを使用しましょう。

### 可能な場合には構造体を使用する

独自の型を  **クラス** ではなく **構造体** として定義すると、ヒープメモリよりも低負荷でGCに負担もかけないスタックメモリ上にインスタンスを生成します。

しかし、いつでも構造体を使えば良いわけではありません。struct は値渡しされるので、メソッドに渡した構造体がそのメソッド内で変更された場合に、メソッドを呼び出した側がその変更を感知できず、バグの温床となりえます。構造体は不変なオブジェクトで、特にそれが小さい場合にのみ使用するのが最適な方法です。

例をあげます。

```crystal
# class_vs_struct.cr
require "benchmark"

class PointClass
  getter x
  getter y

  def initialize(@x : Int32, @y : Int32)
  end
end

struct PointStruct
  getter x
  getter y

  def initialize(@x : Int32, @y : Int32)
  end
end

Benchmark.ips do |x|
  x.report("class") { PointClass.new(1, 2) }
  x.report("struct") { PointStruct.new(1, 2) }
end
```

出力はこうなります。

```
$ crystal run --release class_vs_struct.cr
 class  28.17M (± 2.86%) 15.29× slower
struct 430.82M (± 6.58%)       fastest
```

## 文字列に対する繰り返し処理

Crystalの文字列はUTF-8のコードポイントから構成されています。UTF-8は可変長のエンコーディングで、アスキー文字の範囲では1文字を1バイトで表現しますが、そうでなければ1文字を複数バイトで表現します。そのため、`String#[]`は、インデックスが示す場所の文字を見つけるために毎回バイトデータをデコードする必要があり、この処理は`O(1)` オーダーではありません。こうした場合にCrystalの `String`は最適化を行っていて、文字列にASCII文字しか含まれていなければ、`String#[]`を`O(1)`オーダーで処理できるよう実装されています。しかし、一般的にそういった状況は稀です。

こうした理由から、文字列に対する繰り返し処理は効率的とはいえず、実際 `O(n^2)`オーダーの複雑性を有しています。

```crystal
string = "foo"
while i < string.size
  char = string[i]
  # ...
end
```

実は上記のコードは、「文字列の `size`（文字数）が単純に`bytesize`（バイト数）からは得られないため、その計算にも時間がかかる」という2つ目の問題を含んでいます。
しかし、Stringの文字数は一度計算されるとその値がキャッシュされます（ので繰り返しによるデメリットは限定的です）。

この場合にパフォーマンスを向上させる手段は、繰り返し処理用のメソッド（`each_char`や`each_byte`、`each_codepoint`など）のいずれかを使用するか、より低レベルの`Char::Reader`を使用することです。`each_char`を使用した例はこうなります。

```crystal
string = "foo"
string.each_char do |char|
  # ...
end
```
