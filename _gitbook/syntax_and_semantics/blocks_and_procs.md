# ブロックと Proc

メソッドはコードブロックをとることができ、そのブロックは `yield` キーワードによって実行されます。例をあげます。

```crystal
def twice
  yield
  yield
end

twice do
  puts "Hello!"
end
```

上記のプログラムでは、`yield` ごとに「Hello!」が出力されるので、「Hello!」が計2回出力されます。

ブロックを受け取るメソッドを定義するには、単純に `yield` をメソッド内で使います。そうするとコンパイラはブロックを受け取るメソッドであることを理解します。ダミーのブロック引数を宣言することで、上記をより明確に示すことも可能です。先頭がアンパサンド (`&`) の引数を最後の引数として設定してください。

```crystal
def twice(&block)
  yield
  yield
end
```

ブロックを渡してメソッドを実行するには、`do ... end` もしくは `{ ... }` を使用します。以下はすべて同等のコードです。

```crystal
twice() do
  puts "Hello!"
end

twice do
  puts "Hello!"
end

twice { puts "Hello!" }
```

## オーバーロード

[オーバーロード](overloading.html)で説明したように、2つのメソッドがあって、一方は yield するメソッドで、もう一方はしないメソッドであるとき、それらは別のオーバーオードと解釈されます。

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

上記を実行すると「Got 1」そして「Got 2」と出力されます。

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

# 出力: 6
```

ブロックに指定するのが yield される引数の数より少なくても構いません。

```crystal
def many
  yield 1, 2, 3
end

many do |x, y|
  puts x + y
end

# 出力: 3
```

ブロックに指定するのが yield される引数の数より多い場合には、それらは `nil` になります。

```crystal
def twice
  yield
  yield
end

twice do |i|
  puts i.inspect
end
```

上記では「nil」が2回出力されます。

ブロックの変数はすべての yield 式に応じた型を持ちます。例をあげます。

```crystal
def some
  yield 1, 'a'
  yield true, "hello"
  yield 2
end

some do |first, second|
  # first は Int32 | Bool
  # second は Char | String | Nil
end
```

ブロック変数 `second` は `Nil` 型を含んでいます。これは、最後の `yield` 式に2番目の引数が指定されていないためです。

## 単一引数の場合の短縮記法

ブロックが単一の引数を受け取り、それに対してメソッドを実行する場合には短縮記法を利用することができます。例えば、

```crystal
method do |argument|
  argument.some_method
end
```

上記は以下のように書くことができます。

```crystal
method &.some_method
```

または以下のように書きます。

```crystal
method &.some_method
```

これは単なるシンタックスシュガーであり、パフォーマンス上の欠点はありません。

`some_method` に引数を渡すことも可能です。

```crystal
method &.some_method
```

演算子の場合も同様に実行することができます。

```crystal
method &.+(2)
method &.[index]
```

## yield の値

`yield` 式自体も値を持っていて、それはブロックの最後の式となります。例をあげます。

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

上記では「2」と「3」が出力されます。

`yield` 式の値は、主に値の変換やフィルタリングの際に有効に利用できます。その最もわかりやすい例は [Enumerable#map](http://crystal-lang.org/api/Enumerable.html#map%28%26block%20%3A%20T%20-%3E%20U%29-instance-method) と [Enumerable#select](http://crystal-lang.org/api/Enumerable.html#select%28%26block%20%3A%20T%20-%3E%20%29-instance-method) でしょう。

```crystal
ary = [1, 2, 3]
ary.map { |x| x + 1 }         #=> [2, 3, 4]
ary.select { |x| x % 2 == 1 } #=> [1, 3]
```

1つ簡単な変換メソッドを例にあげます。

```crystal
def transform(value)
  yield value
end

transform(1) { |x| x + 1 } #=> 2
```

この最後の式の実行結果は `2` になります。`transform` メソッドの最後の式は `yield` であり、そしてその値はブロックの最後の式の値になるからです。

## break

ブロックの中に `break` 式があるとそこでメソッドを抜けます。

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

上記は「Before 1」そして「Before 2」を出力します。`break` があるため、`thrice` メソッドが `puts "Before 3"` を実行することはありません。

`break` は引数を受けとることも可能で、その場合にはそれがメソッドの戻り値となります。例をあげます。

```crystal
def twice
  yield 1
  yield 2
end

twice { |i| i + 1 } #=> 3
twice { |i| break "hello" } #=> "hello"
```

最初の呼び出しのときの値は、`twice` メソッドが `yield` されているため、ブロックの値である3になります。一方で2番目の呼び出しでは、`break` が実行されているために値が "hello" となっています。

もしある条件によって break する場合、そのメソッドの戻り値の型は、ブロックの戻り値の型と (複数ある場合にはすべての) `break` の型の組み合わせとなります。

```crystal
value = twice do |i|
  if i == 1
    break "hello"
  end
  i + 1
end
value #:: Int32 | String
```

`break` が複数の引数を受けとるとき、それらは自動的に[タプル](http://crystal-lang.org/api/Tuple.html)に変換されます。

```crystal
values = twice { break 1, 2 }
values #=> {1, 2}
```

`break` が引数をとらない場合、それは `nil` を1つ受け取ったのと同じことになります。

```crystal
value = twice { break }
value #=> nil
```

## next

ブロックの中に `next` 式があるとそこで (メソッドではなく) ブロックを抜けます。例をあげます。

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

# 出力:
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

# 出力:
# 10
# 3
```

`next` が複数の引数を受けとるとき、それらは自動的に[タプル](http://crystal-lang.org/api/Tuple.html)に変換されます。引数をとらない場合には、`nil` を1つ受け取ったのと同じことになります。

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

例えば、標準ライブラリには `time` という整数のメソッドがあり、それを使うと以下のように書くことができます。

```crystal
3.times do |i|
  puts i
end
```

とても読みやすいと思いませんか？でも、これは C のループのように高速に動くのでしょうか？その答えは「yes」です！

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

捕捉されないブロック (non-captured block) は常にインライン展開されます。したがって、上記したメソッドの実行は、以下のように書くことと**完全に同じ**です。

```crystal
i = 0
while i < 3
  puts i
  i += 1
end
```

コードの読みやすさや再利用性のために積極的にブロックを利用しましょう。それが実行時のパフォーマンスに影響することはありません。
