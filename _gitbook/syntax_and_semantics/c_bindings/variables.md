# 変数

C のライブラリで公開される変数は、`lib` の内部で、グローバル変数に似た記法を使って宣言できます。

```ruby
lib C
  $errno : Int32
end
```

そして、以下のように参照と設定ができます。

```ruby
C.errno #=> some value
C.errno = 0
C.errno #=> 0
```

変数は属性を付与することでスレッドローカルにすることが可能です。

```ruby
lib C
  @[ThreadLocal]
  $errno : Int32
end
```

外部の変数に使用可能な型の指定方法については[型文法](type_grammar.html)を参照してください。
