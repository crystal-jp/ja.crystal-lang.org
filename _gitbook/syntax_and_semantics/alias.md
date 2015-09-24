# エイリアス

`alias` を使うと、型に別名をつけることができます。

```ruby
alias PInt32 = Pointer(Int32)

ptr = PInt32.malloc(1) # :: Pointer(Int32)
```

エイリアスはコンパイラによって、それらが参照している型に置き変えられます。

エイリアスを使うと長い名前の型を書かずに済むので便利です。しかし、それだけではなく、再帰的な型を扱うときにも利用できます。

```ruby
alias RecArray = Array(Int32) | Array(RecArray)

ary = [] of RecArray
ary.push [1, 2, 3]
ary.push ary
ary #=> [[1, 2, 3], [...]]
```

再帰的な型として実際に扱うことになる例は JSON でしょう。

```ruby
module Json
  alias Type = Nil |
               Bool |
               Int64 |
               Float64 |
               String |
               Array(Type) |
               Hash(String, Type)
end
```
