# メソッドとインスタンス変数

コンストラクタの引数にインスタンス変数を指定する短縮記法を使うと、インスタンス変数への代入をより簡潔に書くことができます。

```crystal
class Person
  def initialize(@name : String)
    @age = 0
  end

  def age
    @age
  end
end
```

今のところ、名前をつけて Person のインスタンスを生成することくらいしかできません。age は常に0のままです。それでは、person が年齢を重ねることができるようにしてみましょう。

```crystal
class Person
  def initialize(@name : String)
    @age = 0
  end

  def age
    @age
  end

  def become_older
    @age += 1
  end
end

john = Person.new "John"
peter = Person.new "Peter"

john.age # => 0

john.become_older
john.age # => 1

peter.age # => 0
```

メソッド名の先頭は小文字である必要があります。また、メソッド名には使うのは小文字とアンダースコア、そして数値のみとすることが慣習的です。

## ゲッターとセッター

Crystal の[標準ライブラリ](https://crystal-lang.org/api) にはゲッターとセッターを完結に定義するためのマクロがいくつかあります。

```crystal
class Person
  property age
  getter name : String

  def initialize(@name)
    @age = 0
  end
end

john = Person.new "John"
john.age = 32
john.age # => 32
```

ゲッターとセッターのマクロの詳細は、標準ライブラリの[Object#getter](https://crystal-lang.org/api/latest/Object.html#getter%28%2Anames%2C%26block%29-macro), [Object#setter](https://crystal-lang.org/api/latest/Object.html#setter%28%2Anames%29-macro)と[Object#property](https://crystal-lang.org/api/latest/Object.html#property%28%2Anames%2C%26block%29-macro)の辺りを参照してください。

少し捕捉をすると、上記のように `become_older` メソッドを元々の `Person` クラスのなか で定義するだけではなく、元々のクラスと別で改めて定義することも可能です。Crystal はそれらのすべての定義を1つのクラスにまとめます。つまり、以下の場合でも問題なく動作します。

```crystal
class Person
  def initialize(@name : String)
    @age = 0
  end
end

class Person
  def become_older
    @age += 1
  end
end
```

## メソッドの再定義とprevious_def

もしあるメソッドが再度定義された場合、最後に定義されたものが優先されます。

```crystal
class Person
  def become_older
    @age += 1
  end
end

class Person
  def become_older
    @age += 2
  end
end

person = Person.new "John"
person.become_older
person.age # => 2
```

そのとき`previous_def`を使って以前に定義されたメソッドを呼び出すことが可能です。

```crystal
class Person
  def become_older
    @age += 1
  end
end

class Person
  def become_older
    previous_def
    @age += 2
  end
end

person = Person.new "John"
person.become_older
person.age # => 3
```

引数も括弧もない場合、`previous_def` は呼び出し元のメソッドと同じ引数を受け取ります。上記に当てはまらない場合には、指定した引数が渡されます。

## キャッチオール初期化

インスタンス変数は `initialize` メソッドの外部で初期化することもできます。

```crystal
class Person
  @age = 0

  def initialize(@name : String)
  end
end
```

このとき `@age` はどのコンストラクタでも0で初期化されます。これは重複を避けることができるだけでなく、クラスを再オープンしてインスタンス変数を追加する際に`Nil`型になることを防ぐことにも役立ちます。

