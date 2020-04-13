# Class variables

クラス変数は、インスタンスにではなくクラス自身に結びついているもので、They are prefixed with two "at" signs (`@@`). 例をあげます。

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

Their type is inferred using the [global type inference algorithm](type_inference.html).

Class variables are inherited by subclasses with this meaning: their type is the same, but each class has a different runtime value. 例をあげます。

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

クラス変数をモジュールや構造体に設定することも可能です。Like above, they are inherited by including/subclassing types.
