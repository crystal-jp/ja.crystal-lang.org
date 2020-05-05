# ブロックと Proc

メソッドはコードのブロックを取ることができ、そのブロックは `yield` キーワードによって実行できます。例をあげます。

```crystal
def twice
  yield
  yield
end

twice do
  puts "Hello!"
end
```

上記のプログラムでは各 `yield` ごとに、計2回の "Hello!" が出力されます。

ブロックを受け取るメソッドを定義するには、単純に `yield` をメソッド内で使います。そうするとコンパイラはそれをブロックを受け取るメソッドであると認識します。ダミーのブロック引数を宣言することで、上記をより明確に示すことも可能です。先頭がアンパサンド (`&`) の引数を最後の引数にしてください。

```crystal
def twice(&block)
  yield
  yield
end
```

ブロックを渡してメソッドを呼び出すには、`do ... end` か `{ ... }` を利用します。以下はすべて同等のコードです。

```crystal
twice() do
  puts "Hello!"
end

twice do
  puts "Hello!"
end

twice { puts "Hello!" }
```

`do ... end` と `{ ... }` の違いは、`do ... end` は最も左の呼び出しに渡されますが、`{ ... }` は最も右にある呼び出しに渡されるということです。

```crystal
foo bar do
  something
end

# 上記は以下に同じ
foo(bar) do
  something
end

foo bar { something }

# 上記は以下に同じ

foo(bar { something })
```

このようになっている理由はドメイン固有言語 (DSL) を作成する際に、`do ... end` が自然な英語のように読み下せるようにするためです。

```crystal
open file "foo.cr" do
  something
end

# 以下と同じ
open(file("foo.cr")) do
end
```

上記を次のようにすることはできません。

```crystal
open(file("foo.cr") do
end)
```

## オーバーロード

[オーバーロード](overloading.html)で説明したように、ブロックを取るメソッドとそうでないメソッドは別のオーバーロードであると解釈されます。

## yield の引数

`yield` 式はメソッド呼び出しと似ていて、引数を受け取ることもできます。例をあげます。

```crystal
def twice
  yield 1
  yield 2
end

twice do |i|
  puts "Got #{i}"
end
```

上記を実行すると "Got 1" そして "Got 2" と出力されます。

波カッコを使った指定も可能です。

```crystal
twice { |i| puts "Got #{i}" }
```

複数の値を `yield` することもできます。

```crystal
def many
  yield 1, 2, 3
end

many do |x, y, z|
  puts x + y + z
end

# Output: 6
```

ブロックに指定するのが yield される引数の数より少なくても構いません。

```crystal
def many
  yield 1, 2, 3
end

many do |x, y|
  puts x + y
end

# Output: 3
```

しかし、yield された引数の数よりも多くのブロック引数を指定した場合はエラーになります。

```crystal
def twice
  yield
  yield
end

twice do |i| # Error: too many block arguments
end
```

ブロックの変数はすべての yield 式に応じた型を持ちます。例をあげます。

```crystal
def some
  yield 1, 'a'
  yield true, "hello"
  yield 2, nil
end

some do |first, second|
  # first は Int32 | Bool
  # second は Char | String | Nil
end
```

ブロック引数 `second` は `Nil` を含んでいます。これは、最後の `yield` 式に2番目の引数が指定されていないためです。

## 単一引数の場合の短縮記法

もしブロックが単一の引数とそれに対するメソッド呼び出しのみの場合、ブロックをより短い記法で置き換えることができます。

例えば、

```crystal
method do |argument|
  argument.some_method
end
```

and

```crystal
method { |argument| argument.some_method }
```

は次のように書けます。

```crystal
method &.some_method
```

あるいはこのようにも、

```crystal
method(&.some_method)
```

両方の場合で、`&.some_method` は `method` に引数として渡されています。この引数は意味的にはブロックと同様です。これは単なるシンタックスシュガーであり、パフォーマンス上の欠点はありません。

メソッドが他の引数を要求する場合、短縮記法はメソッドの引数リストに追加されなければいけません。

```crystal
["a", "b"].join(",", &.upcase)
```

これは次に等しいです。
```crystal
["a", "b"].join(",") { |s| s.upcase }
```

短縮記法に引数を渡すこともできます。

```crystal
["i", "o"].join(",", &.upcase(Unicode::CaseOptions::Turkic))
```

演算子の場合も同様に呼び出すことができます。

```crystal
method &.+(2)
method(&.[index])
```

## yield の値

`yield` 式自体も値を持っていて、それはブロックの最後の値となります。例をあげます。

```crystal
def twice
  v1 = yield 1
  puts v1

  v2 = yield 2
  puts v2
end

twice do |i|
  i + 1
end
```

上記では "2" と "3" が出力されます。

