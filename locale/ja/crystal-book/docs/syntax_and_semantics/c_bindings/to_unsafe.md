# to_unsafe

もし、ある方に `to_unsafe` メソッドが定義されていた場合、C に渡されるのはそのメソッドからの戻り値となります。例をあげます。

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

例えば、`String` クラスが `UInt8*` を返す `to_unsafe` を実装している場合を考えてみましょう。

```crystal
lib C
  fun printf(format : UInt8*, ...) : Int32
end

a = 1
b = 2
C.printf "%d + %d = %d\n", a, b, a + b
```
