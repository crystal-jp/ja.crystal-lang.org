# 型 (type)

`lib` 宣言の内部で `type` を宣言すると、C の `typedef` の宣言に近いことができます。ただし、より厳密です。

```ruby
lib X
  type MyInt = Int32
end
```

C とは異なり、`Int32` と `MyInt` を相互に交換することはできません。

```ruby
lib X
  type MyInt = Int32

  fun some_fun(value : MyInt)
end

X.some_fun 1 # エラー: 'X#some_fun' の引数 'value' は
             # Int32 ではなく X::MyInt でなければならない
```

したがって、ラップしようとしている C ライブラリによって生成された不透明な型 (opaque type) に対して、`type` 宣言を有効に利用することができます。この例としては、`fopen` によって得られる C の `FILE` 型をあげられます。

typedef の型を設定する際の記載方法については[型文法](type_grammar.html)を参照してください。
