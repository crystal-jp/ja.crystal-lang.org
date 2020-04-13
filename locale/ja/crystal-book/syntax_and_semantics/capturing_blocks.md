# Capturing blocks

A block can be captured and turned into a `Proc`, which represents a block of code with an associated context: the closured data.

ブロックを捕捉するには、メソッドにブロック引数を設定し、その名前とインプット/アウトプットの型を指定する必要があります。例をあげます。

```crystal
def int_to_int(&block : Int32 -> Int32)
  block
end

proc = int_to_int { |x| x + 1 }
proc.call(1) # => 2
```

The above code captures the block of code passed to `int_to_int` in the `block` variable, and returns it from the method. The type of `proc` is [Proc(Int32, Int32)](http://crystal-lang.org/api/Proc.html), a function that accepts a single `Int32` argument and returns an `Int32`.

この方法で、ブロックをコールバックとして保存しておくこともできます。

```crystal
class Model
  def on_save(&block)
    @on_save_callback = block
  end

  def save
    if callback = @on_save_callback
      callback.call
    end
  end
end

model = Model.new
model.on_save { puts "Saved!" }
model.save # prints "Saved!"
```

In the above example the type of `&block` wasn't specified: this just means that the captured block doesn't have arguments and doesn't return anything.

戻り値の型が指定されていないとき、proc の呼び出しは何も返さないことに注意してください。

```crystal
def some_proc(&block : Int32 ->)
  block
end

proc = some_proc { |x| x + 1 }
proc.call(1) # void
```

何か返して欲しい場合には、戻り値の型を指定するか、もしくはすべての型を許容したいときはアンダースコアを使ってください。

```crystal
def some_proc(&block : Int32 -> _)
  block
end

proc = some_proc { |x| x + 1 }
proc.call(1) # 2

proc = some_proc { |x| x.to_s }
proc.call(1) # "1"
```

## break and next

`return` and `break` can't be used inside a captured block. `next` can be used and will exit and give the value of the captured block.

## with ... yield

The default receiver within a captured block can't be changed by using `with ... yield`.
