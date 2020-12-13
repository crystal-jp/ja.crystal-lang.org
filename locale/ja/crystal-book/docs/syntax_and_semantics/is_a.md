# is_a?

`is_a?` という疑似メソッドを使うと、ある他の型を継承、もしくはインクルードしているしていることを判定できます。例をあげます。

```crystal
a = 1
a.is_a?(Int32)          # => true
a.is_a?(String)         # => false
a.is_a?(Number)         # => true
a.is_a?(Int32 | String) # => true
```

これが疑似メソッドである理由は、[if var.is_a?(...)](if_varis_a.md)で説明したように、このメソッドをコンパイラは把握していて、型の情報に影響を与えるためです。また、コンパイル時に知っておく必要のある[型](type_grammar.md)を引数として指定することも可能です。
