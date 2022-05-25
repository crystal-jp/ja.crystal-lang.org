# タプル (Tuple)

[Tuple](https://crystal-lang.org/api/Tuple.html)は通常タプルリテラルによって生成します。

```crystal
tuple = {1, "hello", 'x'} # Tuple(Int32, String, Char)
tuple[0]                  # => 1       (Int32)
tuple[1]                  # => "hello" (String)
tuple[2]                  # => 'x'     (Char)
```

空のタプルを作るには[Tuple.new](https://crystal-lang.org/api/Tuple.html#new%28%2Aargs%3A%2AT%29-class-method)を使ってください。

タプルの型は次のようして書けます。

```crystal
# Int32、String、Char のタプルの型を表す
Tuple(Int32, String, Char)
```

型制約やジェネリック型の型引数など型が期待される場所であれば、[型の文法](../type_grammar.md)で説明しているような短い記法で型を書けます。

```crystal
# Int32、String、Char のタプルの配列の型を表す
Array({Int32, String, Char})
```

## Splat Expansion

The splat operator can be used inside tuple literals to unpack multiple values at once. The splatted value must be another tuple.

```crystal
tuple = {1, *{"hello", 'x'}, 2} # => {1, "hello", 'x', 2}
typeof(tuple)                   # => Tuple(Int32, String, Char, Int32)

tuple = {3.5, true}
tuple = {*tuple, *tuple} # => {3.5, true, 3.5, true}
typeof(tuple)            # => Tuple(Float64, Bool, Float64, Bool)
```
