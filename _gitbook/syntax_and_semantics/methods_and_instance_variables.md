# メソッドとインスタンス変数

コンストラクタの引数にインスタンス変数を指定する短縮記法を使うと、インスタンス変数への代入をより簡潔に書くことができます。

```crystal
class Person
  def initialize(@name)
    @age = 0
  end
end
```

さて、これで person に対して、「名前を付けてインスタンスを生成する」ことと「名前と年齢を尋ねる」ことができるようになりました。しかし、年齢はずっと0歳のままで変更できませんし、まだまだ機能は不十分です。それでは、person が年をとることができるようにしてみましょう。

```crystal
class Person
  def become_older
    @age += 1
  end
end

john = Person.new "John"
peter = Person.new "Peter"

john.age #=> 0

john.become_older
john.age #=> 1

peter.age #=> 0
```

メソッド名の先頭は小文字である必要があります。また、メソッド名には使うのは小文字とアンダースコア、そして数値のみとすることが慣習的です。

少し補足をすると、上記のように `become_older` メソッドを元々の `Person` クラスの中で定義するだけではなく、元々のクラスと別で改めて定義することも可能です。Crystal はそれらのすべての定義を1つのクラスにまとめます。つまり、以下の場合でも問題なく動作します。

```crystal
class Person
  def initialize(@name)
    @age = 0
  end
end

class Person
  def become_older
    @age += 1
  end
end
```

## メソッドの再定義と previous_def

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
person.age #=> 2
```

そのとき、`previous_def` を使うと以前に定義されたメソッドを実行することが可能です。

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
person.age #=> 3
```

`previous_def` を引数なし、かつカッコもなしで実行したとき、そのメソッドが受け取った引数がそのまま渡されます。上記に当てはまらない場合には、指定した引数が渡されます。
