# 整数 (Integer)

5つの符号付き整数と5つの符号なし整数があります。

| 型 | 大きさ | 最小値 | 最大値 |
| ---------- | -----------: | -----------: |-----------: |
| [Int8](http://crystal-lang.org/api/Int8.html) | 8 | -128 | 127 |
| [Int16](http://crystal-lang.org/api/Int16.html) | 16 | −32,768 | 32,767 |
| [Int32](http://crystal-lang.org/api/Int32.html) | 32 | −2,147,483,648 | 2,147,483,647 |
| [Int64](http://crystal-lang.org/api/Int64.html) | 64 | −2<sup>63</sup> | 2<sup>63</sup> - 1 |
| [Int128](https://crystal-lang.org/api/Int128.html) | 128 | −2<sup>127</sup> | 2<sup>127</sup> - 1 |
| [UInt8](http://crystal-lang.org/api/UInt8.html) | 8 | 0 | 255 |
| [UInt16](http://crystal-lang.org/api/UInt16.html) | 16 | 0 | 65,535 |
| [UInt32](http://crystal-lang.org/api/UInt32.html) | 32 | 0 | 4,294,967,295 |
| [UInt64](http://crystal-lang.org/api/UInt64.html) | 64 | 0 | 2<sup>64</sup> - 1 |
| [UInt128](https://crystal-lang.org/api/UInt128.html) | 128 | 0 | 2<sup>128</sup> - 1 |

整数リテラルは `+` (オプション) または `-` 符号に続く数値とアンダースコアからなり、さらに型を表わすサフィックスを続けることができます。
サフィックスがない場合、順にまず`Int32`の範囲に数がおさまれば型は`Int32`になり、`Int64`の範囲におさまれば`Int64`になり、 `UInt64`の範囲におさまれば`UInt64`になります。
なお、これらの範囲外の`128`ビット整数には、常にサフィックスを付ける必要があります。

```crystal
1 # Int32

1_i8   # Int8
1_i16  # Int16
1_i32  # Int32
1_i64  # Int64
1_i128 # Int128

1_u8   # UInt8
1_u16  # UInt16
1_u32  # UInt32
1_u64  # UInt64
1_u128 # UInt128

+10 # Int32
-20 # Int32

2147483648          # Int64
9223372036854775808 # UInt64
```

サフィックスの前のアンダースコア (`_`) はオプションです。

アンダースコアは、数値を読みやすくするためにも利用できます。

```crystal
1_000_000 # better than 1000000
```

先頭に`0b`をつけると2進数になります。

```crystal
0b1101 # == 13
```

先頭に`0o`をつけると8進数になります。

```crystal
0o123 # == 83
```

先頭に`0x`をつけると16進数になります。

```crystal
0xFE012D # == 16646445
0xfe012d # == 16646445
```
