# instance_sizeof

`instance_sizeof` は与えられたクラスのインスタンスサイズを `Int32` で返します。　例:

```ruby
class Point
  def initialize(@x, @y)
  end
end

Point.new 1, 2

# 2 x Int32 = 2 x 4 = 8
instance_sizeof(Point) #=> 12
```

この場合インスタンスが二つの `Int32` フィールドを持っていますが、コンパイラはオブジェクトのタイプｉｄのために常に `Int32` フィールドを持っていますので、インスタンスサイズは１２になります。
