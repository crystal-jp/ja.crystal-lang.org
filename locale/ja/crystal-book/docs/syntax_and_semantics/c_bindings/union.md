# union

`lib` の内部で `union` を宣言することで C の共用体を宣言できます。

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

共用体のインスタンスを生成するには `new` を利用します。

```crystal
value = U::IntOrFloat.new
```

これによって、スタックに共用体が割り当てられます。

C の共用体は、初期状態として、すべての値が「ゼロ」の状態になります。つまり、整数と浮動小数点数はゼロで、ポインタはゼロのアドレスを指している、などの状態です。

このように初期化されることを避けたい場合は `uninitialized` を利用します。

```crystal
value = uninitialized U::IntOrFloat
value.some_int # => 何かゴミの値
```

プロパティの設定、および参照が可能です。

```crystal
value = U::IntOrFloat.new
value.some_int = 1
value.some_int   # => 1
value.some_float # => 4.94066e-324
```

代入された値がプロパティの型と正確に同じものでない場合、[to_unsafe](to_unsafe.md) を呼び出して型を一致させようとします。

C の共用体は関数やメソッドに (コピーとして) 値渡しされます。また、メソッドから返るときも値で渡されます。

```crystal
def change_it(value)
  value.some_int = 1
end

value = U::IntOrFloat.new
change_it value
value.some_int # => 0
```

共用体のフィールドに使用可能な型の指定方法については[型の文法](../type_grammar.md)を参照してください。
