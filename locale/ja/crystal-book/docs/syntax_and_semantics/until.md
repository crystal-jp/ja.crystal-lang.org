# until

`until`は条件式が*真となる*まで繰り返し本体を実行します。`until`は`while`に条件式を否定したもの与えられた場合のシンタックスシュガーになっています。

```crystal
until some_condition
  do_this
end

# 上記は以下に同じ
while !some_condition
  do_this
end
```

`break` and `next` can also be used inside an `until`, and like in `while` expressions, `break`s may be used to return values from an `until`.
