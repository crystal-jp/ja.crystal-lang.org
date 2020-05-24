# タプル (Tuple)

[Tuple](http://crystal-lang.org/api/Tuple.html) は通常タプルリテラルにより生成します。

```crystal
tuple = {1, "hello", 'x'} # Tuple(Int32, String, Char)
tuple[0]                  # => 1       (Int32)
tuple[1]                  # => "hello" (String)
tuple[2]                  # => 'x'     (Char)
```

空のタプルを作るには [Tuple.new](https://crystal-lang.org/api/Tuple.html#new%28%2Aargs%3A%2AT%29-class-method) を使ってください。

タプルの型は次のようして書けます。

```crystal
# Int32、String、Char のタプルの型を表す
Tuple(Int32, String, Char)
```

型制約やジェネリック型の型引数など型が期待される場所であれば、[型の文法](../type_grammar.html)で説明しているような短い記法で型を書けます。

```crystal
# Int32、String、Char のタプルの配列の型を表す
Array({Int32, String, Char})
```
