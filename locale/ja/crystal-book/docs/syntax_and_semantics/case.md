# case

`case`はパターンマッチのような雰囲気の制御式です。これは、多少異なる点もありますが、if 文で if-else-if の形で複数の条件分岐を構築することに近いです。

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

`case`において、対象の値と条件式は*case 等価性演算子* (`===`) によって比較されます。これは [`Object`](https://crystal-lang.org/api/latest/Object.html#%3D%3D%3D%28other%29-instance-method) に定義されたメソッドで、case 分で使う際に意味があるようにサブクラスでオーバーライドされています。例えば [`Class`](https://crystal-lang.org/api/latest/Class.html#%3D%3D%3D%28other%29-instance-method) 型では「オブジェクトがそのクラスのインスタンスかどうか」として定義されていたり、[`Regex`](https://crystal-lang.org/api/latest/Regex.html#%3D%3D%3D%28other%3AString%29-instance-method) では「比較対象の文字列にマッチするか」で、[`Range`](https://crystal-lang.org/api/latest/Range.html#%3D%3D%3D%28value%29-instance-method) では「比較対象の値が自身に含まれるかどうか」で定義されています。

もし`when`節の条件式に型が与えられていれば、代わりに`is_a?`が使われます。そして、case 式が変数、もしくは変数への代入であるとき、その変数の型に対して制約が加えられます。

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

# 上記は以下と同じ
if var.is_a?(String)
  do_something
elsif var.is_a?(Int32)
  do_something_else
else
  do_another_thing
end
```

暗黙的なオブジェクト指定の構文を使って、`case`の式に対して`when`でメソッドを呼ぶことができます。

```crystal
case num
when .even?
  do_something
when .odd?
  do_something_else
end

# 上記は以下に同じ
tmp = num
if tmp.even?
  do_something
elsif tmp.odd?
  do_something_else
end
```

`when`の条件のあとに`then`を置くことで、1行で本体を書くことができます。

```crystal
case exp
when value1, value2 then do_something
when value3         then do_something_else
else                     do_another_thing
end
```

そして、`case`の値を部分を省略することもできます。

```crystal
case
when cond1, cond2
  do_something
when cond3
  do_something_else
end

# 上記は以下に同じ
if cond1 || cond2
  do_something
elsif cond3
  do_something_else
end
```

この方がコードが読みやすくなる場合もあるでしょう。

## タプルリテラルの利用

caseの式にタプルリテラルで、`when`の条件式もタプルリテラルの場合、少し異なる挙動をします。

### タプルの大きさは等しい必要があります

```crystal
case {value1, value2}
when {0, 0} # 大きさが2で等しいのでOK
  # ...
when {1, 2, 3} # Syntax error: wrong number of tuple elements (given 3, expected 2)
  # ...
end
```

### アンダースコアが利用できます

```crystal
case {value1, value2}
when {0, _}
  # 0 === value1 の場合にマッチして、 value2 に対するチェックは行なわれない
when {_, 0}
  # 0 === value2 の場合にマッチして、 value1 に対するチェックは行なわれない
end
```

### 暗黙のオブジェクト指定が利用できます

```crystal
case {value1, value2}
when {.even?, .odd?}
  # value1.even? && value2.even? のときにマッチ
end
```

### 型に対しては is_a? で比較されます

```crystal
case {value1, value2}
when {String, Int32}
  # value1.is_a?(String) && value2.is_a?(Int32) のときにマッチ
  # このとき value1 と String 型 となることが保証され、
  # value2 は Int32 型となることが保証される
end
```

## Exhaustive case

Using `in` instead of `when` produces an exhaustive case expression; in an exhaustive case, it is a compile-time error to omit any of the required `in` conditions. An exhaustive `case` cannot contain any `when` or `else` clauses.

The compiler supports the following `in` conditions:

### Union type checks

If `case`'s expression is a union value, each of the union types may be used as a condition:

```crystal
# var : (Bool | Char | String)?
case var
in String
  # var : String
in Char
  # var : Char
in Bool
  # var : Bool
in nil # or Nil, but .nil? is not allowed
  # var : Nil
end
```

### Bool values

If `case`'s expression is a `Bool` value, the `true` and `false` literals may be used as conditions:

```crystal
# var : Bool
case var
in true
  do_something
in false
  do_something_else
end
```

### Enum values

If `case`'s expression is a non-flags enum value, its members may be used as conditions, either as constant or predicate method.

```crystal
enum Foo
  X
  Y
  Z
end

# var : Foo
case var
in Foo::X
  # var == Foo::X
in .y?
  # var == Foo::Y
in .z?# :z is not allowed
  # var == Foo::Z
end
```

### Tuple literals

The conditions must exhaust all possible combinations of the `case` expression's elements:

```crystal
# value1, value2 : Bool
case {value1, value2}
in {true, _}
  # value1 is true, value2 can be true or false
  do_something
in {_, false}
  # here value1 is false, and value2 is also false
  do_something_else
end

# Error: case is not exhaustive.
#
# Missing cases:
#  - {false, true}
```
