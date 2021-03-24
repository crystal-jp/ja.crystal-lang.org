# next

`while`のループで`next`を使うと、次の繰り返しにジャンプすることができます。`next`が実行されたあと、`while`の条件がチェックされ、*真となれば*本体が再度実行されます。

```crystal
a = 1
while a < 5
  a += 1
  if a == 3
    next
  end
  puts a
end

# 上記を実行すると2、4、5と表示する
```

`next`はブロックを終了するためにも利用できます。

```crystal
def block
  yield
end

block do
  puts "hello"
  next
  puts "world"
end

# 上記を実行すると "hello" と表示する
```

[`break`](break.md) 同様、`next` は引数を受け取ることも可能で、その場合には `yield` の戻り値となります。

```crystal
def block
  puts yield
end

block do
  next "hello"
end

# 上記を実行すると "hello" と表示する
```
