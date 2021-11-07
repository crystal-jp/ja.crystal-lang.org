# while

`while`は条件式が*真となる*間は繰り返して本体を実行します。

```crystal
while some_condition
  do_this
end
```

まず条件式に対して判定が行なわれて、*真であった*ときに本体が実行されます。これはつまり、本体が1度も実行されない場合もあるということです。

`if`のように、`while`の条件式が変数であった場合、本体ではその変数は`nil`ではないことが保証されます。条件式が`var.is_a?(Type)`という形なら、本体では`var`は`Type`型であることが保証されます。さらに、`var.responds_to?(:method)`という形なら、本体では`var`がそのメソッドを持つことが保証されます。

`while`を実行したあとの変数の型は、`while`以前の型と、`while`を抜ける直前の型によって決まります。

```crystal
a = 1
while some_condition
  # a : Int32 | String
  a = "hello"
  # a : String
  a.size
end
# a : Int32 | String
```

## 条件によってループを抜ける

ループを抜けるための条件を設定することで、必ず1回は本体を実行することができます。

```crystal
while true
  do_something
  break if some_condition
end
```

標準ライブラリの`loop`を利用しても同じことが可能です。

```crystal
loop do
  do_something
  break if some_condition
end
```

## 式としての if

The value of a `while` is the value of the `break` expression that exits the `while`'s body:

```crystal
a = 0
x = while a < 5
  a += 1
  break "four" if a == 4
  break "three" if a == 3
end
x # => "three"
```

If the `while` loop ends normally (because its condition became false), the value is `nil`:

```crystal
x = while 1 > 2
  break 3
end
x # => nil
```

`break` expressions with no arguments also return `nil`:

```crystal
x = while 2 > 1
  break
end
x # => nil
```

`break` expressions with multiple arguments are packed into [`Tuple`](https://crystal-lang.org/api/latest/Tuple.html) instances:

```crystal
x = while 2 > 1
  break 3, 4
end
x         # => {3, 4}
typeof(x) # => Tuple(Int32, Int32)
```

The type of a `while` is the union of the types of all `break` expressions in the body, plus `Nil` because the condition can fail:

```crystal
x = while 1 > 2
  if rand < 0.5
    break 3
  else
    break '4'
  end
end
typeof(x) # => (Char | Int32 | Nil)
```

However, if the condition is exactly the `true` literal, then its effect is excluded from the return value and return type:

```crystal
x = while true
  break 1
end
x         # => 1
typeof(x) # => Int32
```

In particular, a `while true` expression with no `break`s has the `NoReturn` type, since the loop can never be exited in the same scope:

```crystal
x = while true
  puts "yes"
end
x         # unreachable
typeof(x) # => NoReturn
```
