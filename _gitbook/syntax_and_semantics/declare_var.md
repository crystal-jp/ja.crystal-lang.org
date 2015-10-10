# 初期化しない変数宣言

Crystal では、初期化せず変数を宣言することが可能です。

```crystal
x :: Int32
x #=> 何かのランダムな値。つまり信頼できないゴミのようなもの…
```

これは「安全でない ([unsafe](unsafe.html))」なコードで、特にローレベルなコードにおいて、未初期化の [StaticArray](http://crystal-lang.org/api/StaticArray.html)  バッファをパフォーマンスの劣化なく定義するために使われます。

```crystal
buffer :: UInt8[256]
```

このとき、バッファはヒープではなくスタックに割り当てられます。

2つのコロン (`::`) に続く型は[型文法](type_grammar.html)にしたがって書きます。

