# 変数

C のライブラリで公開される変数は、`lib` の内部で、グローバル変数に似た記法を使って宣言できます。

```crystal
lib C
  $errno : Int32
end
```

そして、以下のように参照と設定ができます。

```crystal
C.errno #=> 何かの値
C.errno = 0
C.errno #=> 0
```

変数は属性を付与することでスレッドローカルにすることが可能です。

```crystal
lib C
  @[ThreadLocal]
  $errno : Int32
end
```

外部の変数に使用可能な型の指定方法については[型文法](type_grammar.html)を参照してください。
