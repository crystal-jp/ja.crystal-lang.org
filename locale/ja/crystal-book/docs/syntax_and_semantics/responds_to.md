# responds_to?

`responds_to?` という疑似メソッドを使うと、ある名前のメソッドを持っているかどうかを判定できます。例をあげます。

```crystal
a = 1
a.responds_to?(:abs)  # => true
a.responds_to?(:size) # => false
```

これが疑似メソッドである理由は、[if var.responds_to?(...)](if_varresponds_to.md) で説明したように、引数にシンボルリテラルのみを受け取り、そしてコンパイラによって特別な扱いを受けるからです。
