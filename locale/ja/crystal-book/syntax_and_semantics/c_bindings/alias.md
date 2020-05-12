# alias

`lib` の中で `alias` を宣言することで C `typedef` が宣言できます。

```crystal
lib X
  alias MyInt = Int32
end
```

これで `Int32` と `MyInt` は相互に交換可能になります。

```crystal
lib X
  alias MyInt = Int32

  fun some_fun(value : MyInt)
end

X.some_fun 1 # OK
```

`alias` が便利なのは、長い型名を何度も書かずに済むようにできることに限らず、コンパイル時のフラグに基づく型宣言にも利用できます。

```crystal
lib C
  {% if flag?(:x86_64) %}
    alias SizeT = Int64
  {% else %}
    alias SizeT = Int32
  {% end %}

  fun memcmp(p1 : Void*, p2 : Void*, size : C::SizeT) : Int32
end
```

この宣言の型を指定方法については[型の文法](../type_grammar.html)を参照してください。
