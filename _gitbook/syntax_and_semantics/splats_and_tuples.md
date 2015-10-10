# splat 展開とタプル

メソッドは、「splat 展開 (`*`)」を使うことで複数の引数を一度に受け取ることができます。これは仮引数の中で1回だけしか指定できませんが、順序を問わずどの場所にでも指定可能です。

```crystal
def sum(*elements)
  total = 0
  elements.each do |value|
    total += value
  end
  total
end

sum 1, 2, 3    #=> 6
sum 1, 2, 3, 4.5 #=> 10.5
```

渡された引数はメソッドの中で[タプル (Tuple)](http://crystal-lang.org/api/Tuple.html) として扱うことができます。

```crystal
# Tuple(Int32, Int32, Int32) の要素
sum 1, 2, 3

# Tuple(Int32, Int32, Int32, Float64)
sum 1, 2, 3, 4.5
```
