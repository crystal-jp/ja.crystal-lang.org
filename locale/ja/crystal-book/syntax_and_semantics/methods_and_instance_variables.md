# Methods and instance variables

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

Right now, we can't do much with a person aside from create it with a name. Its age will always be zero. それでは、person が年をとることができるようにしてみましょう。

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

## Getters and setters

The Crystal [Standard Library](https://crystal-lang.org/api) provides macros which simplify the definition of getter and setter methods:

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

For more information on getter and setter macros, see the standard library documentation for [Object#getter](https://crystal-lang.org/api/latest/Object.html#getter%28%2Anames%2C%26block%29-macro), [Object#setter](https://crystal-lang.org/api/latest/Object.html#setter%28%2Anames%29-macro), and [Object#property](https://crystal-lang.org/api/latest/Object.html#property%28%2Anames%2C%26block%29-macro).

As a side note, we can define `become_older` inside the original `Person` definition, or in a separate definition: Crystal combines all definitions into a single class. つまり、以下の場合でも問題なく動作します。

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

## Redefining methods, and previous_def

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

You can invoke the previously redefined method with `previous_def`:

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

Without arguments or parentheses, `previous_def` receives the same arguments as the method's arguments. 上記に当てはまらない場合には、指定した引数が渡されます。

## Catch-all initialization

Instance variables can also be initialized outside `initialize` methods:

```crystal
class Person
  @age = 0

  def initialize(@name : String)
  end
end
```

This will initialize `@age` to zero in every constructor. This is useful to avoid duplication, but also to avoid the `Nil` type when reopening a class and adding instance variables to it.

