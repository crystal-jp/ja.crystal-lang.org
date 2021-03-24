# pointerof

`pointerof` は、変数やインスタンス変数の格納場所を示す [Pointer](https://crystal-lang.org/api/latest/Pointer.html) を返します。

変数の例:

```crystal
a = 1

ptr = pointerof(a)
ptr.value = 2

a # => 2
```

インスタンス変数の例:

```crystal
class Point
  def initialize(@x : Int32, @y : Int32)
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

point.x # => 10
```

`pointerof` はポインタを扱うため、[安全でない](unsafe.md)ことに注意してください。
