# 式としての if

`if`は式としても利用できて、その値は評価された分岐節の最後の式の値になります。

```crystal
a = if 2 > 1
      3
    else
      4
    end
a # => 3
```

`if`が評価する分岐節が空、もしくは存在しない場合、そこに`nil`が与えられていたのと同じ挙動になります。

```crystal
if 1 > 2
  3
end

# 上記は以下に同じ
if 1 > 2
  3
else
  nil
end

# 他の例
if 1 > 2
else
  3
end

# 上記は以下に同じ
if 1 > 2
  nil
else
  3
end
```
