# break

`while` のループを抜けるためには `break` を使います。

```ruby
a = 2
while (a += 1) < 20
  if a == 10
    # ループを抜けて 'puts a' に行く
    break
  end
end
puts a #=> 10
```
