# モジュール

モジュールは以下の2つの役割のためにあります。

* 型やメソッド、そして定数を他と区別して定義するための名前空間として使う
* 部分的な型として別の型に mixin して使う

まず、名前空間としてモジュールを使用する例を見てみましょう。

```ruby
module Curses
  class Window
  end
end

Curses::Window.new
```

あなたがライブラリの作者であれば、上記のように型などの定義をモジュールの内部で行うことによって名前の衝突を避けるべきです。ただし、標準ライブラリには基本的に名前空間が設定されていません。これは、標準ライブラリの型やメソッドはごく一般的に利用されるものなので、そのたびに長い名前を書かずに済むようにするためです。

モジュールを部分的な型として利用する場合、`include` または `extend` を使います。

`include` を使用すると、モジュールに定義されたメソッドをインスタンスメソッドとして利用できるようになります。

```ruby
module ItemsLength
  def length
    items.length
  end
end

class Items
  include ItemsLength

  def items
    [1, 2, 3]
  end
end

items = Items.new
items.length #=> 3
```

上記の例では、まるでモジュールの `length` メソッドを `Items` クラスの中に貼り付けたようにメソッドが実行されていることがわかるでしょう。この仕組みは、それぞれの型に対して、その親や先祖のリストを持たせることで機能しています。最初の状態では、このリストはスーパークラスから始まります。モジュールがインクルードされると、そのモジュールはリストの「**先頭**」に追加されます。そして、あるメソッドが自身の型に見つからないとき、そのリストをたどってメソッドを探します。また、`super` を実行したときには、その先祖リストの先頭の型が対象となります。

`module` が別のモジュールをインクルードすることも可能です。したがって、モジュールにメソッドが見つからなかった場合は、インクルードされたモジュールの中を探します。

一方、`extend` を使用すると、モジュールに定義されたメソッドをクラスメソッドとして利用できるようになります。

```ruby
module SomeLength
  def length
    3
  end
end

class Items
  extend SomeLength
end

Items.length #=> 3
```

また、`include` と `extend` のどちらを使った場合も、モジュールに定義されている定数を利用できるようになります。

トップレベルで `include`/`extend` することもできます。そうすると、何度も名前空間を書かなくても済むようになります (もちろん、その分だけ名前が衝突する可能性は高くなりますが) 。

```ruby
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

```ruby
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

```ruby
Base64.encode64 "hello" #=> "aGVsbG8="
```

それだけではなく、プログラムにインクルードしたとき、名前空間の指定なしでメソッドを実行することも可能です。

```ruby
include Base64

encode64 "hello" #=> "aGVsbG8="
```

ただ、名前が衝突する可能性も高くなってしまうため、モジュールに関連したメソッド名にしておくことがこのパターンを有効に活用するコツになるでしょう。

モジュールをインスタンス化することはできません。

```ruby
module Moo
end

Moo.new # undefined method 'new' for Moo:Class
```
