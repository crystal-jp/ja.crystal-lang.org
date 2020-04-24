# unless

`unless`は条件式が*偽となる*ときにthen節を評価して、そうでないときに`else`節があれば評価します。要するに、`if`と反対の動きをします。

```crystal
unless some_condition
  then_expression
else
  else_expression
end

# 上記は以下に同じ
if some_condition
  else_expression
else
  then_expression
end

# このように後置して使うこともできる
close_door unless door_closed?
```
