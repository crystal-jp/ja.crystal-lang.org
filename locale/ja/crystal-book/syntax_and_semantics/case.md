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

`case`において、対象の値と条件式は*case 等価性演算子* (`===`) によって比較されます。これは[`Object`](https://crystal-lang.org/api/Object.html#%3D%3D%3D%28other%29-instance-method)に定義されたメソッドで、case 文で使う際に意味があるようにサブクラスでオーバライドされています。例えば、[`Class`](https://crystal-lang.org/api/Class.html#%3D%3D%3D%28other%29-instance-method) 型では case 等価性が「比較対象のオブジェクトがそのクラスのインスタンスかどうか」として定義されていたり、[`Regex`](https://crystal-lang.org/api/Regex.html#%3D%3D%3D%28other%3AString%29-instance-method) では「比較対象の文字列にマッチするかどうか」で、[`Range`](https://crystal-lang.org/api/Range.html#%3D%3D%3D%28value%29-instance-method)では「比較対象の値が含まれるかどうか」で定義されています。

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
