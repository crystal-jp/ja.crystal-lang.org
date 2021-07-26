# 整数 (Integer)

4つ符号付き整数型と、4つの符号無し整数型が存在します。

| 型 | 大きさ | 最小値 | 最大値 |
| ---------- | -----------: | -----------: |-----------: |
| [Int8](https://crystal-lang.org/api/latest/Int8.html) | 8 | -128 | 127 |
| [Int16](https://crystal-lang.org/api/latest/Int16.html) | 16 | −32,768 | 32,767 |
| [Int32](https://crystal-lang.org/api/latest/Int32.html) | 32 | −2,147,483,648 | 2,147,483,647 |
| [Int64](https://crystal-lang.org/api/latest/Int64.html) | 64 | −2<sup>63</sup> | 2<sup>63</sup> - 1 |
| [UInt8](https://crystal-lang.org/api/latest/UInt8.html) | 8 | 0 | 255 |
| [UInt16](https://crystal-lang.org/api/latest/UInt16.html) | 16 | 0 | 65,535 |
| [UInt32](https://crystal-lang.org/api/latest/UInt32.html) | 32 | 0 | 4,294,967,295 |
| [UInt64](https://crystal-lang.org/api/latest/UInt64.html) | 64 | 0 | 2<sup>64</sup> - 1 |

整数リテラルは `+` (オプション) または `-` 符号に続く数値とアンダースコアからなり、さらに型を表わすサフィックスを続けることができます。
サフィックスがない場合はリテラルの型は`Int32`か`Int64`または`UInt64`の中で、その数値に適した最小のものになります。

```crystal
1 # Int32

1_i8  # Int8
1_i16 # Int16
1_i32 # Int32
1_i64 # Int64

1_u8  # UInt8
1_u16 # UInt16
1_u32 # UInt32
1_u64 # UInt64

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
