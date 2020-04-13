# to_unsafe

If a type defines a `to_unsafe` method, when passing it to C the value returned by this method will be passed. 例をあげます。

```crystal
lib C
  fun exit(status : Int32) : NoReturn
end

class IntWrapper
  def initialize(@value)
  end

  def to_unsafe
    @value
  end
end

wrapper = IntWrapper.new(1)
C.exit(wrapper) # wrapper.to_unsafe is passed to C function which has type Int32
```

これは、C の型のラッパーを定義する際に、明示的にそれらをラップされる型に変換する必要がないために便利に利用できます。

For example, the `String` class implements `to_unsafe` to return `UInt8*`:

```crystal
lib C
  fun printf(format : UInt8*, ...) : Int32
end

a = 1
b = 2
C.printf "%d + %d = %d\n", a, b, a + b
```
