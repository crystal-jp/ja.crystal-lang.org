# Type grammar

以下の場合、

* specifying [type restrictions](type_restrictions.html)
* specifying [type arguments](generics.html)
* [declaring variables](declare_var.html)
* declaring [aliases](alias.html)
* declaring [typedefs](c_bindings/type.html)
* the argument of an [is_a?](is_a.html) pseudo-call
* the argument of an [as](as.html) expression
* the argument of a [sizeof](sizeof.html) expression
* the argument of an [instance_sizeof](instance_sizeof.html) expression
* a method's [return type](return_types.html)

一般的な型に対する便利な記法が用意されています。These are especially useful when writing [C bindings](c_bindings/index.html), but can be used in any of the above locations.

## Paths and generics

一般的な型とジェネリクスは以下のように利用します。

```crystal
Int32
My::Nested::Type
Array(String)
```

## Union

```crystal
alias Int32OrString = Int32 | String
```

The pipe (`|`) in types creates a union type. `Int32 | String` is read "Int32 or String". In regular code, `Int32 | String` means invoking the method `|` on `Int32` with `String` as an argument.

## Nilable

```crystal
alias Int32OrNil = Int32?
```

これは以下と同じです。

```crystal
alias Int32OrNil = Int32 | ::Nil
```

In regular code, `Int32?` is a syntax error.

## Pointer

```crystal
alias Int32Ptr = Int32*
```

これは以下と同じです。

```crystal
alias Int32Ptr = Pointer(Int32)
```

In regular code, `Int32*` means invoking the `*` method on `Int32`.

## StaticArray

```crystal
alias Int32_8 = Int32[8]
```

これは以下と同じです。

```crystal
alias Int32_8 = StaticArray(Int32, 8)
```

In regular code, `Int32[8]` means invoking the `[]` method on `Int32` with `8` as an argument.

## Tuple

```crystal
alias Int32StringTuple = {Int32, String}
```

これは以下と同じです。

```crystal
alias Int32StringTuple = Tuple(Int32, String)
```

In regular code, `{Int32, String}` is a tuple instance containing `Int32` and `String` as its elements. This is different than the above tuple **type**.

## NamedTuple

```crystal
alias Int32StringNamedTuple = {x: Int32, y: String}
```

これは以下と同じです。

```crystal
alias Int32StringNamedTuple = NamedTuple(x: Int32, y: String)
```

In regular code, `{x: Int32, y: String}` is a named tuple instance containing `Int32` and `String` for `x` and `y`. This is different than the above named tuple **type**.

## Proc

```crystal
alias Int32ToString = Int32 -> String
```

これは以下と同じです。

```crystal
alias Int32ToString = Proc(Int32, String)
```

引数を持たない Proc を指定するには以下のようにします。

```crystal
alias ProcThatReturnsInt32 = -> Int32
```

複数の引数を持つ Proc を指定するには以下のようにします。

```crystal
alias Int32AndCharToString = Int32, Char -> String
```

ネストされた Proc に対しては (および実際にはどんな型であっても) カッコを利用することができます。

```crystal
alias ComplexProc = (Int32 -> Int32) -> String
```

In regular code `Int32 -> String` is a syntax error.

## self

`self` can be used in the type grammar to denote a `self` type. Refer to the [type restrictions](type_restrictions.html) section.

## class

`class` is used to refer to a class type, instead of an instance type.

例をあげます。

```crystal
def foo(x : Int32)
  "instance"
end

def foo(x : Int32.class)
  "class"
end

foo 1     # "instance"
foo Int32 # "class"
```

`class` is also useful for creating arrays and collections of class type:

```crystal
class Parent
end

class Child1 < Parent
end

class Child2 < Parent
end

ary = [] of Parent.class
ary << Child1
ary << Child2
```

## Underscore

型制約でアンダースコアを使うことが可能です。それはすべてにマッチすることを示します。

```crystal
# Same as not specifying a restriction, not very useful
def foo(x : _)
end

# A bit more useful: any two arguments Proc that returns an Int32:
def foo(x : _, _ -> Int32)
end
```

## typeof

`typeof` is allowed in the type grammar. 渡された式の型の組み合わせ (ユニオン型) を返します。

```crystal
typeof(1 + 2)  # => Int32
typeof(1, "a") # => (Int32 | String)
```