`yield` 式の値は、主に値の変換やフィルタリングの際に有効に利用できます。その最もわかりやすい例は [Enumerable#map](https://crystal-lang.org/api/Enumerable.html#map%28%26block%3AT-%3EU%29forallU-instance-method) と [Enumerable#select](https://crystal-lang.org/api/Enumerable.html#select%28%26block%3AT-%3E%29-instance-method) でしょう。

```crystal
ary = [1, 2, 3]
ary.map { |x| x + 1 }         # => [2, 3, 4]
ary.select { |x| x % 2 == 1 } # => [1, 3]
```

1つ簡単な変換メソッドを例にあげます。

```crystal
def transform(value)
  yield value
end

transform(1) { |x| x + 1 } # => 2
```

この最後の式の実行結果は `2` になります。`transform` メソッドの最後の式は `yield` であり、そしてその値はブロックの最後の式になるからです。

## 型制約

`yield` で使うブロックの型を `&block` によって制約することができます。例をあげます。

```crystal
def transform_int(start : Int32, &block : Int32 -> Int32)
  result = yield start
  result * 2
end

transform_int(3) { |x| x + 2 } # => 10
transform_int(3) { |x| "foo" } # Error: expected block to return Int32, not String
```

## break

ブロックの中に `break` 式があると、そこでメソッドを抜けます。

```crystal
def thrice
  puts "Before 1"
  yield 1
  puts "Before 2"
  yield 2
  puts "Before 3"
  yield 3
  puts "After 3"
end

thrice do |i|
  if i == 2
    break
  end
end
```

上記は "Before 1" そして "Before 2" を出力します。`break` があるため、`thrice` メソッドが `puts "Before 3"` を実行することはありません。

`break` は引数を受け取ることも可能で、その場合にはそれがメソッドの戻り値となります。例をあげます。

```crystal
def twice
  yield 1
  yield 2
end

twice { |i| i + 1 }         # => 3
twice { |i| break "hello" } # => "hello"
```

最初の呼び出しのときの値は、`twice` メソッドが `yield` されているためブロックの値となります。一方2番目の呼び出しでは `break` が実行されているため、値が "hello" となっています。

もしある条件によって break する場合、そのメソッドの戻り値の型は、ブロックの戻り値の型とすべての `break` の型の組み合わせとなります。

```crystal
value = twice do |i|
  if i == 1
    break "hello"
  end
  i + 1
end
value # :: Int32 | String
```

`break` が複数の引数を受け取るとき、それらは自動的に [Tuple](http://crystal-lang.org/api/Tuple.html) に変換されます。

```crystal
values = twice { break 1, 2 }
values # => {1, 2}
```

`break` が引数を取らない場合、`nil` を1つ受け取ったのと同じことになります。

```crystal
value = twice { break }
value # => nil
```

## next

ブロックの中に`next` 式があるとそこで、 (メソッドではなく) ブロックを抜けます。例をあげます。

```crystal
def twice
  yield 1
  yield 2
end

twice do |i|
  if i == 1
    puts "Skipping 1"
    next
  end

  puts "Got #{i}"
end

# Ouptut:
# Skipping 1
# Got 2
```

`next` 式は引数を受け取ることが可能です。そのとき、受け取った値はそのブロックを実行した `yield` 式の値となります。

```crystal
def twice
  v1 = yield 1
  puts v1

  v2 = yield 2
  puts v2
end

twice do |i|
  if i == 1
    next 10
  end

  i + 1
end

# Output
# 10
# 3
```

`next` が複数の引数を受け取るとき、それらは自動的に [Tuple](http://crystal-lang.org/api/Tuple.html) に変換されます。引数を取らない場合には、 `nil` を1つ受け取ったのと同じことになります。

## with ... yield

`yield` 式に `with` キーワードを使うと、ブロック内でメソッドを実行する際にデフォルトのレシーバとなるオブジェクトを指定することができます。

```crystal
class Foo
  def one
    1
  end

  def yield_with_self
    with self yield
  end

  def yield_normally
    yield
  end
end

def one
  "one"
end

Foo.new.yield_with_self { one } # => 1
Foo.new.yield_normally { one }  # => "one"
```

## ブロック引数のアンパック

括弧で囲むことで引数をブロック引数をアンパックできます。

```crystal
array = [{1, "one"}, {2, "two"}]
array.each do |(number, word)|
  puts "#{number}: #{word}"
end
```

上の例は以下のシンタックスシュガーになります。

```crystal
array = [{1, "one"}, {2, "two"}]
array.each do |arg|
  number = arg[0]
  word = arg[1]
  puts "#{number}: #{word}"
end
```

整数の渡せる `[]` メソッドを持つどのような型のブロック引数に対してもアンパックができます。

また、[Tuple](http://crystal-lang.org/api/Tuple.html) の引数であれば、括弧が無くても自動で展開されます。

```crystal
array = [{1, "one", true}, {2, "two", false}]
array.each do |number, word, bool|
  puts "#{number}: #{word} #{bool}"
end
```

例えば [Hash(K, V)#each](http://crystal-lang.org/api/Hash.html#each(&):Nil-instance-method) はブロックに `Tuple(K, V)` を渡すので、自動展開が上手く機能します。

```crystal
h = {"foo" => "bar"}
h.each do |key, value|
  key   # => "foo"
  value # => "bar"
end
```

## パフォーマンス

ブロックを `yield` するとき、そのブロックは**常に**インライン展開されます。クロージャやメソッド呼び出し、そして関数ポインタなどが使われることはありません。これは次のことを意味しています。

```crystal
def twice
  yield 1
  yield 2
end

twice do |i|
  puts "Got: #{i}"
end
```

上記は以下のように書くことと完全に同じです。

```crystal
i = 1
puts "Got: #{i}"
i = 2
puts "Got: #{i}"
```

例えば、標準ライブラリには `times` という整数型に対するメソッドがあり、それを使うと以下のように書くことができます。

```crystal
3.times do |i|
  puts i
end
```

とても読みやすいですが、これは C にループのように高速に動くのでしょうか？答えは YES です。

`Int#times` は以下のように定義されています。

```crystal
struct Int
  def times
    i = 0
    while i < self
      yield i
      i += 1
    end
  end
end
```

補足されないブロック (non-captured block) は常にインライン展開されます。したがって、上記のメソッドの実行は、以下のように書くことと**まったく同じ**です。

```crystal
i = 0
while i < 3
  puts i
  i += 1
end
```

コードの読みやすさや再利用性のために積極的にブロックを利用しましょう。それが実行時のパフォーマンスに影響することはありません。
