# virtual 型と abstract 型

ある変数が、同一のクラス階層下の異なる型の組み合わせであるとき、その型は「virtual 型」となります。この仕組みは `Reference` を除くすべてのクラスに適用されます。例をあげましょう。

```ruby
class Animal
end

class Dog < Animal
  def talk
    "Woof!"
  end
end

class Cat < Animal
  def talk
    "Miau"
  end
end

class Person
  getter pet

  def initialize(@name, @pet)
  end
end

john = Person.new "John", Dog.new
peter = Person.new "Peter", Cat.new
```

上記のプログラムに対して `hierarchy` を実行すると、`Person` は以下のように表示されます。

```
- class Object
  |
  +- class Reference
     |
     +- class Person
            @name : String
            @pet : Animal+
```

`@pet` が `Animal+` になっているのがわかるでしょう。この `+` は  virtual 型であることを示しています。`@pet` には `Dog` と `Cat` が代入されていますが、このときコンパイラはその型を `Dog | Cat` ではなく `Animal+` と単純化します。これは、`Animal` を継承したすべてのクラス (`Animal` 自身も含む) を意味しています。

コンパイラは、すべての型の継承元である `Reference` を例外として、同一階層下のクラスであれば常にこのように解釈します。もし同一階層下に見つからない型であれば、そのまま型の組み合わせとして残ります。

コンパイラがこの仕様となっている本当の理由は、同じ種類の型の組み合わせをいくつも作らないことでプログラムのコンパイルを高速化し、生成されたコードのサイズを小さくするためです。しかし、それ以外にもこの仕様には意味があります。それは、同一階層下のクラスは同じように振る舞うべき、というものです。

virtual 型が適用されるのはクラスのみで、構造体には適用されないことに注意してください。

それでは、John のペットに喋らせてみましょう。

```ruby
john.pet.talk # Error: undefined method 'talk' for Animal
```

エラーになってしまいました。これは、コンパイラが `@pet` を `Animal+` と解釈しており、それは `Animal` 自身も含んでいることが原因です。`Animal` には `talk` メソッドが存在しないためにエラーとなっています。

`Animal` のインスタンス化には意味がないため、`Animal` を直接インスタンス化することは絶対にあり得ないでしょう。ただ、コンパイラにはその事情がわかりません。そこで、コンパイラにそのことを指示するための方法が用意されており、それはクラスを `abstract` と指定することです。

```ruby
abstract class Animal
end
```

これでコードのコンパイルが可能になります。

```ruby
john.pet.talk #=> "Woof!"
```

abstract クラスとすることで、そのクラスを直接インスタンス化するのを避けることもできます。

```ruby
Animal.new # Error: can't instantiate abstract class Animal
```

これをより明確に示すために `Animal` に abstract メソッドとして `talk` メソッドを定義することも可能です。

```ruby
abstract class Animal
  # Animal に talk を定義
  abstract def talk
end
```

モジュールにも abstract メソッドを定義することが可能です。
