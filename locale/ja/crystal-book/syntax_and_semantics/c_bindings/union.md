# union

A `union` declaration inside a `lib` declares a C union:

```crystal
lib U
  # C では:
  #
  #  union IntOrFloat {
  #    int some_int;
  #    double some_float;
  #  };
  union IntOrFloat
    some_int : Int32
    some_float : Float64
  end
end
```

To create an instance of a union use `new`:

```crystal
value = U::IntOrFloat.new
```

これによって、スタックに共用体が割り当てられます。

C の共用体は、初期状態として、すべての値が「ゼロ」の状態になります。つまり、整数と浮動小数点数はゼロで、ポインタはゼロのアドレスを指している、などの状態です。

To avoid this initialization you can use `uninitialized`:

```crystal
value = uninitialized U::IntOrFloat
value.some_int # => some garbage value
```

プロパティの設定、および参照が可能です。

```crystal
value = U::IntOrFloat.new
value.some_int = 1
value.some_int   # => 1
value.some_float # => 4.94066e-324
```

If the assigned value is not exactly the same as the property's type, [to_unsafe](to_unsafe.html) will be tried.

C の共用体は関数やメソッドに (コピーとして) 値渡しされます。また、メソッドから返るときも値で渡されます。

```crystal
def change_it(value)
  value.some_int = 1
end

value = U::IntOrFloat.new
change_it value
value.some_int # => 0
```

Refer to the [type grammar](../type_grammar.html) for the notation used in union field types.
