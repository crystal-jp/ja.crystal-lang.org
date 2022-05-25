# 構造体 (Struct)

ある型を定義するとき、`class` ではなく `struct` を使うことができます。

```crystal
struct Point
  property x, y

  def initialize(@x : Int32, @y : Int32)
  end
end
```

構造体は [Value](https://crystal-lang.org/api/Value.html) を継承しているので、このインスタンスはスタックに確保され、値渡しされることになります。値渡しというのは、メソッドに引数として渡すときやメソッドから値が返るとき、変数に代入するときに、値のコピーが実際には渡される、ということです (一方 [Reference](https://crystal-lang.org/api/Reference.html) を継承しているクラスのインスタンスの場合は値はヒープに確保され、参照渡しされます)。

そのため、構造体は変更されない (immutable) データ型や、状態を持たない他の型のラッパーなどに使われます。小さいコピーを渡す方がより効率的であるとき、構造体を使うと、わずかなメモリ割り当てが大量に発生することを避けられるため、パフォーマンス上有利です (より詳細には[パフォーマンスガイド](https://crystal-lang.org/docs/guides/performance.html#use-structs-when-possible)を参照してください)。

変更される (mutable) 構造体も利用できますが、値を変更するようなコードを書いたときに、下で説明するようなことで予想外の挙動をすることに十分に注意する必要があります。

## 値渡し

構造体は_常に_値渡しされます。その構造体のメソッドから`self`を返した場合も例外ではありません。

```crystal
struct Counter
  def initialize(@count : Int32)
  end

  def plus
    @count += 1
    self
  end
end

counter = Counter.new(0)
counter.plus.plus # => Counter(@count=2)
puts counter      # => Counter(@count=1)
```

連続する `plus` の呼び出しの戻り値は予想通りの結果になっていますが、最初の呼び出しだけが `counter` を変更している、ということに注意してください。2番目の呼び出しは最初の呼び出しで返った構造体の_コピー_になっていて、このコピーは呼び出し後に破棄されます。

構造体の中に変更される (mutable) 型を使った場合の挙動についても注意の必要があります。

```crystal
class Klass
  property array = ["str"]
end

struct Strukt
  property array = ["str"]
end

def modify(object)
  object.array << "foo"
  object.array = ["new"]
  object.array << "bar"
end

klass = Klass.new
puts modify(klass) # => ["new", "bar"]
puts klass.array   # => ["new", "bar"]

strukt = Strukt.new
puts modify(strukt) # => ["new", "bar"]
puts strukt.array   # => ["str", "foo"]
```

ここで `strukt` に一体何が起こっているのかというと、

- `Array` は参照渡しされるので、`["str"]` の参照が `strukt` のフィールドに格納されます。
- `strukt` を `modify` の引数にしたとき、配列への参照を内部に持った `strukt` の_コピー_が実際には渡されます。
- 配列の参照の `array` が `object.array << "foo"` によって変更され (要素が追加され) ます。
- これは元の `strukt` が参照しているものと同じ配列です。
- `object.array = ["new"]` は `strukt` の_コピー_の持っている配列への参照を、新しく確保したものに置き換えます。
- `object.array << "bar"` は、その新しく作成した配列に要素を追加します。
- `modify` はその新しい配列の参照を返して、そしてその内容が表示されます。
- この新しい配列の参照は `strukt` の_コピー_が所持されていて、元のものは持っていません。そのため `strukt` は最初の変更の影響のみを受けていて、残りの処理の影響を受けていません。

`Klass` はクラスのため `modify` に参照渡しされ、`object.array = ["new"]` の行で、元の `klass` オブジェクトに新しい配列が保存されます。この点で、コピーしたものに格納していた、`strukt` とは異なります。

## 継承

* 構造体は暗黙に [Struct](https://crystal-lang.org/api/Struct.html) を継承しており、これは [Value](https://crystal-lang.org/api/Value.html) を継承してます。一方、クラスは [Reference](https://crystal-lang.org/api/Reference.html) を継承しています。
* 構造体は abstract でない構造体を継承することはできません。

2番目のものには、構造体はメモリレイアウトが厳密に定まっていないといけない、という事情があります。例えば、次の `Point` という構造体は8バイトの大きさがあるとします。そして、配列のバッファに各点の情報が埋め込まれると考えてください。

```crystal
# 各 Point 毎に配列のバッファが8バイト確保される
ary = [] of Point
```

もし `Point` が継承されるとすると、そのような型の配列にその継承した型が追加される可能性があるので、各要素毎に確保する大きさをそれだけ大きくしなければいけません。これは予想していない挙動です。そのため abstract でない構造体を継承することができないのです。一方、abstract な構造体は明らかに子孫を持つものなので、この型の配列が複数の型の値が追加されるために大きめにメモリを確保することも予想できる挙動です。

また、クラスと同様に、構造体にモジュールをインクルードしたりジェネリック型にすることもできます。
