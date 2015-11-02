# fun

`lib` の中で`fun` を宣言すると、C 関数へのバインディングとなります。

```crystal
lib C
  # C では double cos(double x) となっている
  fun cos(value : Float64) : Float64
end
```

バインディングを設定したら、その関数は `C` 型でクラスメソッドのように利用することが可能です。

```crystal
C.cos(1.5) #=> 0.0707372
```

もし関数が引数を持たないものであれば、カッコを省略することができます (呼び出しの際にも同様に省略可能です) 。

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

可変長引数を持つ関数にバインディングすることもできます。

```crystal
lib X
  fun variadic(value : Int32, ...) : Int32
end

X.variadic(1, 2, 3, 4)
```

C の関数を実行するときに (後に説明する `to_unsafe` を除いては) 暗黙的な変換が行われないことに注意してください。つまり、期待される型を正確に渡さなければなりません。整数と浮動小数点数に関しては、様々な `to_...` メソッドが利用できます。

Crystal ではユーザー名は小文字で始まる必要があるため、`fun` の名前も同様に小文字で始まらなくてはなりません。もし、大文字で始まる C の関数へバインドしたい場合、Crystal のために別の名前を与えることができます。

```crystal
lib LibSDL
  fun init = SDL_Init(flags : UInt32) : Int32
end
```

もし名前が識別子や型名として不正なものであるときは、文字列を名前として使うことも可能です。

```crystal
lib LLVMIntrinsics
  fun ceil_f32 = "llvm.ceil.f32"(value : Float32) : Float32
end
```

C の関数名は長い傾向があり、ライブラリ名で修飾されている場合が多いため、それらにより短くてわかりやすい名前をつけることにもこれを利用できます。

C バインディングで利用できる型は以下の通りです。
* プリミティブ型 (`Int8`, ..., `Int64`, `UInt8`, ..., `UInt64`, `Float32`, `Float64`)
* ポインタ型 (`Pointer(Int32)`, which can also be written as `Int32*`)
* 静的配列 (`StaticArray(Int32, 8)`, which can also be written as `Int32[8]`)
* 関数型 (`Function(Int32, Int32)`, which can also be written as `Int32 -> Int32`)
* その他、事前に宣言されている `struct`/`union`/`enum`/`type`/`alias`
* `Void`: 戻り値なし
* `NoReturn`: `Void` と似ているが、呼び出し後にコードを実行できないことをコンパイラが理解している

fun 型 で利用できる型の指定方法については [型文法](../type_grammar.html)を参照してください。

標準ライブラリには [LibC](https://github.com/manastech/crystal/blob/master/src/libc.cr) ライブラリが定義されており、`int`/`short`/`size_t` といった一般的な C の型のエイリアスを提供しています。それらはバインディングで以下のように利用できます。

```crystal
lib MyLib
  fun my_fun(some_size : LibC::SizeT)
end
```

**注意:** C の `char` 型は Crystal では `UInt8` です。したがって、`char*` や `const char*` は `UInt8*` となります。Crystal  の `Char` 型は Unicode のコードポイントであるため、4バイトで表現されます。つまり、`UInt8` ではなく `Int32` に近いです。もし気になるのであれば、`LibC::Char` というエイリアスが定義されていることを確認してみてください。
