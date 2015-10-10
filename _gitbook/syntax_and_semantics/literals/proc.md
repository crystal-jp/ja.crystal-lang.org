# Proc

[Proc](http://crystal-lang.org/api/Proc.html) は関数ポインタを表すオブジェクトで、追加のコンテキスト (クロージャ) を含むことができます。通常、Proc リテラルを使って生成します。

```crystal
# 引数のない Proc
->{ 1 } # Proc(Int32)

# 引数を1つ持つ Proc
->(x : Int32) { x.to_s } # Proc(Int32, String)

# 引数を2つ持つ Proc
->(x : Int32, y : Int32) { x + y } # Proc(Int32, Int32, Int32)
```

引数の型指定は必須です。ただし、C バインディングでライブラリの `fun` に直接 Proc リテラルを渡すときだけは例外です。

戻り値の型は Proc の内容から推論されます。

また、`new` メソッドを使って作ることもできます。

```crystal
Proc(Int32, String).new { |x| x.to_s } # Proc(Int32, String)
```

この形式の場合、戻り値の型を指定することができるため、Proc の本体の戻り値が正しい型であるかをチェックすることが可能です。

## Proc の実行

Proc を実行するときは `call` メソッドを使います。そのとき、引数の数は Proc の型と一致している必要があります。

```crystal
proc = ->(x : Int32, y : Int32) { x + y }
proc.call(1, 2) #=> 3
```

## メソッドから Proc を生成する

既存のメソッドから Proc を作ることもできます。

```crystal
def one
  1
end

proc = ->one
proc.call #=> 1
```

引数を持つメソッドの場合は、その型を指定する必要があります。

```crystal
def plus_one(x)
  x + 1
end

proc = ->plus_one(Int32)
proc.call(41) #=> 42
```

レシーバを指定することも可能です。

```crystal
str = "hello"
proc = ->str.count(Char)
proc.call('e') #=> 1
proc.call('l') #=> 2
```
