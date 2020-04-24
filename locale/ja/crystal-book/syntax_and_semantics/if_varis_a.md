# if var.is_a?(...)

`if`の条件式で`is_a?`によるチェックが行うと、`then`節で変数がその型に制限されていることが保証されます。

```crystal
if a.is_a?(String)
  # ここで a は String 型
end

if b.is_a?(Number)
  # ここで b は Number 型
end
```

くわえて、`else`節では変数がそれ以外の型であることが保証されます。

```crystal
a = some_condition ?1 : "hello"
# a : Int32 | String

if a.is_a?(Number)
  # a : Int32
else
  # a : String
end
```

`is_a?`によるチェックは、モジュールや抽象クラスなど、いかなる型でもチェックできます。

これは、条件でかつ (`&&`) が使われた場合も同様に機能します。

```crystal
if a.is_a?(String) && b.is_a?(Number)
  # ここで a は String 型で b は Number 型
end
```

そしてこれはインスタンス変数やクラス変数では**機能しません**。それらの場合には、まず変数への代入を行ってください。

```crystal
if @a.is_a?(String)
  # ここでも @a が String であることは保証されない
end

a = @a
if a.is_a?(String)
  # ここで a は String であることが保証される
end

# より簡潔な書き方:
if (a = @a).is_a?(String)
  # ここでは a が String であることが保証される
end
```
