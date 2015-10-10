# クラス変数

クラス変数は、インスタンスにではなくクラス自身に結びついているもので、先頭に2つのアットマーク (`@@`) が付きます。例をあげます。

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

Counter.instances #=> 0
Counter.new
Counter.new
Counter.new
Counter.instances #=> 3
```

クラス変数は、クラスメソッドかインスタンスメソッドから読み書きすることができます。

もし値が代入される前にクラス変数を読み込むと、それは `Nil` 型を持つものとして解釈されます。

```crystal
class Counter
  def self.increment
    @@instances += 1
  end
end

Counter.increment # Error: undefined method '+' for Nil
```

クラス変数は常に単一の型に結びついており、継承されることはありません。

```crystal
class Parent
  @@counter = 0
end

class Child < Parent
  def self.counter
    @@counter
  end
end

Child.counter #=> nil
```

クラス変数をモジュールや構造体に設定することも可能です。その場合も、上記と同様に、インクルードによってクラス変数が引き継がれることはありません。
