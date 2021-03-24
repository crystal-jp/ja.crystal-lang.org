# fun

`lib` の中で `fun` を宣言すると、C 関数へのバインディングとなります。

```crystal
lib C
  # C では double cos(double x) となっている
  fun cos(value : Float64) : Float64
end
```

バインディングを設定したら、その関数は `C` 型でクラスメソッドのように利用できます。

```crystal
C.cos(1.5) # => 0.0707372
```

もし関数が引数を持たないものであれば、括弧を省略することができます (呼び出しの際にも同様です)。

```crystal
lib C
  fun getch : Int32
end

C.getch
```

もし戻り値の型が void であれば省略することが可能です。

```crystal
lib C
  fun srand(seed : UInt32)
end

C.srand(1_u32)
```

可変長引数を持つ関数をバインディングすることもできます。

```crystal
lib X
  fun variadic(value : Int32, ...) : Int32
end

X.variadic(1, 2, 3, 4)
```

C の関数を呼び出すときに (後に説明する `to_unsafe` を除いては) 暗黙的な変換は行われないことに注意してください。つまり、期待される型を正確に渡す必要があります。整数と浮動小数点数に関しては`to_...` メソッドが利用できます。

## 関数名

`lib` 中での関数名は大文字からはじめることができます。`lib` の外では関数名は小文字から始める必要があり、ここは異なっています。

これは、Crystal の関数名は C でのそれとは異なるためです。次は `SDL_Init` という名前の C の関数を Crystal では `LibSDL.init` としてバインディングする例です。

```crystal
lib LibSDL
  fun init = SDL_Init(flags : UInt32) : Int32
end
```

C での名前が有効な識別子ではない場合、ダブルクオートで囲って記述します。

```crystal
lib LLVMIntrinsics
  fun ceil_f32 = "llvm.ceil.f32"(value : Float32) : Float32
end
```

C の関数名は長い傾向があり、ライブラリ名で修飾されている場合もあるため、より短かく分かりやすい名前をつけるためにこれを使うこともできます。

## C バインディング中の型

C バインディング中で有効な型は、

* プリミティブ型 (`Int8`、……、`Int64`、`UInt8`、……、`UInt64`、`Float32`、`Float64`)
* ポインタ型 (`Pointer(Int32)`、これは `Int32*` のようにも書けます)
* 静的配列 (`StaticArray(Int32, 8)`、これは `Int32[8]` のようにも書けます)
* 関数型 (`Function(Int32, Int32)`、これは `Int32 -> Int32` のようにも書けます)
* その他の、これまでに宣言された `struct`、`union`、`enum`、`type` もしくは `alias`
* `Void`: 戻り値がないことを意味します
* `NoReturn`: `Void` と似ているが、呼び出し後に続くコードを実行しないことをコンパイラが理解します
* `@[Extern]` アノテーションの指定された Crystal の構造体

fun の型を書く際に利用できる構文は[型の文法](../type_grammar.md)を参照してください。

標準ライブラリには [LibC](https://github.com/crystal-lang/crystal/blob/master/src/lib_c.cr) ライブラリが定義されており、`int` や `short`、`size_t` といった一般的な C の型のエイリアスを提供しています。それらはバインディングで以下のように利用できます。

```crystal
lib MyLib
  fun my_fun(some_size : LibC::SizeT)
end
```

!!! note
    C の `char` 型は Crystal では `UInt8` です。なので、`char*` や `const char*` は `UInt8*` になります。Crystal の `Char` 型は Unicode のコードポイントであるため、4バイトで表現されます。つまり `UInt8` ではなく `Int32` に近いです。もし気になるのであれば、`LibC::Char` というエイリアスが定義されていることを確認してみてください。
