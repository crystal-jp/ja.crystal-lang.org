# リテラル

Crystal には、数多くの基本的な型に対応したリテラルが用意されています。

| リテラル | 値のサンプル |
|---                                             |---                                                      |
| [Nil](nil.md) | `nil` |
| [真偽値 (Bool)](bool.md) | `true`, `false` |
| [整数 (Integer)](integers.md) | `18`, `-12`, `19_i64`, `14_u32`,`64_u8` |
| [浮動小数点数 (Float)](floats.md) | `1.0`, `1.0_f32`, `1e10`, `-0.5` |
| [文字 (Char)](char.md) | `'a'`, `'\n'`, `'あ'` |
| [文字列 (String)](string.md) | `"foo\tbar"`, `%("あ")`, `%q(foo #{foo})` |
| [シンボル (Symbol)](symbol.md) | `:symbol`, `:"foo bar"` |
| [配列 (Array)](array.md) | `[1, 2, 3]`, `[1, 2, 3] of Int32`, `%w(one two three)` |
| [配列ライク](array.md#array-like-type-literal) | `Set{1, 2, 3}` |
| [ハッシュ (Hash)](hash.md) | `{"foo" => 2}`, `{} of String => Int32` |
| [Hashライク](hash.md#hash-like-type-literal) | `MyType{"foo" => "bar"}` |
| [範囲 (Range)](range.md) | `1..9`, `1...10`, `0..var` |
| [正規表現 (Regex)](regex.md) | `/(foo)?bar/`, `/foo #{foo}/imx`, `%r(foo/)` |
| [タプル (Tuple)](tuple.md) | `{1, "hello", 'x'}` |
| [名前付きタプル (NamedTuple)](named_tuple.md) | `{name: "Crystal", year: 2011}`, `{"this is a key": 1}` |
| [Proc](proc.md) | `->(x : Int32, y : Int32) { x + y }` |
| [コマンド (Command)](command.md) | `` `echo foo` ``, `%x(echo foo)` |
