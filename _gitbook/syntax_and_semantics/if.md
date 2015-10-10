# if

`if` は、もし与えられた条件が「*真*」である場合には `then` 節を評価し、そうでない場合には `else` 節を (もしあれば) 評価するものです。

```crystal
a = 1
if a > 0
  a = 10
end
a #=> 10

b = 1
if b > 2
  b = 10
else
  b = 20
end
b #=> 20
```

複数の条件分岐を組み合わせた「if-else-if」の文を書くには `elsif` を使います。

```crystal
if some_condition
  do_something
elsif some_other_condition
  do_something_else
else
  do_that
end
```

ある変数が `if` の分岐節の中で使われたとき、その型は評価された式によって決まります。

```crystal
a = 1
if some_condition
  a = "hello"
else
  a = true
end
# a :: String | Bool

b = 1
if some_condition
  b = "hello"
end
# b :: Int32 | String

if some_condition
  c = 1
else
  c = "hello"
end
# c :: Int32 | String

if some_condition
  d = 1
end
# d :: Int32 | Nil
```

もし、変数がある分岐節の中で宣言されて、条件に合致せずその宣言の式が評価されなかった場合も、`if` の後でその変数は `Nil` 型を持っていることに注意してください。

`if` の分岐節の中である変数に代入が行われたとき、変数の型は代入された式の型になりますが、もし条件に合致せずその代入式が評価されなかった場合には、以前の型のままで変更されることはありません。

```crystal
a = 1
if some_condition
  a = "hello"
  # a :: String
  a.size
end
# a :: String | Int32
```

つまり、変数の型は最後に代入された式によって決定されるということです。

もし、ある分岐節が `if` の最後まで絶対に到達しない場合、例えば `return`/`next`/`break`/`raise` などが存在した場合には、`if` の後でその分岐節における型が考慮されることはありません。

```crystal
if some_condition
  e = 1
else
  e = "hello"
  # e :: String
  return
end
# e :: Int32
```
