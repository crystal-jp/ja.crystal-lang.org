# offsetof

`offsetof` はクラスや構造体のインスタンス変数のバイトオフセットを返します。最初の引数に型を受け取り、2番目に引数には `@` からはじまるインスタンス変数を受け取ります。

```crystal
offsetof(Type, @ivar)
```

これは低レベルプリミティブで、C 言語の API が Crystal の型のデータレイアウトを必要とする場合に限って有用です。

例:

```crystal
struct Foo
  @x = 0_i64
  @y = 34_i32
end

offsetof(Foo, @y) # => 8
```
