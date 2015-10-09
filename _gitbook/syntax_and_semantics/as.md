# as

`as` 式はある式の型に対して制約を与えます。例をあげます。

```ruby
if some_condition
  a = 1
else
  a = "hello"
end

# a :: Int32 | String
```

上記のコードでは、`a` は `Int32 | String` の組み合わせ (ユニオン型) となります。もし何らかの理由で、`if` の後で `a` が `Int32` であるとしたい場合は、そのように扱うようにコンパイラに強制することができます。

```ruby
a_as_int = a as Int32
a_as_int.abs          # コンパイラは a_as_int が Int32 であると知っているので動作する
```

`as` 式はランタイムにチェックを行うため、もし `a` が `Int32` ではないときには[例外](exception_handling.html)が発生します。

式に与える引数は[型](type_grammar.html)です。

ある型を別の型に強制することは不可能で、コンパイルエラーが発生します。

```ruby
1 as String # Error
```

## ポインタ型同士の変換

`as` 式はポインタ型同士のキャストも可能です。

```ruby
ptr = Pointer(Int32).malloc(1)
ptr as Int8*                    #:: Pointer(Int8)
```

このとき、ランタイムのチェックは行われません。ポインタは安全でない (unsafe) ため、通常、この型キャストは C バインディングやローレベルなコードにおいてのみ利用します。

## ポインタ型と他の型の変換

ポインタ型と Reference 型を相互に変換することも可能です。

```ruby
array = [1, 2, 3]

# object_id はメモリ上のオブジェクトのアドレスを返すため、
# そのアドレスからポインタを作ることができる
ptr = Pointer(Void).new(array.object_id)

# ポインタをその型にキャストすると、
# 同一の値が得られる
array2 = ptr as Array(Int32)
array2.same?(array) #=> true
```

この場合も、ポインタが絡む処理になるためランタイムのチェックは行われません。このキャストが必要になるケースは前述のものよりも稀です。ただ、これによって (String などの) コアとなる型を Crystal 自身で実装することが可能になっており、また、Reference 型を void ポインタにキャストすることで C の関数に渡すこともできます。

## 大きな型へのキャストの利用方法

`as` 式は、ある式をより「大きな」型へキャストするために使うことができます。例をあげます。

```ruby
a = 1
b = a as Int32 | Float64
b #:: Int32 | Float64
```

上記では一体何が嬉しいのかわからないかもしれません。では、以下のように配列の要素を map する場合ではどうでしょう？

```ruby
ary = [1, 2, 3]

# Int32 | Float64型 の 1, 2, 3 の配列にしたい
ary2 = ary.map { |x| x as Int32 | Float64 }

ary2 #:: Array(Int32 | Float64)
ary2 << 1.5 # OK
```

`Array#map` メソッドはブロック内の型を配列のジェネリック型とします。もし `as` 式がなければ、推論された型は `Int32` なので、それに対して `Float64` を追加することはできません。

## コンパイラがブロックの型を推論できないときの利用方法

コンパイラがブロックの型を推論できない場合があります。例をあげます。

```ruby
class Person
  def initialize(@name)
  end

  def name
    @name
  end
end

a = [] of Person
x = a.map { |f| f.name } # Error: can't infer block return type
```

コンパイラは、`Array#map` によって作られる配列のジェネリック型として、ブロックの型を必要としています。しかし、`Person` が1度もインスタンス化されていないため、コンパイラは `@name` の型を知ることができません。こういったケースでは、`as`式を使うことでコンパイラを補助することができます。

```ruby
a = [] of Person
x = a.map { |f| f.name as String } # OK
```

このエラーに出会うことはあまりないでしょう。もし `Person` が map の呼び出し前にインスタンス化されていればエラーにはなりません。

```ruby
Person.new "John"

a = [] of Person
x = a.map { |f| f.name as String } # OK
```
