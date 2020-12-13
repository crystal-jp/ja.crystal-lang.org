# 名前付きタプル (NamedTuple)

[NamedTuple](http://crystal-lang.org/api/NamedTuple.html) は通常名前付きタプルリテラルにより生成します。

```crystal
tuple = {name: "Crystal", year: 2011} # NamedTuple(name: String, year: Int32)
tuple[:name]                          # => "Crystal" (String)
tuple[:year]                          # => 2011      (Int32)
```

名前付きタプルの型は次のようにして書けます。

```crystal
# x が Int32 で y が String であるような名前付きタプルの型を表す
NamedTuple(x: Int32, y: String)
```

型制約やジェネリック型の型引数など型が期待される場所であれば、[型の文法](../type_grammar.md)で説明しているような短い記法で型を書けます。

```crystal
# x が Int32、 y が String であるような名前付きタプルの配列の型を表す
Array({x: Int32, y: String})
```

名前付きタプルのキーには文字列リテラルを使うこともできます。

```crystal
{"this is a key": 1}
```
