# if 変数.is_a?(...)

`if` の条件で `is_a?` によるチェックを行うと、`then` 節での変数の型を制限し保証することができます。

```crystal
if a.is_a?(String)
  # a は必ず String
end

if b.is_a?(Number)
  # b は必ず Number
end
```

一方このとき、`else` 節の中ではチェックした型「ではない」ことが保証されます。

```crystal
a = some_condition ? 1 : "hello"
# a :: Int32 | String

if a.is_a?(Number)
  # a :: Int32
else
  # a :: String
end
```

`is_a?` によるチェックはどんな型に対しても行うことができます。例えば抽象クラスやモジュールでも有効です。

上記は、条件で「かつ (`&&`)」が使われた場合にも同様です。

```crystal
if a.is_a?(String) && b.is_a?(Number)
  # ここでは a は String で b は Number
end
```

ただ、インスタンス変数、クラス変数、そしてグローバル変数の場合には、上記が **当てはまらない** ことに注意してください。それらの場合には、まず変数への代入を行ってください。

```crystal
if @a.is_a?(String)
  # ここでは @a が String であることが保証され「ない」
end

a = @a
if a.is_a?(String)
  # ここでは a が String であることが保証される
end

# より簡潔な書き方
if (a = @a).is_a?(String)
  # ここでは a が String であることが保証される
end
```
