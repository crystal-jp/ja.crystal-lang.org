Crystal の標準ライブラリにはこれらの事前に定義されたアノテーションがあります。

## Link

C ライブラリのリンクをコンパイラに指示します。詳細は [lib](../c_bindings/lib.md) のセクションを参照してください。

## Extern

このアノテーションをつけた Crystal の構造体は lib 宣言の中でも使えるようになります。

```crystal
@[Extern]
struct MyStruct
end

lib MyLib
  fun my_func(s : MyStruct) # OK (gives an error without the Extern annotation)
end
```

構造体をCの共用体のようにするためにも使えます (これはかなり安全ではありません)。

```crystal
# Int32 のコードポイントと文字列の間で簡単に変換できる構造体
@[Extern(union: true)]
struct Int32OrChar
  property int = 0
  property char = '\0'
end

s = Int32OrChar.new
s.char = 'A'
s.int # => 65

s.int = 66
s.char # => 'B'
```

## ThreadLocal

`@[ThreadLocal]` アノテーションはクラス変数と C の外部変数に対して適用できます。これによって、それらの変数がスレッドローカルになります。

```crystal
class DontUseThis
  # スレッドごとに1つずつ
  @[ThreadLocal]
  @@values = [] of Int32
end
```

ThreadLocal は標準ライブラリでランタイムを実装するのに使われていますが、その外で使うことはないでしょう。

## Packed

[C の構造体](../c_bindings/struct.md)をパックし、自動でフィールド間のパディングが挿入されるのを防ぎます。C のライブラリがパックされた構造体を利用する場合に、これは必要になるでしょう。

## AlwaysInline

常にメソッドをインラインにするようにコンパイラに指示します。

```crystal
@[AlwaysInline]
def foo
  1
end
```

## NoInline

メソッドを呼び出しをインライン化にしないようにコンパイラに指示します。これはメソッドが yield する場合には効果がありません。なぜならその場合は常にインライン化されるためです。

```crystal
@[NoInline]
def foo
  1
end
```

## ReturnsTwice

メソッドもしくは [lib 中の fun](../c_bindings/fun.md) が2度リターンすることを指示します。そのような関数としては、C言語の `setjmp` があげられます。

## Raises

メソッドもしくは [lib 中の fun](../c_bindings/fun.md) が例外を発生させる可能性があることを指示します。詳細は [コールバック](../c_bindings/callbacks.md) のセクションを参照してください。

## CallConvention

[lib fun](../c_bindings/fun.md) の呼び出し規約を指定します。例をあげます。

```crystal
lib LibFoo
  @[CallConvention("X86_StdCall")]
  fun foo : Int32
end
```

有効な呼出規約は以下のとおりです。

* C (デフォルト)
* Fast
* Cold
* WebKit_JS
* AnyReg
* X86_StdCall
* X86_FastCall

詳しい説明は[こちら](http://llvm.org/docs/LangRef.html#calling-conventions)を参照してください。

## Flags

[列挙型](../enum.md)を「フラグ列挙型」とします。これによって、`to_s` などいくつかのメソッドの挙動が変更されます。
