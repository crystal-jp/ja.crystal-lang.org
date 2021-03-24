# unless

`unless`は条件式が*偽となる*ときにthen節を評価して、そうでないときに`else`節があれば評価します。要するに、`if`と反対の動きをします。

```crystal
unless some_condition
  expression_when_falsey
else
  expression_when_truthy
end

# 上記は以下に同じ:
if some_condition
  expression_when_truthy
else
  expression_when_falsey
end

# このように後置しても使える
close_door unless door_closed?
```
