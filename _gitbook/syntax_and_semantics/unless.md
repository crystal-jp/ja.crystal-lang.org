# unless

`unless` は、もし与えられた条件が「*偽*」である場合には `then` の分岐を評価し、そうでない場合には `else` の分岐を (もしあれば) 評価するものです。つまり、`if` と反対の働きをします。

```crystal
unless some_condition
  then_expression
else
  else_expression
end

# 上記は以下と同じ
if some_condition
  else_expression
else
  then_expression
end

# 後置することも可能
close_door unless door_closed?
```
