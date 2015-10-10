# until

`until` は、与えられた条件が「真」になるまでその本体を繰り返し実行します。実際には、`until` というのは `while` に否定の条件が与えられた場合のシンタックスシュガーになっています。

```crystal
until some_condition
  do_this
end

# 上記は以下と同じ
while !some_condition
  do_this
end
```

`until` の中でも、`break` と `next`を利用することができます。
