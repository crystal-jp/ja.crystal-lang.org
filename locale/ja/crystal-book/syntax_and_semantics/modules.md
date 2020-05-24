# モジュール

モジュールは以下の2つの役割のためにあります。

* 型やメソッド、定数を定義する名前空間としての役割
* 他の型へ mixin する部分的な型としての役割

まず、名前空間としてモジュールを使用する例を見てみましょう。

```crystal
module Curses
  class Window
  end
end

Curses::Window.new
```

あなたがライブラリの作者であれば、上記のように型などの定義をモジュールの内部で行うことによって名前の衝突を避けるべきです。ただし、標準ライブラリには基本的に名前空間が設定されていません。これは、標準ライブラリの型やメソッドはごく一般的に利用されるものなので、そのたびに長い名前を書かずに済むようにするためです。

モジュールを部分的な型として使いたい場合、`include` もしくは `extend` を使います。

`include` はモジュールで定義されたメソッドをインスタンスメソッドとして利用できるようにします。

```crystal
module ItemsSize
  def size
    items.size
  end
end

class Items
  include ItemsSize

  def items
    [1, 2, 3]
  end
end

items = Items.new
items.size # => 3
```

上記の例では、まるでモジュールの `size` メソッドを `Items` クラスに貼り付けたようになっていることが分かるでしょう。この仕組みは、それぞれの型に対して、その親や先祖のリストを持たせることで機能しています。最初の状態では、このリストはスーパークラスから始まります。モジュールがインクルードされたとき、モジュールはそのリストの**先頭に追加**されます。そして、あるメソッドが自身の型に見つからないとき、そのリストをたどってメソッドを探します。また、`super` を実行したときには、その祖先リストの先頭の型が対象となります。

`module` が別のモジュールをインクルードすることも可能です。そのとき、モジュールにメソッドが見つからなかった場合は、インクルードされたモジュールの中を探します。

`extend` はモジュールで定義されたメソッドをクラスメソッドとして利用できるようにします。

```crystal
module SomeSize
  def size
    3
  end
end

class Items
  extend SomeSize
end

Items.size # => 3
```

また、`include` と `extend` のどちらを使った場合も、モジュールで定義された定数を利用できるようになります。

トップレベルで `include`/`extend` することもできます。そうすると、何度も名前空間を書かなくても済むようになります (もちろん、その分だけ名前が衝突する可能性は高くなりますが) 。

```crystal
module SomeModule
  class SomeType
  end

  def some_method
    1
  end
end

include SomeModule

SomeType.new # OK, same as SomeModule::SomeType
some_method  # OK, 1
```

## extend self

モジュールでよく使われるパターンに `extend self` というものがあります。

```crystal
module Base64
  extend self

  def encode64(string)
    # ...
  end

  def decode64(string)
    # ...
  end
end
```

このとき、モジュールを名前空間として利用することができます。

```crystal
Base64.encode64 "hello" # => "aGVsbG8="
```

それだけではなく、プログラムにインクルードしたとき、名前空間の指定なしでメソッドを実行することも可能です。

```crystal
include Base64

encode64 "hello" # => "aGVsbG8="
```

ただ、名前が衝突する可能性も高くなってしまうため、モジュールに関連したメソッド名にしておくことがこのパターンを有効に活用するコツになるでしょう。

モジュールをインスタンス化することはできません。

```crystal
module Moo
end

Moo.new # undefined method 'new' for Moo:Module
```

# モジュールの型検査

モジュールは型を検査するのにも使えます。

2つのモジュールが `A` と `B` を考えてください。

```crystal
module A; end

module B; end
```

これらをクラスにインクルードします。

```crystal
class One
  include A
end

class Two
  include B
end

class Three < Two
  include A
end
```

このとき、クラスによって型検査をするだけではなく、モジュールで型検査をすることができます。

```crystal
one = One.new
typeof(one)  # => One
one.is_a?(A) # => true
one.is_a?(B) # => false

three = Three.new
typeof(three)  # => Three
three.is_a?(A) # => true
three.is_a?(B) # => true
```

これによって、クラスの代わりにモジュールに基づく配列を作ったりすることができます。
```crystal
one = One.new
two = Two.new
three = Three.new

new_array = Array(A).new
new_array << one   # One は A をインクルードしているのでOK
new_array << three # Three は A をインクルードしているのでOK

new_array << two # Two は A をインクルードしていないのでエラー
```
