# Closures

Captured blocks and proc literals closure local variables and `self`. 例を見てみるとわかりやすいでしょう。

```crystal
x = 0
proc = ->{ x += 1; x }
proc.call # => 1
proc.call # => 2
x         # => 2
```

もしくは、メソッドが返す proc の場合は以下となります。

```crystal
def counter
  x = 0
  ->{ x += 1; x }
end

proc = counter
proc.call # => 1
proc.call # => 2
```

In the above example, even though `x` is a local variable, it was captured by the proc literal. In this case the compiler allocates `x` on the heap and uses it as the context data of the proc to make it work, because normally local variables live in the stack and are gone after a method returns.

## Type of closured variables

ローカル変数の型に対して、コンパイラは「それなりに」賢く解釈します。例をあげます。

```crystal
def foo
  yield
end

x = 1
foo do
  x = "hello"
end
x # : Int32 | String
```

The compiler knows that after the block, `x` can be Int32 or String (it could know that it will always be String because the method always yields; this may improve in the future).

If `x` is assigned something else after the block, the compiler knows the type changed:

```crystal
x = 1
foo do
  x = "hello"
end
x # : Int32 | String

x = 'a'
x # : Char
```

However, if `x` is closured by a proc, the type is always the mixed type of all assignments to it:

```crystal
def capture(&block)
  block
end

x = 1
capture { x = "hello" }

x = 'a'
x # : Int32 | String | Char
```

This is because the captured block could have been potentially stored in a class or instance variable and invoked in a separate thread in between the instructions. このことに対して、コンパイラが綿密な分析をすることはありません。コンパイラはただ、proc に変数が捕捉されていたら、その proc がいつどこで実行されるかは未知である、として扱います。

これは通常の proc リテラルにも当てはまります。そして、その proc が実行も保持もされないことが明白であっても同様です。

```crystal
def capture(&block)
  block
end

x = 1
->{ x = "hello" }

x = 'a'
x # : Int32 | String | Char
```



