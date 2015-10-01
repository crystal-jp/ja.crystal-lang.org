# case

`case` を使うと、パターンマッチングを利用した条件によって制御を行うことができます。これは、多少異なる点もありますが、`if` 文で if-else-if の形で複数の条件分岐を構築することに近いです。

基本的な書き方は以下のような形で、値と値のマッチングによって制御します。

```ruby
case exp
when value1, value2
  do_something
when value3
  do_something_else
else
  do_another_thing
end

# 上記は以下と同じ
tmp = exp
if value1 === tmp || value2 === tmp
  do_something
elsif value3 === tmp
  do_something_else
else
  do_another_thing
end
```

`case` において、対象の値と条件式は `===` を使って比較されることを覚えておいてください。

もし `when` 節の式に型が与えられた場合は、`is_a?` を用いて比較されます。そして、case 式が変数、もしくは変数への代入であるとき、その変数の型に対して制限が加えられます。

```ruby
case var
when String
  # var :: String
  do_something
when Int32
  # var :: Int32
  do_something_else
else
  # ここでは var は String と Int32 のどちらでもない
  do_another_thing
end

# 上記は以下と同じ
if var.is_a?(String)
  do_something
elsif var.is_a?(Int32)
  do_something_else
else
  do_another_thing
end
```

`case` 式に対してメソッドを実行することも可能です。このとき、`when` 節では暗黙的なオブジェクト指定の記法を使います。

```ruby
case num
when .even?
  do_something
when .odd?
  do_something_else
end

# 上記は以下と同じ
tmp = num
if tmp.even?
  do_something
elsif tmp.odd?
  do_something_else
end
```

`case` の値を省略することも可能です。

```ruby
case
when cond1, cond2
  do_something
when cond3
  do_something_else
end

# 上記は以下と同じ
if cond1 || cond2
  do_something
elsif cond3
  do_something_else
end
```

この方がコードが読みやすくなる場合もあるでしょう。
