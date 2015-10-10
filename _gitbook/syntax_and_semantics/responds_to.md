# responds_to?

`responds_to?` という擬似メソッドを使うと、ある名前のメソッドを持っているかどうかを判定できます。例をあげます。

```crystal
a = 1
a.responds_to?(:abs)    #=> true
a.responds_to?(:size) #=> false
```

これが擬似メソッドである理由は、[if 変数.responds_to?(...)](if_varresponds_to.html) で説明したように、引数にシンボルのリテラルのみを受け取り、そして、コンパイラによって特別な扱いを受けるからです。
