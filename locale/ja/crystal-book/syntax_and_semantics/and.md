# && - Logical AND Operator

An `&&` (and) evaluates its left hand side. If it's *truthy*, it evaluates its right hand side and has that value. そうでない場合は、結果は左辺の値となります。その型は両辺の型の組み合わせ (ユニオン型）です。

You can think an `&&` as syntax sugar of an `if`:

```crystal
some_exp1 && some_exp2

# The above is the same as:
tmp = some_exp1
if tmp
  some_exp2
else
  tmp
end
```
