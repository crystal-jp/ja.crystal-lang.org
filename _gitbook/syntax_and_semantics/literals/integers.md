# 整数 (Integer)

符号付き整数 (Integer) 型には4種類のものがあります。それは、[Int8](http://crystal-lang.org/api/Int8.html)、[Int16](http://crystal-lang.org/api/Int16.html)、[Int32](http://crystal-lang.org/api/Int32.html) そして [Int64](http://crystal-lang.org/api/Int64.html)で、それぞれ 8/16/32/64 ビットの数値を表現することが可能です。

符号なし整数型にも、[UInt8](http://crystal-lang.org/api/UInt8.html)、[UInt16](http://crystal-lang.org/api/UInt16.html)、[UInt32](http://crystal-lang.org/api/UInt32.html) そして [UInt64](http://crystal-lang.org/api/UInt64.html) の4種類が存在します。

整数リテラルは、`+` (オプション) または `-` 符号に続く数値とアンダースコアによって記述し、オプションでサフィックスを与えます。
もしサフィックスがない場合は、リテラルの型は `Int32`/`Int64`/`UInt64`のいずれかのうち、数値に合致する最も小さいものになります。

```crystal
1      # Int32

1_i8   # Int8
1_i16  # Int16
1_i32  # Int32
1_i64  # Int64

1_u8   # UInt8
1_u16  # UInt16
1_u32  # UInt32
1_u64  # UInt64

+10    # Int32
-20    # Int32

2147483648          # Int64
9223372036854775808 # UInt64
```

サフィックスの前のアンダースコア (`_`) はオプションです。

アンダースコアは、数値を読みやすくするためにも利用できます。

```crystal
1_000_000 # 1000000 より読みやすい
```

先頭に `0b` をつけると2進数になります。

```crystal
0b1101 # == 13
```

先頭に `0o` をつけると8進数になります。

```crystal
0o123 # == 83
```

先頭に `0x` をつけると16進数になります

```crystal
0xFE012D # == 16646445
0xfe012d # == 16646445
```
