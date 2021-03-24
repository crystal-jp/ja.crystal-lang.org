# ジェネリクス

ジェネリクスによってある型を元にしたパラメーター化した型を作ることができます。Box 型を考えてみてください。

```crystal
class MyBox(T)
  def initialize(@value : T)
  end

  def value
    @value
  end
end

int_box = MyBox(Int32).new(1)
int_box.value # => 1 (Int32)

string_box = MyBox(String).new("hello")
string_box.value # => "hello" (String)

another_box = MyBox(String).new(1) # Error, Int32 doesn't match String
```

ジェネリクスは特にコレクション型を実装するに便利です。`Array`、`Hash`、`Set`や`Pointer`などはジェネリック型です。

型引数は複数設定することが可能です。

```crystal
class MyDictionary(K, V)
end
```

型引数の名前はどのような名前でも使えます。

```crystal
class MyDictionary(KeyType, ValueType)
end
```

## 型変数の推論

もし型引数が指定されなかった場合、ジェネリック型のコンストラクタに設定された型制約は自由変数として扱われ、それが型推論に利用されます。例をあげます。

```crystal
MyBox.new(1)       # : MyBox(Int32)
MyBox.new("hello") # : MyBox(String)
```

上記では、`MyBox` に型引数を与えていません。このとき、コンパイラは以下の流れで推論を行います。

* `MyBox.new(value)` は `initialize(@value : T)` を呼び出す
* `T` の型はまだ設定されていないので、この引数の型に設定する

このようにして、ジェネリック型の扱いが冗長になってしまうことを軽減しています。

## ジェネリックな構造体とモジュール

構造体とモジュールをジェネリックにすることも可能です。ジェネリックなモジュールは以下のようにインクルードします。

```crystal
module Moo(T)
  def t
    T
  end
end

class Foo(U)
  include Moo(U)

  def initialize(@value : U)
  end
end

foo = Foo.new(1)
foo.t # Int32
```

上記で `T` は `Int32` となります。これは `Foo.new(1)` によって `U` が `Int32` となり、そしてジェネリックなモジュールのインクルードを経由して `T` が `Int32` となるためです。

## ジェネリック型の継承

ジェネリックなクラスとモジュールを継承することも可能です。継承する際はに、具体的な型を指定するか、もしくは型変数を移譲することができます。

```crystal
class Parent(T)
end

class Int32Child < Parent(Int32)
end

class GenericChild(T) < Parent(T)
end
```
