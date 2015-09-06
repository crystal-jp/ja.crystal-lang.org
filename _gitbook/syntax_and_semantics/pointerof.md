# pointerof

`pointerof` は 変数の内容あるいはインスタンス変数を示す[ポインター](http://crystal-lang.org/api/Pointer.html) として返します。

変数を扱った例：

```ruby
a = 1

ptr = pointerof(a)
ptr.value = 2

a #=> 2
```

インスタンス変数を扱った例：

```ruby
class Point
  def initialize(@x, @y)
  end

  def x
    @x
  end

  def x_ptr
    pointerof(@x)
  end
end

point = Point.new 1, 2

ptr = point.x_ptr
ptr.value = 10

point.x #=> 10
```

`pointerof` はポインターを扱うため [unsafe](unsafe.html) ですので、注意してください。

