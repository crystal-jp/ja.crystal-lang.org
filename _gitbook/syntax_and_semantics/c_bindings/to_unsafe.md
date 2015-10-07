# to_unsafe

もし、ある型に `to_unsafe` メソッドが定義されていた場合、C に渡されるのはそのメソッドからの戻り値となります。例をあげます。

```ruby
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
C.exit(wrapper) # wrapper は Int32 ではないが、
                # to_safe があるため、
                # wrapper.to_unsafe が代わりに渡される
```

これは、C の型のラッパーを定義する際に、明示的にそれらをラップされる型に変換する必要がないために便利に利用できます。

例えば、`String` クラスが `UInt8*` を返す `to_unsafe` を実装している場合を考えてみましょう。

```ruby
lib C
  fun printf(format : UInt8*, ...) : Int32
end

a = 1
b = 2
C.printf "%d + %d = %d\n", a, b, a + b
```
