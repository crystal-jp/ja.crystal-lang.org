# out

[waitpid](http://www.gnu.org/software/libc/manual/html_node/Process-Completion.html) 関数を考えてみましょう。

```crystal
lib C
  fun waitpid(pid : Int32, status_ptr : Int32*, options : Int32) : Int32
end
```

この関数のドキュメントは以下の内容です。

```
status_ptr が指すオブジェクトに保持されている子プロセスからのステータス情報
```

この関数を以下のように利用できます。

```crystal
status_ptr = uninitialized Int32

C.waitpid(pid, pointerof(status_ptr), options)
```

このとき、`status_ptr` のポインタを関数に渡し、値を設定してもらっています。

上記は `out` パラメータを使うことでよりシンプルに書くことができます。

```crystal
C.waitpid(pid, out status_ptr, options)
```

このとき、引数の型が `Int32*` であるため、`Int32` 型の変数 `status_ptr` を自動的に宣言します。

これは、`fun` の引数がその型のポインタである場合には、どのような型に対しても有効です (もちろん、ポインタが差す値が関数によって設定されることが前提です)。
