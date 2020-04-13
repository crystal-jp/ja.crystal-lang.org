# Modules

モジュールは以下の2つの役割のためにあります。

* as namespaces for defining other types, methods and constants
* as partial types that can be mixed in other types

まず、名前空間としてモジュールを使用する例を見てみましょう。

```crystal
module Curses
  class Window
  end
end

Curses::Window.new
```

あなたがライブラリの作者であれば、上記のように型などの定義をモジュールの内部で行うことによって名前の衝突を避けるべきです。ただし、標準ライブラリには基本的に名前空間が設定されていません。これは、標準ライブラリの型やメソッドはごく一般的に利用されるものなので、そのたびに長い名前を書かずに済むようにするためです。

To use a module as a partial type you use `include` or `extend`.

An `include` makes a type include methods defined in that module as instance methods:

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

In the above example, it is as if we pasted the `size` method from the module into the `Items` class. この仕組みは、それぞれの型に対して、その親や先祖のリストを持たせることで機能しています。最初の状態では、このリストはスーパークラスから始まります。As modules are included they are **prepended** to this list. そして、あるメソッドが自身の型に見つからないとき、そのリストをたどってメソッドを探します。When you invoke `super`, the first type in this ancestors list is used.

A `module` can include other modules, so when a method is not found in it it will be looked up in the included modules.

An `extend` makes a type include methods defined in that module as class methods:

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

Both `include` and `extend` make constants defined in the module available to the including/extending type.

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

A common pattern for modules is `extend self`:

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

# Module Type Checking

Modules can also be used for type checking.

If we define two modules with names `A` and `B`:

```crystal
module A; end

module B; end
```

These can be included into classes:

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

We can then type check against instances of these classes with not only their class, but the
included modules as well:

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

This allows you to define arrays and methods based on module type instead of class:
```crystal
one = One.new
two = Two.new
three = Three.new

new_array = Array(A).new
new_array << one   # Ok, One inherits module A
new_array << three # Ok, Three includes module A

new_array << two # Error, because Two does not inherit module A
```
