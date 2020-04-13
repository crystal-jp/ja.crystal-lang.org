# Callbacks

C の宣言の中で関数型を利用することが可能です。

```crystal
lib X
  # C では:
  #
  #    void callback(int (*f)(int));
  fun callback(f : Int32 -> Int32)
end
```

Then you can pass a function (a [Proc](http://crystal-lang.org/api/Proc.html)) like this:

```crystal
f = ->(x : Int32) { x + 1 }
X.callback(f)
```

If you define the function inline in the same call you can omit the argument types, the compiler will add the types for you based on the `fun` signature:

```crystal
X.callback ->(x) { x + 1 }
```

ただ、C に渡される関数はクロージャにはなれません。もし、クロージャが渡されていることがコンパイル時に検出されるとエラーが発生します。

```crystal
y = 2
X.callback ->(x) { x + y } # Error: can't send closure to C function
```

もしコンパイラがコンパイル時にこのことを検出できなかった場合、ランタイムに例外が発生します。

Refer to the [type grammar](../type_grammar.html) for the notation used in callbacks and procs types.

If you want to pass `NULL` instead of a callback, just pass `nil`:

```crystal
# Same as callback(NULL) in C
X.callback nil
```

### Passing a closure to a C function

Most of the time a C function that allows setting a callback also provide an argument for custom data. This custom data is then sent as an argument to the callback. For example, suppose a C function that invokes a callback at every tick, passing that tick:

```crystal
lib LibTicker
  fun on_tick(callback : (Int32, Void* ->), data : Void*)
end
```

To properly define a wrapper for this function we must send the Proc as the callback data, and then convert that callback data to the Proc and finally invoke it.

```crystal
module Ticker
  # The callback for the user doesn't have a Void*
  @@box : Pointer(Void)?

  def self.on_tick(&callback : Int32 ->)
    # Since Proc is a {Void*, Void*}, we can't turn that into a Void*, so we
    # "box" it: we allocate memory and store the Proc there
    boxed_data = Box.box(callback)

    # We must save this in Crystal-land so the GC doesn't collect it (*)
    @@box = boxed_data

    # We pass a callback that doesn't form a closure, and pass the boxed_data as
    # the callback data
    LibTicker.on_tick(->(tick, data) {
      # Now we turn data back into the Proc, using Box.unbox
      data_as_callback = Box(typeof(callback)).unbox(data)
      # And finally invoke the user's callback
      data_as_callback.call(tick)
    }, boxed_data)
  end
end

Ticker.on_tick do |tick|
  puts tick
end
```

Note that we save the boxed callback in `@@box`. The reason is that if we don't do it, and our code doesn't reference it anymore, the GC will collect it. The C library will of course store the callback, but Crystal's GC has no way of knowing that.

## Raises attribute

If a C function executes a user-provided callback that might raise, it must be annotated with the `@[Raises]` attribute.

The compiler infers this attribute for a method if it invokes a method that is marked as `@[Raises]` or raises (recursively).

しかし、C の関数には、他の C 関数によって実行されるコールバックを受け取るものがあります。For example, suppose a fictitious library:

```crystal
lib LibFoo
  fun store_callback(callback : ->)
  fun execute_callback
end

LibFoo.store_callback ->{ raise "OH NO!" }
LibFoo.execute_callback
```

If the callback passed to `store_callback` raises, then `execute_callback` will raise. However, the compiler doesn't know that `execute_callback` can potentially raise because it is not marked as `@[Raises]` and the compiler has no way to figure this out. こういったケースでは、それらの関数に手動で指示を与える必要があります。

```crystal
lib LibFoo
  fun store_callback(callback : ->)

  @[Raises]
  fun execute_callback
end
```

If you don't mark them, `begin/rescue` blocks that surround this function's calls won't work as expected.
