# out

Consider the [waitpid](http://www.gnu.org/software/libc/manual/html_node/Process-Completion.html) function:

```crystal
lib C
  fun waitpid(pid : Int32, status_ptr : Int32*, options : Int32) : Int32
end
```

この関数のドキュメントは以下の内容です。

```
The status information from the child process is stored in the object
that status_ptr points to, unless status_ptr is a null pointer.
```

この関数を以下のように利用できます。

```crystal
status_ptr = uninitialized Int32

C.waitpid(pid, pointerof(status_ptr), options)
```

In this way we pass a pointer of `status_ptr` to the function for it to fill its value.

There's a simpler way to write the above by using an `out` parameter:

```crystal
C.waitpid(pid, out status_ptr, options)
```

The compiler will automatically declare a `status_ptr` variable of type `Int32`, because the argument is an `Int32*`.

これは、引数がその型のポインタである場合には、どのような型に対しても有効です (もちろん、ポインタが指す値が関数によって設定されることが前提です) 。
