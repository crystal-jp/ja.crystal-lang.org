# Crystalコードのテスト

Crystalには[`Spec`モジュール](https://crystal-lang.org/api/latest/Spec.html)内に、フル機能の spec ライブラリが用意されています。It provides a structure for writing executable examples of how your code should behave.

また、[Rspec](http://rspec.info/)を参考に、素の英語に近い形で実行例を記述できるドメイン固有言語（DSL：Domain Specific Language）を導入しています。

基本的な spec はこのようになります。

```crystal
require "spec"

describe Array do
  describe "#size" do
    it "correctly reports the number of elements in the Array" do
      [1, 2, 3].size.should eq 3
    end
  end

  describe "#empty?" do
    it "is true when no elements are in the array" do
      ([] of Int32).empty?.should be_true
    end

    it "is false if there are elements in the array" do
      [1].empty?.should be_false
    end
  end
end
```

## specファイルの構造

spec モジュールやDLSを使用するには、specファイルに`require "spec"`を追加する必要があります。多くのプロジェクトでは、 これらのインクルードを取りまとめるカスタムの[specヘルパ](#spec-helper)を使用しています。

具体的なテストケースは`it`ブロック内に記述します。ここには、そのテストの意図を説明する文字列（オプションですが、強く推奨）とともに、テストが実行するロジックを納めたブロックが与えられます。

`it`の代わりに`pending`を使用することで、概要だけを記載して実行はしないテストケースを定義することもできます。それらは実行されませんが、spec レポートに pending ととして記載されます。

`it`ブロックには、テスト対象となるコードの実行例と、その結果がどうなるべきかの定義を記述します。個々の実行例に複数の式を含めることも可能ですが、そこでは特定の挙動1つに対するテストのみを行うべきです。

`spec`がインクルードされると、すべてのオブジェクトにインスタンスメソッドとして`#should`と`#should_not`が追加されます。これらのメソッドは、テスト対象となる値に対して、想定される結果を引数として実行されます。もし結果が想定通りであれば、コードの実行を継続します。そうでない場合、その実行例はその時点で*failed*となり、同じブロックに記述されたそれ以降のコードは実行されません。

テストファイル内では、specは`describe`や`context`といったセクションで実行例をグルーピングします。通常、トップレベルの`describe`は、そのspecのテスト対象となる外側の単位（クラスなど）を定義します。`describe`セクションはより小さなテスト単位 （個々のメソッドなど）にネストさせることができます。

単体テストでは、外側の`describe`にクラス名を、内側の`describe`にテスト対象のメソッドを指定するという組み合わせが推奨されます。インスタンスメソッドの場合はメソッド名の前に`#`を、クラスメソッドの場合は`.`を付けてください。

*空の配列*と*要素を含む配列*といったコンテキストの違いを読み手に対して明確に伝えるために、`context`メソッドを使用することもできます。これは名前が違うだけで、挙動は`describe`と全く変わりません。

`describe`と`context`は引数に概要（通常は文字列）をとり、個々のspecやネストしたグループを含むブロックを与えます。

## Expectations（想定される挙動）

Expectationsは、テスト対象の（*実際の*）値がとるべき特定の値や、満たすべき一定の基準を定義します。

### 等価性、同一性、型

等価性（`eq`）、同一性（`be`）、型（`be_a`）とnil（`be_nil`）をテストするExpectationを生成するためのメソッドが用意されています。
同一性をテストするExpectationは[`#object_id`](https://crystal-lang.org/api/latest/Reference.html#object_id%3AUInt64-instance-method)が同一かどうかをテストする`.same?`メソッドを使用することに注意してください。このメソッドは、実際の実行結果が想定した値と*等価な値*であるだけでなく、*同じオブジェクト*を指す場合のみtrueを返します。これは参照型でのみ利用可能で、structや数値といった値型に対しては使えません。

```crystal
actual.should eq(expected)   # actual == expected であれば合格
actual.should be(expected)   # actual.same?(expected) であれば合格
actual.should be_a(expected) # actual.is_a?(expected) であれば合格
actual.should be_nil         # actual.nil? であれば合格
```

### 真偽状態

```crystal
actual.should be_true   # actual == true であれば合格
actual.should be_false  # actual == false であれば合格
actual.should be_truthy # actualがtruthyな値（nilでもfalseでもPointer.nullでもない） であれば合格
actual.should be_falsey # actualがfalseyな値（nilやfalse、もしくはPointer.null）であれば合格
```

### 比較

```crystal
actual.should be < expected  # actual <  expected であれば合格
actual.should be <= expected # actual <= expected であれば合格
actual.should be > expected  # actual >  expected であれば合格
actual.should be >= expected # actual >= expected であれば合格
```

### その他の条件

```crystal
actual.should be_close(expected, delta) # actualがexpectedからdelta以内の値であれば合格
                                        # (actual - expected).abs <= delta
actual.should contain(expected)         # actual.includes?(expected)が真なら合格
actual.should match(expected)           # actual =~ expectedが真なら合格
```

### エラーを想定する

以下の例は、ブロックの実行時に特定の例外が発生した場合に合格になります。

```crystal
expect_raises(MyError) do
  # ブロック内でMyError型の例外が発生すれば合格
end

expect_raises(MyError, "error message") do
  # ブロック内でMyError型の例外が発生し、
  # エラーメッセージが"error message"だったら合格
end

expect_raises(MyError, /error \w{7}/) do
  # ブロック内でMyError型の例外が発生し、
  # かつエラーメッセージが正規表現にマッチすれば合格
end
```

これらは発生した例外を返すので、その例外の特定のプロパティをチェックするといった別のテストに使用することができます。

## 特定のグループにフォーカスしたspec

`describe`や`context`、`it`ブロックには、以下のように`focus: true`を指定することができます。

```crystal
it "adds", focus: true do
  (2 + 2).should_not eq(5)
end
```

もし`focus: true`が指定されたブロックがあった場合、指定されたブロックのみが実行されます。

## specのタグ付け

タグはspecをグループ付けするのに使用され、specを実行する際（[Using the compiler](../using_the_compiler/README.md)を参照）に`--tag`引数を指定することで、specの一部のみを実行することができます。

`describe`や`context`、`it`ブロックには以下のようにしてタグをつけることができます。

```crystal
it "is slow", tags: "slow" do
  sleep 60
  true.should be(true)
end

it "is fast", tags: "fast" do
  true.should be(true)
end
```

実行例のグループ（`describe`や`context`）に対して指定されたタグは、その内部の実行例全てに適用されます。

[`Array`](https://crystal-lang.org/api/Array.html)や[`Set`](https://crystal-lang.org/api/Set.html)といった[`Enumerable`](https://crystal-lang.org/api/Enumerable.html)型を使用して、複数のタグを指定することもできます。

## specの実行

Crystalコンパイラには`spec`コマンドがあり、どの実行例が実行されるかを指定したり出力を調整したりできるツールが用意され居ます。`crystal spec`コマンドによって、プロジェクト内の全てのspecがコンパイルされて実行されます。

慣例的に、specはプロジェクト内の`spec/`ディレクトリに置かれます。コンパイラコマンドが認識できるように、spec ファイルのファイル名は末尾が`_spec.cr`でなければなりません。

specはフォルダ全体や、単独のファイル、ファイル内の特定の行といった単位で実行可能です。指定された行が`describe`や`context`セクションの先頭だった場合は、そのセクション内の全てのspecが実行されます。

デフォルトのフォーマッタは、失敗したspecについて、後でそのsepcだけを再テストしやすいように、ファイル名と行数を含んだ形式のコマンド例を出力します。

`--no-color`スイッチを指定すると、出力の色分けを停止できます。

### ランダムな順序でのspec実行

`crystal spec`に`--order random`を指定すると、通常は定義され手順で実行されるspecを、ランダムな順序で実行可能です。

ランダムな順番でspecが実行された場合、終了時にseed値が表示されます。このシード値を`--order`で指定することで、もう一度同じ順番でspecを実行することができます。

### 例

```bash
# ファイル名が spec/**/*_spec.cr にマッチするファイル内の全specを実行
crystal spec

# ファイル名が spec/**/*_spec.cr にマッチするファイル内の全specを実行（出力を色分けしない）
crystal spec --no-color

# ファイル名が spec/my/test/**/*_spec.cr にマッチするファイル内の全specを実行
crystal spec spec/my/test/

# 特定のファイル spec/my/test/file_spec.cr 内の全specを実行
crystal spec spec/my/test/file_spec.cr

# 特定のファイル spec/my/test/file_spec.cr の14行目で定義されたspecや、グループ内のspecを実行
crystal spec spec/my/test/file_spec.cr:14

# "fast" タグが付けられたspecを全て実行
crystal spec --tag 'fast'

# "slow" タグが付いていないspecを全て実行
crystal spec --tag '~slow'
```

## スペックヘルパ

多くのプロジェクトでは、（通常 `spec/spec_helper.cr`という名前の）カスタムされたspecヘルパファイルを使用しています。

このファイルは`spec`を require したり、個々のspecファイルが使用するコードをプロジェクト内から取り込むのに使用します。ここは、コードの重複を排除してspecの記述を容易にするために、テスト全体で利用するヘルパメソッドを置くのにも良い場所です。

```crystal
# spec/spec_helper.cr
require "spec"
require "../src/my_project.cr"

def create_test_object(name)
  project = MyProject.new(option: false)
  object = project.create_object(name)
  object
end

# spec/my_project_spec.cr
require "./spec_helper"

describe "MyProject::Object" do
  it "is created" do
    object = create_test_object(name)
    object.should_not be_nil
  end
end
```
