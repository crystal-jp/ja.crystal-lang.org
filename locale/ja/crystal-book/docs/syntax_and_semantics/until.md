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

`until`の中でも`break`と`next`は利用できます。
