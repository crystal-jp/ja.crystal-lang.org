# 構造体 (Struct)

ある型を定義するとき、`class` ではなく `struct` を使うことで構造体を定義することができます。

```crystal
struct Point
  property x
  property y

  def initialize(@x, @y)
  end
end
```

構造体とクラスには以下の違いがあります。
* 構造体に対して `new` を実行するとヒープではなくスタック領域が割り当てられる
* クラスが参照渡しであるのに対して、構造体は[値渡し](http://crystal-lang.org/api/Value.html)である
* 構造体は暗黙的に [Struct](http://crystal-lang.org/api/Struct.html) を継承し、Struct は [Value](http://crystal-lang.org/api/Value.html) を継承している。一方クラスは [Reference](http://crystal-lang.org/api/Reference.html) を継承する

構造体は他の構造体を継承することができ、モジュールをインクルードすることも可能です。また、クラスと同様に、構造体をジェネリック型にすることもできます。

構造体を使うのは主にパフォーマンス上の理由からです。小さいコピーを渡す方がより効率的である場合には、構造体を使うことで、わずかなメモリの割り当てが大量に発生することを避けられます。

ただ、具体的にクラスと構造体をどのように使い分ければよいのでしょうか？これまでの経験から言うと、もしインスタンス変数への再代入が全く発生しない場合 (例えばその型がイミュータブルな場合など) には構造体を使い、それ以外の場合はクラスを使うのが良いでしょう。
