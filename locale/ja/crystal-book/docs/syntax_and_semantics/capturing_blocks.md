# ブロックの捕捉

ブロックを捕捉して `Proc` にすることができます。これはコンテキストに結び付いてコードブロック (クロージャ) を表すものです。

ブロックを捕捉するには、メソッドにブロック引数を設定し、その名前とインプット/アウトプットの型を指定する必要があります。例をあげます。

```crystal
def int_to_int(&block : Int32 -> Int32)
  block
end

proc = int_to_int { |x| x + 1 }
proc.call(1) # => 2
```

上記のコードでは、`int_to_int` に渡されたコードブロックを `block` という変数に捕捉し、それをメソッドの戻り値としています。このとき `proc` の型は [`Proc(Int32, Int32)`](https://crystal-lang.org/api/latest/Proc.html) で、これは単一の `Int32` を引数に取り、`Int32` を返す関数となります。

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

上記の例において、`&block` の型を指定していません。これは捕捉されたブロックが引数を何も受け取らず、戻り値も返さないことを示しています。

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

## break と next

`return` と `break` を捕捉されたブロックの中で使用することはできません。`next` は捕捉されたブロックの中で使用することができて、ブロックを終了し与えられた値をブロックの呼び出し結果とします。

## with ... yield

捕捉されたブロックのレシーバは`with ... yield`を使って変更することはできません。
