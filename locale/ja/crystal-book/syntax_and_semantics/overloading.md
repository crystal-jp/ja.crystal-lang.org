# オーバーロード

これから、何歳歳をとるかを数値で指定できる `become_older` メソッドを定義します。

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

上記からわかるように、同じ名前で引数の数が異なるメソッドを定義することが可能で、それぞれが別のメソッドとして扱われます。これを*メソッドのオーバーロード*と呼びます。

メソッドがオーバーロードされるための条件は次の通りです。

* 引数の数
* 引数に指定されている型制約
* 必要な名前つき引数の名前が異なる
* [ブロック](blocks_and_procs.html)を受け取れるかどうか

例えば、`become_older` であれば、以下の4つの異なるメソッドを定義することができます。

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
  current_age < 20 ? 10 : 30
end
person.age # => 28
```

コンパイラは `yield` が含まれていることを検知して、そのメソッドがブロックをとるメソッドであることを判断しています。より明示的にそのことを示したい場合は、`&block` という引数をダミーとして引数の最後に指定してください。

```crystal
class Person
  @age = 0

  def become_older(&block)
    @age += yield @age
  end
end
```

ドキュメントでは、このように書いたかに関わらずに、必ず `&block` を引数に伴なって表示されます。

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

# 最初の定義が呼び出される
person.become_older 20

# 2番目の定義が呼び出される
person.become_older "12"
```

しかしながら、必ずしも順序関係が全順序であるとは限らないため、コンパイラが常に正しく順序を設定できるわけではありません。したがって、いつも制約の少ないメソッドを最後に書くようにすることを推奨します。
