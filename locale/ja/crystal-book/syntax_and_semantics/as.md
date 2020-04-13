# as

The `as` pseudo-method restricts the types of an expression. 例をあげます。

```crystal
if some_condition
  a = 1
else
  a = "hello"
end

# a : Int32 | String
```

In the above code, `a` is a union of `Int32 | String`. If for some reason we are sure `a` is an `Int32` after the `if`, we can force the compiler to treat it like one:

```crystal
a_as_int = a.as(Int32)
a_as_int.abs # works, compiler knows that a_as_int is Int32
```

The `as` pseudo-method performs a runtime check: if `a` wasn't an `Int32`, an [exception](exception_handling.html) is raised.

The argument to the expression is a [type](type_grammar.html).

ある型を別の型に強制することは不可能で、コンパイルエラーが発生します。

```crystal
1.as(String) # Compile-time error
```

**Note: ** you can't use `as` to convert a type to an unrelated type: `as` is not like a `cast` in other languages. Methods on integers, floats and chars are provided for these conversions. 代替になるものとしては、以下で説明するポインタキャストを利用することができます。

## Converting between pointer types

The `as` pseudo-method also allows to cast between pointer types:

```crystal
ptr = Pointer(Int32).malloc(1)
ptr.as(Int8*) # :: Pointer(Int8)
```

このとき、ランタイムのチェックは行われません。ポインタは安全でない (unsafe) ため、通常、この型キャストは C バインディングやローレベルなコードにおいてのみ利用します。

## Converting between pointer types and other types

ポインタ型と Reference 型を相互に変換することも可能です。

```crystal
array = [1, 2, 3]

# object_id returns the address of an object in memory,
# so we create a pointer with that address
ptr = Pointer(Void).new(array.object_id)

# Now we cast that pointer to the same type, and
# we should get the same value
array2 = ptr.as(Array(Int32))
array2.same?(array) # => true
```

この場合も、ポインタが絡む処理になるためランタイムのチェックは行われません。このキャストが必要になるケースは前述のものよりも稀です。ただ、これによって (String などの) コアとなる型を Crystal 自身で実装することが可能になっており、また、Reference 型を void ポインタにキャストすることで C の関数に渡すこともできます。

## Usage for casting to a bigger type

The `as` pseudo-method can be used to cast an expression to a "bigger" type. 例をあげます。

```crystal
a = 1
b = a.as(Int32 | Float64)
b # :: Int32 | Float64
```

上記では一体何が嬉しいのかわからないかもしれません。では、以下のように配列の要素を map する場合ではどうでしょう？

```crystal
ary = [1, 2, 3]

# We want to create an array 1, 2, 3 of Int32 | Float64
ary2 = ary.map { |x| x.as(Int32 | Float64) }

ary2        # :: Array(Int32 | Float64)
ary2 << 1.5 # OK
```

The `Array#map` method uses the block's type as the generic type for the Array. Without the `as` pseudo-method, the inferred type would have been `Int32` and we wouldn't have been able to add a `Float64` into it.

## Usage for when the compiler can't infer the type of a block

コンパイラがブロックの型を推論できない場合があります。This can happen in recursive calls that depend on each other. In those cases you can use `as` to let it know the type:

```crystal
some_call { |v| v.method.as(ExpectedType) }
```
