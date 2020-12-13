# 初期化しない変数宣言

Crystal では、初期化せず変数を宣言することが可能です。

```crystal
x = uninitialized Int32
x # => some random value, garbage, unreliable
```

これは[安全でない](unsafe.md)コードで、特に低レベルなコードにおいて、未初期化の [StaticArray](http://crystal-lang.org/api/StaticArray.html) バッファをパフォーマンスの劣化なく定義するために使われます。

```crystal
buffer = uninitialized UInt8[256]
```

このとき、バッファはヒープではなくスタックに割り当てられます。

`uninitialized` キーワードに続く型は [型の文法](type_grammar.md)にしたがって書きます。

