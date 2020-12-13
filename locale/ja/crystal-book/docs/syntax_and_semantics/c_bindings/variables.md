# 変数

C のライブラリで公開される変数は、`lib` の内部でグローバル変数に似た記法を使って宣言できます。

```crystal
lib C
  $errno : Int32
end
```

そして、以下のように参照と設定ができます。

```crystal
C.errno # => some value
C.errno = 0
C.errno # => 0
```

変数はアノテーションを付与することでスレッドローカルにすることが可能です。

```crystal
lib C
  @[ThreadLocal]
  $errno : Int32
end
```

外部変数の使用可能な型の指定方法については[型の文法](../type_grammar.md)を参照してください。
