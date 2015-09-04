# case

`case` を使うと、パターンマッチングを利用した条件によって制御を行うことができます。これは、多少異なる点もありますが、`if` 文で if-else-if の形で複数の条件分岐を構築することに近いです。

基本的な書き方は以下のような形で、値と値のマッチングによって制御します。

```ruby
case exp
when value1, value2
  do_something
when value3
  do_something_else
else
  do_another_thing
end

# 上記は以下と同じ
tmp = exp
if value1 === tmp || value2 === tmp
  do_something
elsif value3 === tmp
  do_something_else
else
  do_another_thing
end
```

`case` において、対象の値と条件式は `===` を使って比較されることを覚えておいてください。

もし `when` 節の expression is a type, `is_a?` is used. Additionally, if the case expression is a variable or a variable assignment the type of the variable is restricted:

```ruby
case var
when String
  # var :: String
  do_something
when Int32
  # var :: Int32
  do_something_else
else
  # here var is neither a String nor an Int32
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

```ruby
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

Finally, you can ommit the `case`'s value:

```ruby
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
