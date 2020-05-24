# 配列 (Array)

[Array](http://crystal-lang.org/api/Array.html) は順番に意味があり整数でインデックスされた、`T` 型の値を要素として持つジェネリックなコレクションです。

配列は通常、角括弧 (`[]`) とコンマ (`,`) によって区切られた個々の要素による配列リテラルで生成されます。

```crystal
[1, 2, 3]
```

## ジェネリック型引数

配列のジェネリック型引数`T`はリテラルの要素の型から推論されます。すべての要素が同じ型を持っていた場合、`T`はそれに等しくなります。そうでなければ、すべての要素の型のユニオン型となります。

```crystal
[1, 2, 3]         # => Array(Int32)
[1, "hello", 'x'] # => Array(Int32 | String | Char)
```

閉じ角括弧のあとに続けて`of`と型を置くことで、明示的に型を指定することもできます。これは推論された型を置き換えるので、生成時には同じ型しか入っていないけれど、あとで別の型が入ってくるような場合に対応できます。

```crystal
array_of_numbers = [1, 2, 3] of Float64 | Int32 # => Array(Float64 | Int32)
array_of_numbers << 0.5                         # => [1, 2, 3, 0.5]

array_of_int_or_string = [1, 2, 3] of Int32 | String # => Array(Int32 | String)
array_of_int_or_string << "foo"                      # => [1, 2, 3, "foo"]
```

空の配列リテラルは常に型を指定する必要があります。

```crystal
[] of Int32 # => Array(Int32).new
```

## パーセント配列リテラル

[文字列の配列](./string.html#percent-string-array-literal)と[シンボルの配列](./symbol.html#percent-symbol-array-literal)をパーセント配列リテラルで生成できます。

```crystal
%w(one two three) # => ["one", "two", "three"]
%i(one two three) # => [:one, :two, :three]
```

## 配列ライクな型のリテラル

Crystal はさらに、配列ライクな型のためのリテラルをサポートしています。型の名前にひげ括弧 (`{}`) とコンマ (`,`) によって区切られた個々の要素を続けることで利用できます。

```crystal
Array{1, 2, 3}
```

引数を持たないコンストラクタと`<<`メソッドを持つ任意の型に対して、この構文は利用できます。

```crystal
IO::Memory{1, 2, 3}
Set{1, 2, 3}
```

ジェネリック型ではない型`IO::Memory`に対しては、上の例は以下と等しいものになります。

```crystal
array_like = IO::Memory.new
array_like << 1
array_like << 2
array_like << 3
```

ジェネリック型である`Set`に対しては、ジェネリック型 `T` が配列リテラルと同様の方法で要素の型から推論されます。よって、上の例は以下と等しいものになります。

```crystal
array_like = Set(typeof(1, 2, 3)).new
array_like << 1
array_like << 2
array_like << 3
```

型引数は型名の部分で明示的に指定することもできます。

```crystal
Set(Int32){1, 2, 3}
```
