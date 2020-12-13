# break

`while`のループを抜けるためには`break`を使います。

```crystal
a = 2
while (a += 1) < 20
  if a == 10
    break # ループを抜けて 'puts a' に行く
  end
end
puts a # => 10
```

`break`は引数を受けとることも可能で、その場合にはそれがメソッドの戻り値となります。

```crystal
def foo
  loop do
    break "bar"
  end
end

puts foo # => "bar"
```
