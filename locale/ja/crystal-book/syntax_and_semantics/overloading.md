# Overloading

We can define a `become_older` method that accepts a number indicating the years to grow:

```crystal
class Person
  getter :age

  def initialize(@name : String, @age : Int = 0)
  end

  def become_older
    @age += 1
  end

  def become_older(years)
    @age += years
  end
end

john = Person.new "John"
john.age # => 0

john.become_older
john.age # => 1

john.become_older 5
john.age # => 6
```

上記からわかるように、同じ名前で引数の数が異なるメソッドを定義することが可能で、それぞれが別のメソッドとして扱われます。This is called *method overloading*.

メソッドがオーバーロードされるための条件は次の通りです。

* The number of arguments
* The type restrictions applied to arguments
* The names of required named arguments
* Whether the method accepts a [block](blocks_and_procs.html) or not

For example, we can define four different `become_older` methods:

```crystal
class Person
  @age = 0

  # 1歳年をとる
  def become_older
    @age += 1
  end

  # 受け取った数値だけ年をとる
  def become_older(years : Int32)
    @age += years
  end

  # 「String 型で」受け取った数値だけ年をとる
  def become_older(years : String)
    @age += years.to_i
  end

  # 現在の年齢を yield して
  # そのブロックの戻り値にしたがって年をとる
  def become_older
    @age += yield @age
  end
end

person = Person.new "John"

person.become_older
person.age # => 1

person.become_older 5
person.age # => 6

person.become_older "12"
person.age # => 18

person.become_older do |current_age|
  current_age < 20 ?10 : 30
end
person.age # => 28
```

Note that in the case of the method that yields, the compiler figured this out because there's a `yield` expression. To make this more explicit, you can add a dummy `&block` argument at the end:

```crystal
class Person
  @age = 0

  def become_older(&block)
    @age += yield @age
  end
end
```

In generated documentation the dummy `&block` method will always appear, regardless of you writing it or not.

もし同じ数の引数をとるメソッドが複数ある場合、コンパイラは最も制約の少ないものが最後にくる (優先されない) ようにソートを行います。

```crystal
class Person
  @age = 0

  # 最初にこのメソッドが定義されている
  def become_older(age)
    @age += age
  end

  # 「String」の指定は制約なしのものより制約的であるため、
  # オーバーロードの条件に合致していた場合は、
  # コンパイラはこのメソッドを最初のものより先に並べる (優先させる)
  def become_older(age : String)
    @age += age.to_i
  end
end

person = Person.new "John"

# Invokes the first definition
person.become_older 20

# Invokes the second definition
person.become_older "12"
```

しかしながら、必ずしも順序関係が全順序であるとは限らないため、コンパイラが常に正しく順序を設定できるわけではありません。したがって、いつも制約の少ないメソッドを最後に書くようにすることを推奨します。
