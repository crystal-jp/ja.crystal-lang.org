# if var.nil?

`if`の条件が`var.nil?`のようになっていると、コンパイラは`then`節では`var`が`Nil`型だと判断して、`else`では`Nil`型以外の型だと判断します。

```crystal
a = some_condition ? nil : 3
if a.nil?
  # ここで a は Nil 型
else
  # ここで a は Int32 型
end
```
