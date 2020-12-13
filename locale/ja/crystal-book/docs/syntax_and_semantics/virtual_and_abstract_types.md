# virtual 型と abstract 型

ある変数が、同一のクラス階層下の異なる型の組み合わせであるとき、その型は **virtual 型**となります。この仕組みは `Reference`、`Value`、`Int` そして `Float` を除くすべてのクラスに適用されます。例をあげましょう。

```crystal
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

  def initialize(@name : String, @pet : Animal)
  end
end

john = Person.new "John", Dog.new
peter = Person.new "Peter", Cat.new
```

上記のプログラムに対して `tool hierarchy` コマンドを実行すると、 `Person` は以下のように表示されます。

```
- class Object
  |
  +- class Reference
     |
     +- class Person
            @name : String
            @pet : Animal+
```

`@pet` が `Animal+` になっているのが分かるでしょう。この `+` は virtual 型であることを意味しています。これは「`Animal` を継承している任意のクラス (`Animal` 型自身を含む)」を表しています。

コンパイラは常に、同一のクラス階層下のユニオン型を virtual 型に解決します。

```crystal
if some_condition
  pet = Dog.new
else
  pet = Cat.new
end

# pet : Animal+
```

コンパイラは、`Reference`、`Value`、`Int`、`Float`のいずれのクラスの場合を除いて、共有するスーパークラスがある場合に常にこのようにします。もし同一階層下に見つからない型であれば、そのまま型の組み合わせとして残ります。

コンパイラがこの仕様となっている本当の理由は、同じ種類の型の組み合わせ (ユニオン型) をいくつも作らないことでプログラムのコンパイルを高速化し、生成されたコードのサイズを小さくするためです。しかし、それ以外にもこの仕様には意味があります。それは、同一階層下のクラスは同じように振る舞うべき、というものです。

それでは、John のペットに喋らせてみましょう。

```crystal
john.pet.talk # Error: undefined method 'talk' for Animal
```

これがエラーになったのは、`@pet` の型は `Animal+` で `Animal` 自身を含んでいるためです。そして、`talk` メソッドはそこにはありません。よってエラーとなりました。

`Animal` のインスタンス化には意味がないため、直接インスタンス化することは絶対にありえないでしょう。ただ、コンパイラにはその事情が分かりません。コンパイラにそのことを示すには、クラスに `abstract` を指定します。

```crystal
abstract class Animal
end
```

これでコードのコンパイルが可能になります。

```crystal
john.pet.talk # => "Woof!"
```

abstract クラスとすることで、そのクラスを直接インスタンス化するのを避けることもできます。

```crystal
Animal.new # Error: can't instantiate abstract class Animal
```

これをより明確に示すために、 `Animal` に abstract メソッドとして `talk` メソッドを `Animal` に追加することも可能です。

```crystal
abstract class Animal
  # Animal に talk を定義
  abstract def talk
end
```

メソッドを `abstract` と指定すると、仮に使われていなかったとしても、コンパイラはすべてのサブクラスでそのメソッドが実装されていることを検査します。

abstract メソッドはモジュールで使うこともできて、その場合はコンパイラは、インクルード先のクラスでそれらが実装されているか検査します。
