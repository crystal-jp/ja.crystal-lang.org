# エイリアス (alias)

`lib` の内部で `alias` を宣言することで C の typedef を宣言できます。

```crystal
lib X
  alias MyInt = Int32
end
```

これで、`Int32` と `MyInt` は相互に交換可能になります。

```crystal
lib X
  alias MyInt = Int32

  fun some_fun(value : MyInt)
end

X.some_fun 1 # OK
```

`alias` が最も便利なのは、長い型名を何度も何度も書かずに済むようにできることです。ただ、コンパイル時フラグに基づく型宣言でも非常に有効です。

```crystal
lib C
  ifdef x86_64
    alias SizeT = Int64
  else
    alias SizeT = Int32
  end

  fun memcmp(p1 : Void*, p2 : Void*, size : C::SizeT) : Int32
end
```

alias の型を設定する際の記載方法については[型文法](type_grammar.html)を参照してください。
