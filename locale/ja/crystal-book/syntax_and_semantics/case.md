# case

A `case` is a control expression which functions a bit like pattern matching. これは、多少異なる点もありますが、`if` 文で if-else-if の形で複数の条件分岐を構築することに近いです。

基本的な書き方は以下のような形で、値と値のマッチングによって制御します。

```crystal
case exp
when value1, value2
  do_something
when value3
  do_something_else
else
  do_another_thing
end

# The above is the same as:
tmp = exp
if value1 === tmp || value2 === tmp
  do_something
elsif value3 === tmp
  do_something_else
else
  do_another_thing
end
```

For comparing an expression against a `case`'s value the *case equality operator* `===` is used. It is defined as a method on [`Object`](https://crystal-lang.org/api/Object.html#%3D%3D%3D%28other%29-instance-method) and can be overridden by subclasses to provide meaningful semantics in case statements. For example, [`Class`](https://crystal-lang.org/api/Class.html#%3D%3D%3D%28other%29-instance-method) defines case equality as when an object is an instance of that class, [`Regex`](https://crystal-lang.org/api/Regex.html#%3D%3D%3D%28other%3AString%29-instance-method) as when the value matches the regular expression and [`Range`](https://crystal-lang.org/api/Range.html#%3D%3D%3D%28value%29-instance-method) as when the value is included in that range.

If a `when`'s expression is a type, `is_a?` is used. そして、case 式が変数、もしくは変数への代入であるとき、その変数の型に対して制限が加えられます。

```crystal
case var
when String
  # var : String
  do_something
when Int32
  # var : Int32
  do_something_else
else
  # ここでは var は String と Int32 のどちらでもない
  do_another_thing
end

# The above is the same as:
if var.is_a?(String)
  do_something
elsif var.is_a?(Int32)
  do_something_else
else
  do_another_thing
end
```

You can invoke a method on the `case`'s expression in a `when` by using the implicit-object syntax:

```crystal
case num
when .even?
  do_something
when .odd?
  do_something_else
end

# The above is the same as:
tmp = num
if tmp.even?
  do_something
elsif tmp.odd?
  do_something_else
end
```

You may use `then` after the `when` condition to place the body on a single line.

```crystal
case exp
when value1, value2 then do_something
when value3         then do_something_else
else                     do_another_thing
end
```

Finally, you can omit the `case`'s value:

```crystal
case
when cond1, cond2
  do_something
when cond3
  do_something_else
end

# The above is the same as:
if cond1 || cond2
  do_something
elsif cond3
  do_something_else
end
```

この方がコードが読みやすくなる場合もあるでしょう。

## Tuple literal

When a case expression is a tuple literal there are a few semantic differences if a `when` condition is also a tuple literal.

### Tuple size must match

```crystal
case {value1, value2}
when {0, 0} # OK, 2 elements
  # ...
when {1, 2, 3} # Syntax error: wrong number of tuple elements (given 3, expected 2)
  # ...
end
```

### Underscore allowed

```crystal
case {value1, value2}
when {0, _}
  # Matches if 0 === value1, no test done against value2
when {_, 0}
  # Matches if 0 === value2, no test done against value1
end
```

### Implicit-object allowed

```crystal
case {value1, value2}
when {.even?, .odd?}
  # Matches if value1.even?&& value2.odd?
end
```

### Comparing against a type will perform an is_a? check

```crystal
case {value1, value2}
when {String, Int32}
  # Matches if value1.is_a?(String) && value2.is_a?(Int32)
  # The type of value1 is known to be a String by the compiler,
  # and the type of value2 is known to be an Int32
end
```
