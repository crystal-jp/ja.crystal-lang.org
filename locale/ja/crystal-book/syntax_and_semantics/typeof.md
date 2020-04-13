# typeof

The `typeof` expression returns the type of an expression:

```crystal
a = 1
b = typeof(a) # => Int32
```

複数の引数を渡すことも可能で、その場合にはそれぞれの式の組み合わせの型となります。

```crystal
typeof(1, "a", 'a') # => (Int32 | String | Char)
```

これはジェネリックコードにおいて、コンパイラの型推論の力を利用したいときにしばしば使われます。

```crystal
hash = {} of Int32 => String
another_hash = typeof(hash).new # :: Hash(Int32, String)
```

Since `typeof` doesn't actually evaluate the expression, it can be
used on methods at compile time, such as in this example, which
recursively forms a union type out of nested type parameters:

```crystal
class Array
  def self.elem_type(typ)
    if typ.is_a?(Array)
      elem_type(typ.first)
    else
      typ
    end
  end
end

nest = [1, ["b", [:c, ['d']]]]
flat = Array(typeof(Array.elem_type(nest))).new
typeof(nest) # => Array(Int32 | Array(String | Array(Symbol | Array(Char))))
typeof(flat) # => Array(String | Int32 | Symbol | Char)
```

This expression is also available in the [type grammar](type_grammar.html).
