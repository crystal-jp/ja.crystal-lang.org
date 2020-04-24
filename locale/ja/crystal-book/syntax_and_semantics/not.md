# if !

否定 (`!`) 演算子は[真かどうか](truthy_and_falsey_values.html)を反転させた`Bool`型の値を返します。

`if`の条件式の論理積の中で`is_a?`や`responds_to?`、`nil?`に対してこれを使うと、コンパイラはそれに応じて変数の型を適切に制約します。

```crystal
a = some_condition ? nil : 3
if !a
  # この節は a が偽となる場合に評価されるので、ここで a は Nil 型
else
  # この節は a が真となる場合に評価されるので、ここで a は Int32 型
end
```

```crystal
b = some_condition ? 1 : "x"
if !b.is_a?(Int32)
  # b が Int32 ではないときに評価されるので、ここで b は String 型
end
```
