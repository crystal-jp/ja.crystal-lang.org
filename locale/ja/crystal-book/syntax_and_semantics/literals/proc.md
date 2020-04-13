# Proc

A [Proc](http://crystal-lang.org/api/Proc.html) represents a function pointer with an optional context (the closure data). 通常、Proc リテラルを使って生成します。

```crystal
# A proc without arguments
->{ 1 } # Proc(Int32)

# A proc with one argument
->(x : Int32) { x.to_s } # Proc(Int32, String)

# A proc with two arguments:
->(x : Int32, y : Int32) { x + y } # Proc(Int32, Int32, Int32)
```

The types of the arguments are mandatory, except when directly sending a proc literal to a lib `fun` in C bindings.

戻り値の型は Proc の内容から推論されます。

A special `new` method is provided too:

```crystal
Proc(Int32, String).new { |x| x.to_s } # Proc(Int32, String)
```

この形式の場合、戻り値の型を指定することができるため、Proc の本体の戻り値が正しい型であるかをチェックすることが可能です。

## The Proc type

To denote a Proc type you can write:

```crystal
# A Proc accepting a single Int32 argument and returning a String
Proc(Int32, String)

# A proc accepting no arguments and returning Void
Proc(Void)

# A proc accepting two arguments (one Int32 and one String) and returning a Char
Proc(Int32, String, Char)
```

In type restrictions, generic type arguments and other places where a type is expected, you can use a shorter syntax, as explained in the [type](../type_grammar.html):

```crystal
# An array of Proc(Int32, String, Char)
Array(Int32, String -> Char)
```

## Invoking

To invoke a Proc, you invoke the `call` method on it. そのとき、引数の数は Proc の型と一致している必要があります。

```crystal
proc = ->(x : Int32, y : Int32) { x + y }
proc.call(1, 2) # => 3
```

## From methods

既存のメソッドから Proc を作ることもできます。

```crystal
def one
  1
end

proc = ->one
proc.call # => 1
```

引数を持つメソッドの場合は、その型を指定する必要があります。

```crystal
def plus_one(x)
  x + 1
end

proc = ->plus_one(Int32)
proc.call(41) # => 42
```

レシーバを指定することも可能です。

```crystal
str = "hello"
proc = ->str.count(Char)
proc.call('e') # => 1
proc.call('l') # => 2
```
