# instance_sizeof

`instance_sizeof` は与えられたクラスのインスタンスのサイズを `Int32` で返します。例:

```ruby
class Point
  def initialize(@x, @y)
  end
end

Point.new 1, 2

# 2 x Int32 = 2 x 4 = 8
instance_sizeof(Point) #=> 12
```

上記では、インスタンスは2つの `Int32` のフィールドを持っています。ただし、オブジェクトの型 ID のために、コンパイラによって常に `Int32` フィールドが追加されます。したがって、最終的にこのインスタンスのサイズは 8 ではなく 12 となります。
