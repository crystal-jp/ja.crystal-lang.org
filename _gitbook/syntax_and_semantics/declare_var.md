# 初期化しない変数の宣言

Crystal は初期化しない変数宣言を許します：

```ruby
x :: Int32
x #=> some random value, garbage, unreliable
```

これは [unsafe](unsafe.html) コードで、特にローレベルなコード記述で [StaticArray](http://crystal-lang.org/api/StaticArray.html) バッファーなど初期化しないでパフォーマンスを重視する時に使います：

```ruby
buffer :: UInt8[256]
```

バッファーはヒープエリアを避けスタックに配置されます。

二つのコロンの後に続くタイプは [type grammar](type_grammar.html) に従います。

