# クラス変数

クラス変数は、インスタンスにではなくクラス自身に結びついているもので、クラス変数は先頭に2つのアットマーク (`@@`) が付きます。例をあげます。

```crystal
class Counter
  @@instances = 0

  def initialize
    @@instances += 1
  end

  def self.instances
    @@instances
  end
end

Counter.instances # => 0
Counter.new
Counter.new
Counter.new
Counter.instances # => 3
```

クラス変数は、クラスメソッドかインスタンスメソッドから読み書きすることができます。

これらの型は[グローバル型推論アルゴリズム](type_inference.md)によって推論されます。

サブクラスでは、クラス変数も継承されます。このときクラス変数の型は同じですが、実行時の値は各サブクラスで別のものになります。例をあげます。

```crystal
class Parent
  @@numbers = [] of Int32

  def self.numbers
    @@numbers
  end
end

class Child < Parent
end

Parent.numbers # => []
Child.numbers  # => []

Parent.numbers << 1
Parent.numbers # => [1]
Child.numbers  # => []
```

クラス変数をモジュールや構造体に設定することも可能です。上記と同様に、インクールドや継承された型にクラス変数は継承されます。
