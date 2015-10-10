# 浮動小数点数 (Float)

浮動小数点数 (Float) には2つの種類があります。それは、[Float32](http://crystal-lang.org/api/Float32.html) と [Float64](http://crystal-lang.org/api/Float64.html) で、それぞれ IEEE によって定義されている [binary32](http://en.wikipedia.org/wiki/Single_precision_floating-point_format) と [binary64](http://en.wikipedia.org/wiki/Double_precision_floating-point_format) に対応しています。

浮動小数点数リテラルは、`+` (オプション) または `-` 符号に続く数値とアンダースコア、そしてドット (`.`) と、またそれに続く数値とアンダースコアによって記述し、オプションで指数と型のサフィックスを与えます。もしサフィックスがない場合は、リテラルの型は `Float64` になります。

```crystal
1.0      # Float64
1.0_f32  # Float32
1_f32    # Float32

1e10     # Float64
1.5e10   # Float64
1.5e-7   # Float64

+1.3     # Float64
-0.5     # Float64
```

サフィックスの前のアンダースコア (`_`) はオプションです。

アンダースコアは、数値を読みやすくするためにも利用できます。

```crystal
1_000_000.111_111 # 1000000.111111 より読みやすい
```
