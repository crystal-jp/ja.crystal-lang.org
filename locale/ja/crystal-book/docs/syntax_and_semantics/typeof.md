# typeof

`typeof` 式はある式の型を返します。

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

`typeof` は実際には式を評価せず、利用されるのはコンパイルのときです。例えば以下の例では、ネストされた型から、再帰的に型の組み合わせ (ユニオン型) を構築しています。

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

この式は[型の文法](type_grammar.md)で使うこともできます。
