## デフォルト引数

メソッドの仮引数にはデフォルト値が設定できます。

```crystal
class Person
  def become_older(by = 1)
    @age += by
  end
end

john = Person.new "John"
john.age # => 0

john.become_older
john.age # => 1

john.become_older 2
john.age # => 3
```

## 名前付き引数

引数は順番に指定していく他に、引数の名前によって指定することもできます。例をあげます。

```crystal
john.become_older by: 5
```

いくつもの引数を持つ場合、すべての引数を正しく渡していれば、どのような順序で指定したかは重要ではありません。

```crystal
def some_method(x, y = 1, z = 2, w = 3)
  # いろいろする
end

some_method 10                   # x: 10, y: 1, z: 2, w: 3
some_method 10, z: 10            # x: 10, y: 1, z: 10, w: 3
some_method 10, w: 1, y: 2, z: 3 # x: 10, y: 2, z: 3, w: 1
some_method y: 10, x: 20         # x: 20, y: 10, z: 2, w: 3

some_method y: 10 # Error, missing argument: x
```

メソッドにスプラット展開指定 (これについてはの次の章で説明します) が指定されている場合、名前付き引数は使えません。これはスプラット展開がどのような引数にマッチしたかどうかを把握するのが困難なためです。引数を順番に渡した場合は簡単なので、動作します。
