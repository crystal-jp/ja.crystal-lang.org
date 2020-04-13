# Generics

Generics allow you to parameterize a type based on other type. Consider a Box type:

```crystal
class MyBox(T)
  def initialize(@value : T)
  end

  def value
    @value
  end
end

int_box = MyBox(Int32).new(1)
int_box.value # => 1 (Int32)

string_box = MyBox(String).new("hello")
string_box.value # => "hello" (String)

another_box = MyBox(String).new(1) # Error, Int32 doesn't match String
```

Generics are especially useful for implementing collection types. `Array`, `Hash`, `Set` are generic types, as is `Pointer`.

型引数は複数設定することが可能です。

```crystal
class MyDictionary(K, V)
end
```

Any name can be used for type arguments:

```crystal
class MyDictionary(KeyType, ValueType)
end
```

## Type variables inference

もし型引数が指定されなかった場合、ジェネリック型のコンストラクタに設定された型制約は自由変数として扱われ、それが型推論に利用されます。例をあげます。

```crystal
MyBox.new(1)       # : MyBox(Int32)
MyBox.new("hello") # : MyBox(String)
```

In the above code we didn't have to specify the type arguments of `MyBox`, the compiler inferred them following this process:

* `MyBox.new(value)` delegates to `initialize(@value : T)`
* `T` isn't bound to a type yet, so the compiler binds it to the type of the given argument

このようにして、ジェネリック型の扱いが冗長になってしまうことを軽減しています。

## Generic structs and modules

構造体とモジュールをジェネリックにすることも可能です。ジェネリックなモジュールは以下のようにインクルードします。

```crystal
module Moo(T)
  def t
    T
  end
end

class Foo(U)
  include Moo(U)

  def initialize(@value : U)
  end
end

foo = Foo.new(1)
foo.t # Int32
```

Note that in the above example `T` becomes `Int32` because `Foo.new(1)` makes `U` become `Int32`, which in turn makes `T` become `Int32` via the inclusion of the generic module.

## Generic types inheritance

ジェネリックなクラスとモジュールを継承することも可能です。継承する際はに、具体的な型を指定するか、もしくは型変数を移譲することができます。

```crystal
class Parent(T)
end

class Int32Child < Parent(Int32)
end

class GenericChild(T) < Parent(T)
end
```
