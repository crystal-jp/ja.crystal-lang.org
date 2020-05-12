# as?

`as?` という疑似メソッドは `as` に似ていますが、型がマッチしなかった際に例外を投げるのではなく `nil` を返すという点が異なります。しかしポインタ型を他の型へキャストすることはできません。

例:

```crystal
value = rand < 0.5 ?-3 : nil
result = value.as?(Int32) || 10

value.as?(Int32).try &.abs
```
