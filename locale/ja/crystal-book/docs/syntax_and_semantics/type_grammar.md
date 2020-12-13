# 型の文法

以下の場合、

* [型制約](type_restrictions.md)を指定するとき
* [型引数](generics.md)を指定するとき
* [変数の宣言](declare_var.md)のとき
* [型エイリアス](alias.md)のとき
* [typedef](c_bindings/type.md)の宣言のとき
* [is_a?](is_a.md) 疑似メソッドの引数
* [as](as.md) 式の引数
*  [sizeof](sizeof.md) 式の引数
* [instance_sizeof](instance_sizeof.md) 式の引数
* メソッドの[戻り値の型](return_types.md)を指定するとき

一般的な型に対する便利な記法が用意されています。これらは特に [C バインディング](c_bindings/README.md)を書くときに有効ですが、上記した箇所であればどこでも利用することができます。

## パスとジェネリクス

一般的な型とジェネリクスは以下のように利用します。

```crystal
Int32
My::Nested::Type
Array(String)
```

## ユニオン型

```crystal
alias Int32OrString = Int32 | String
```

型でパイプ記号 (`|`) を使うと、ユニオン型となります。`Int32 | String` は「Int32 もしくは String」と読みます。通常のコードにおいては、`Int32 | String` が意味するのは `Int32` に対して `String` を引数として `|` メソッドを呼び出すことを意味します。

## Nil 許容型 (Nilable)

```crystal
alias Int32OrNil = Int32?
```

これは以下と同じです。

```crystal
alias Int32OrNil = Int32 | ::Nil
```

通常のコードにおいても、`Int32?` は `Int32 | ::Nil` のユニオン型を表します。

## ポインタ型

```crystal
alias Int32Ptr = Int32*
```

これは以下と同じです。

```crystal
alias Int32Ptr = Pointer(Int32)
```

通常のコードにおいては、`Int32*` が意味するのは `Int32` に対して `*` メソッドを呼び出すことを意味します。

## 静的配列 (StaticArray)

```crystal
alias Int32_8 = Int32[8]
```

これは以下と同じです。

```crystal
alias Int32_8 = StaticArray(Int32, 8)
```

通常のコードにおいては、`Int32[8]` は `Int32` に対して `8` を引数として `[]` メソッドを呼び出すことを意味します。

## タプル (Tuple)

```crystal
alias Int32StringTuple = {Int32, String}
```

これは以下と同じです。

```crystal
alias Int32StringTuple = Tuple(Int32, String)
```

通常のコードにおいては、`{Int32, String}` は`Int32` と `String` を要素として持つタプルのインスタンスを意味します。これは上記のタプル**型**とは異なります。

## 名前付きタプル (NamedTuple)

```crystal
alias Int32StringNamedTuple = {x: Int32, y: String}
```

これは以下と同じです。

```crystal
alias Int32StringNamedTuple = NamedTuple(x: Int32, y: String)
```

通常のコードにおいては、`{x: Int32, y: String}` は `Int32` と `String` をキー `x` と `y` の値として持つ名前付きタプルのインスタンスを意味します。これは上記の名前付きタプル**型**とは異なります。

## Proc

```crystal
alias Int32ToString = Int32 -> String
```

これは以下と同じです。

```crystal
alias Int32ToString = Proc(Int32, String)
```

引数を持たない Proc を指定するには以下のようにします。

```crystal
alias ProcThatReturnsInt32 = -> Int32
```

複数の引数を持つ Proc を指定するには以下のようにします。

```crystal
alias Int32AndCharToString = Int32, Char -> String
```

ネストされた Proc に対しては (および実際にはどんな型であっても) カッコを利用することができます。

```crystal
alias ComplexProc = (Int32 -> Int32) -> String
```

通常のコードでは `Int32 -> String` は構文エラーです。

## self

型の文法では `self` は `self` 型であることを示すために利用できます。詳しくは[型制約](type_restrictions.md)を参照してください。

## class 型

`class` はインスタンスの型ではなく、クラス自身の型を参照するために利用できます。

例をあげます。

```crystal
def foo(x : Int32)
  "instance"
end

def foo(x : Int32.class)
  "class"
end

foo 1     # "instance"
foo Int32 # "class"
```

`class` はクラスの型を持つ配列やコレクションを作る場合にも有効に使えます。

```crystal
class Parent
end

class Child1 < Parent
end

class Child2 < Parent
end

ary = [] of Parent.class
ary << Child1
ary << Child2
```

## アンダースコア

型制約でアンダースコアを使うことが可能です。それはすべてにマッチすることを示します。

```crystal
# 型制約を指定しないことと同じです。あまり便利な例ではありません。
def foo(x : _)
end

# もう少し有用な例として、これは引数を2つ受け取って Int32 を返す Proc を表します
def foo(x : _, _ -> Int32)
end
```

## typeof

`typeof` を型の文法で使うこともできます。渡された式の型の組み合わせ (ユニオン型) を返します。

```crystal
typeof(1 + 2)  # => Int32
typeof(1, "a") # => (Int32 | String)
```
