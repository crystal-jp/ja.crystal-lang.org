# Unsafe code

本言語において、以下は安全でない (unsafe) とされます。

* Code involving raw pointers: the [Pointer](http://crystal-lang.org/api/Pointer.html) type and [pointerof](pointerof.html).
* The [allocate](new,_initialize_and_allocate.html) class method.
* Code involving C bindings
* [初期化しない変数宣言](declare_var.html)

「安全でない」というのは、メモリの破壊、セグメンテーション違反、そしてクラッシュの可能性があることを意味しています。例をあげます。

```crystal
a = 1
ptr = pointerof(a)
ptr[100_000] = 2 # undefined behaviour, probably a segmentation fault
```

ただ、通常のコードでポインタ操作や初期化しない変数を扱うことはないでしょう。また、C バインディングは、普通は、NULL ポインタやバウンドチェックを含むより安全なラッパーで包みます。

100% 安全な言語というのは存在しません。ローレベルな処理や、OS のインターフェース、そしてポインタの操作をどこかで必ず含みます。しかし、それらを抽象化し、より高いレベルでの操作を行い、さらに、(数学的な証明やテストを通して) 低いレベルの地盤が安全なことを確認すれば、自信を持ってコードベース全体が安全であると言えるでしょう。

