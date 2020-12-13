# type

`lib` 宣言の内部で `type` を宣言すると、C の `typedef` 宣言に近いことができます。ただし、より厳密に振舞います。

```crystal
lib X
  type MyInt = Int32
end
```

C とは異なり、`Int32` と `MyInt` を相互に交換して使うことはできません。

```crystal
lib X
  type MyInt = Int32

  fun some_fun(value : MyInt)
end

X.some_fun 1 # Error: argument 'value' of 'X#some_fun' must be X::MyInt, not Int32
```

したがって、ラップしようとしている C ライブラリの生成する opaque な型に対して `type` 宣言を有効です。この例としては、`fopen` によって得られる C の `FILE` 型があげられます。

この宣言の型の指定方法については[型の文法](../type_grammar.md)を参照してください。
