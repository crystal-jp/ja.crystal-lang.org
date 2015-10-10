# while

`while` は、与えられた条件が「真」である間はずっと、その本体を繰り返し実行し続けます。

```crystal
while some_condition
  do_this
end
```

まず条件に対して判定が行われ、もし「真」であれば本体が実行されます。これはつまり、本体が1度も実行されない場合もあるということです。

`while` の型は常に `Nil` です。

`if` の場合と同様に、`while` の条件に変数が与えられている場合は、本体の中ではその変数が `nil` ではないことが保証されます。条件で `var.is_a?(Type)` による判定を行うと、本体の中では `var` の型がその型であることを保証することができます。また、もし条件が `var.responds_to?(:method)` の判定であれば、本体の中で `var` がそのメソッドに応答することを保証することが可能です。

`while` の後である変数の型が何であるかは、`while` 以前の型と、そして `while` の本体を抜ける前の型によって決まります。

```crystal
a = 1
while some_condition
  # a :: Int32 | String
  a = "hello"
  # a :: String
  a.size
end
# a :: Int32 | String
```

## 条件によってループを抜ける

ループを抜けるための条件を設定することで、必ず1回は本体を実行することができます。

```crystal
while true
  do_something
  break if some_condition
end
```

標準ライブラリの `loop` を利用しても同じことが可能です。

```crystal
loop do
  do_something
  break if some_condition
end
```
