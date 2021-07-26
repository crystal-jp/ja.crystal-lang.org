# Proc

[Proc](https://crystal-lang.org/api/latest/Proc.html) は追加のコンテキスト (クロージャ) を持つ関数ポインタです。通常、Proc リテラルを使って生成します。

```crystal
# 引数なしの Proc
->{ 1 } # Proc(Int32)

# 1引数の Proc
->(x : Int32) { x.to_s } # Proc(Int32, String)

# 2引数の Proc
->(x : Int32, y : Int32) { x + y } # Proc(Int32, Int32, Int32)
```

引数の型指定は必須です。ただし C言語バインディングの `fun` に対して直接 Proc リテラルを渡すときだけは例外です。

戻り値の型は Proc の内容から推論されます。

また、`new` を使って Proc を作ることもできます。

```crystal
Proc(Int32, String).new { |x| x.to_s } # Proc(Int32, String)
```

この形式の場合、戻り値の型を指定することができるため、Proc の本体の戻り値が正しい型であるかをチェックすることが可能です。

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
