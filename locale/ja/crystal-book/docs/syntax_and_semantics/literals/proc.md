# Proc

[Proc](https://crystal-lang.org/api/Proc.html)は追加のコンテキスト (クロージャ) を持つ関数ポインタです。通常、Proc リテラルを使って生成します。

```crystal
# A proc without parameters
->{ 1 } # Proc(Int32)

# A proc with one parameter
->(x : Int32) { x.to_s } # Proc(Int32, String)

# A proc with two parameters
->(x : Int32, y : Int32) { x + y } # Proc(Int32, Int32, Int32)
```

引数の型指定は必須です。ただし C言語バインディングの `fun` に対して直接 Proc リテラルを渡すときだけは例外です。

The return type is inferred from the proc's body, but can also be provided explicitly:

```
# A proc returning an Int32 or String
-> : Int32 | String { 1 } # Proc(Int32 | String)

# A proc with one parameter and returning Nil
->(x : Array(String)) : Nil { x.delete("foo") } # Proc(Array(String), Nil)

# The return type must match the proc's body
->(x : Int32) : Bool { x.to_s } # Error: expected Proc to return Bool, not String
```

A `new` method is provided too, which creates a `Proc` from a [captured block](../capturing_blocks.md). This form is mainly useful with [aliases](../alias.md):

```crystal
Proc(Int32, String).new { |x| x.to_s } # Proc(Int32, String)

alias Foo = Int32 -> String
Foo.new { |x| x.to_s } # same proc as above
```

## Proc の型

Proc の型は次のようにして書けます。

```crystal
# A Proc accepting a single Int32 argument and returning a String
Proc(Int32, String)

# A proc accepting no arguments and returning Nil
Proc(Nil)

# A proc accepting two arguments (one Int32 and one String) and returning a Char
Proc(Int32, String, Char)
```

型制約やジェネリック型の型引数など型が期待される場所であれば、[型の文法](../type_grammar.md)で説明しているような短い記法で型を書けます。

```crystal
# Proc(Int32, String, Char) の配列の型を表す
Array(Int32, String -> Char)
```

## Proc の呼び出し

Proc を呼び出す (実行する) ためには、`call` メソッドを使います。そのとき引数の型は Proc の型と一致している必要があります。

```crystal
proc = ->(x : Int32, y : Int32) { x + y }
proc.call(1, 2) # => 3
```

## メソッドから Proc を生成する

既存のメソッドから Proc を作ることもできます。

```crystal
def one
  1
end

proc = ->one
proc.call # => 1
```

引数を持つメソッドの場合は、その型を指定する必要があります。

```crystal
def plus_one(x)
  x + 1
end

proc = ->plus_one(Int32)
proc.call(41) # => 42
```

レシーバを指定することも可能です。

```crystal
str = "hello"
proc = ->str.count(Char)
proc.call('e') # => 1
proc.call('l') # => 2
```
