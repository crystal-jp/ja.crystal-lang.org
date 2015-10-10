# 属性 (Attribute)

いくつかの型やメソッドには、属性を付加することでアノテーションを与えることができます。付加することのできる属性は決まっていますが、将来的には (おそらく) ユーザーが独自の属性を定義できるようになる予定です。

## Link

C ライブラリのリンクをコンパイラに指示します。詳細は [lib](c_bindings/lib.html) セクションを参照してください。

## ThreadLocal

`@[ThreadLocal]` 属性はグローバル変数とクラス変数に対して適用することが可能です。これによって、それらの変数がスレッドローカルになります。

```crystal
# スレッドごとに1つずつ
@[ThreadLocal]
$values = [] of Int32
```

## Packed

[C の構造体](c_bindings/struct.html)をパックします。これによって、構造体のアラインメントが1バイトになり、要素間のパディングがなくなります。 パックしていない構造体では、対象のシステムに応じて、フィールドの型の間にパディングが挿入されます。

## AlwaysInline

常にメソッドをインラインにするようにコンパイラに指示します。

```crystal
@[AlwaysInline]
def foo
  1
end
```

## NoInline

メソッドを呼び出しをインラインにしないようにコンパイラに指示します。メソッドが yield する場合には効果がありません。

```crystal
@[NoInline]
def foo
  1
end
```

## ReturnsTwice

メソッド、および [lib fun](c_bindings/fun.html) が2回リターンすることを指示します。こういった関数の例としては C の `setjmp` があげられます。

## Raises

メソッド、および [lib fun](c_bindings/fun.html) が例外を発生させる可能性があることを指示します。詳細は[コールバック](c_bindings/callbacks.html)のセクションを参照してください。

## CallConvention

[lib fun](c_bindings/fun.html) の呼出規約を指定します。例をあげます。

```crystal
lib LibFoo
  @[CallConvention("X86_StdCall")]
  fun foo : Int32
end
```

有効な呼出規約は以下のとおりです。

* C (the default)
* Fast
* Cold
* WebKit_JS
* AnyReg
* X86_StdCall
* X86_FastCall

詳しい説明は[こちら](http://llvm.org/docs/LangRef.html#calling-conventions)の参照してください。

## Flags

[Enum](enum.html) を「Flags Enum」とします。これによって、`to_s` などのいくつかのメソッドの挙動が変更されます。
