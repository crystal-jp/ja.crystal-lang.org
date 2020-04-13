# if var

If a variable is the condition of an `if`, inside the `then` branch the variable will be considered as not having the `Nil` type:

```crystal
a = some_condition ?nil : 3
# a is Int32 or Nil

if a
  # ここに到達するためには if が真でなければならない
  # ということは、a  が nil というのはあり得ないので、ここでは必ず Int32 である
  a.abs
end
```

This also applies when a variable is assigned in an `if`'s condition:

```crystal
if a = some_expression
  # here a is not nil
end
```

This logic also applies if there are ands (`&&`) in the condition:

```crystal
if a && b
  # here both a and b are guaranteed not to be Nil
end
```

Here, the right-hand side of the `&&` expression is also guaranteed to have `a` as not `Nil`.

Of course, reassigning a variable inside the `then` branch makes that variable have a new type based on the expression assigned.

## Limitations

The above logic works **only for local variables**. It doesn’t work with instance variables, class variables, or variables bound in a closure. The value of these kinds of variables could potentially be affected by another fiber after the condition was checked, rendering it `nil`. It also does not work with constants.

```crystal
if @a
  # here `@a` can be nil
end

if @@a
  # here `@@a` can be nil
end

a = nil
closure = ->{ a = "foo" }

if a
  # here `a` can be nil
end
```

This can be circumvented by assigning the value to a new local variable:

```crystal
if a = @a
  # here `a` can't be nil
end
```

Another option is to use [`Object#try`](https://crystal-lang.org/api/Object.html#try%28%26block%29-instance-method) found in the standard library which only executes the block if the value is not `nil`:

```crystal
@a.try do |a|
  # here `a` can't be nil
end
```

## Method calls

Proc やメソッドの呼び出し (ゲッターやプロパティも含む) の場合にも当てはまりません。なぜなら、Nil を許容する (もしくは、複数の型の組み合わせとなるユニオン型の場合がより一般的でしょう) Proc やメソッドの呼び出しの場合、連続した呼び出しであっても、それらが常に同じ型を返すとは限らないからです。

```crystal
if method # first call to a method that can return Int32 or Nil
  # ここで、最初の呼び出しが Nil を返していないことはわかっている
  method # second call can still return Int32 or Nil
end
```

こういった Proc やメソッド呼び出しの場合にも、上記でインスタンス変数に関して記載したテクニックが有効です。
