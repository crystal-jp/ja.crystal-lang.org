# while

`while`は条件式が*真となる*間は繰り返して本体を実行します。

```crystal
while some_condition
  do_this
end
```

まず条件式に対して判定が行なわれて、*真であった*ときに本体が実行されます。これはつまり、本体が1度も実行されない場合もあるということです。

`while`の型が常に`Nil`です。

`if`のように、`while`の条件式が変数であった場合、本体ではその変数は`nil`ではないことが保証されます。条件式が`var.is_a?(Type)`という形なら、本体では`var`は`Type`型であることが保証されます。さらに、`var.responds_to?(:method)`という形なら、本体では`var`がそのメソッドを持つことが保証されます。

`while`を実行したあとの変数の型は、`while`以前の型と、`while`を抜ける直前の型によって決まります。

```crystal
a = 1
while some_condition
  # a : Int32 | String
  a = "hello"
  # a : String
  a.size
end
# a : Int32 | String
```

## 条件によってループを抜ける

ループを抜けるための条件を設定することで、必ず1回は本体を実行することができます。

```crystal
while true
  do_something
  break if some_condition
end
```

標準ライブラリの`loop`を利用しても同じことが可能です。

```crystal
loop do
  do_something
  break if some_condition
end
```
