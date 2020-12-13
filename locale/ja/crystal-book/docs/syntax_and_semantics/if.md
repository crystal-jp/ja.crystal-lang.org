# if

`if`は与えられた条件式が*真*である場合にthen節を評価します。偽の場合、`else`節があればそちらを評価します。

```crystal
a = 1
if a > 0
  a = 10
end
a # => 10

b = 1
if b > 2
  b = 10
else
  b = 20
end
b # => 20
```

複数の条件分岐を連続させるには`elsif`を使います。

```crystal
if some_condition
  do_something
elsif some_other_condition
  do_something_else
else
  do_that
end
```

ある変数が`if`の分岐節の中で使われたとき、その後の変数の型は分岐節の中での使われ方に依存します。

```crystal
a = 1
if some_condition
  a = "hello"
else
  a = true
end
# a : String | Bool

b = 1
if some_condition
  b = "hello"
end
# b : Int32 | String

if some_condition
  c = 1
else
  c = "hello"
end
# c : Int32 | String

if some_condition
  d = 1
end
# d : Int32 | Nil
```

もし一方の節である変数が宣言されて、もう一方ではされなかったとき、`if`の後でその変数は`Nil`型を持つこととに注意してください。

`if`の分岐節の中である変数に代入が行なわれたとき、変数の型は代入された式の型になりますが、もし条件に合致せずその代入式が評価されなかった場合、以前の型のままで変更されることはありません。

```crystal
a = 1
if some_condition
  a = "hello"
  # a : String
  a.size
end
# a : String | Int32
```

つまり、変数の型は最後に代入された式によって決定されるということです。

ある分岐節が`if`の最後まで絶対に到達しない場合 (`return`や`next`、`break`、`raise`などがある場合)、 `if`の後でその分岐節における型が考慮されることはありません。

```crystal
if some_condition
  e = 1
else
  e = "hello"
  # e : String
  return
end
# e : Int32
```
