# 継承

クラス階層の頂点である`Object`を覗き、すべてのクラスは他のクラス (スーパークラス) を継承しています。継承元を明示的に指定せず定義した場合、クラスであれば `Reference` が、構造体であれば `Struct` がスーパークラスになります。

クラスを継承したとき、すべてのインスタンス変数、およびインスタンスメソッドとクラスメソッドがスーパークラスから引き継がれます。その中にはコンストラクタ (`new` と `initialize`) も含まれます。

```crystal
class Person
  def initialize(@name : String)
  end

  def greet
    puts "Hi, I'm #{@name}"
  end
end

class Employee < Person
end

employee = Employee.new "John"
employee.greet # "Hi, I'm John"
```

クラスが`new` や `initialize` を定義した場合は、スーパークラスのコンストラクタは継承されません。

```crystal
class Person
  def initialize(@name : String)
  end
end

class Employee < Person
  def initialize(@name : String, @company_name : String)
  end
end

Employee.new "John", "Acme" # OK
Employee.new "Peter"        # Error: wrong number of arguments for 'Employee:Class#new' (1 for 2)
```

派生クラスではメソッドをオーバーライドすることが可能です。

```crystal
class Person
  def greet(msg)
    puts "Hi, #{msg}"
  end
end

class Employee < Person
  def greet(msg)
    puts "Hello, #{msg}"
  end
end

p = Person.new
p.greet "everyone" # "Hi, everyone"

e = Employee.new
e.greet "everyone" # "Hello, everyone"
```

オーバーライドの代わりに、型制約を利用して派生クラスに特化したメソッドを定義することもできます。

```crystal
class Person
  def greet(msg)
    puts "Hi, #{msg}"
  end
end

class Employee < Person
  def greet(msg : Int32)
    puts "Hi, this is a number: #{msg}"
  end
end

e = Employee.new
e.greet "everyone" # "Hi, everyone"

e.greet 1 # "Hi, this is a number: 1"
```

## super

`super` を使うと、スーパークラスのメソッドを実行することが可能です。

```crystal
class Person
  def greet(msg)
    puts "Hello, #{msg}"
  end
end

class Employee < Person
  def greet(msg)
    super # Same as: super(msg)
    super("another message")
  end
end
```

引数も括弧もない場合、`super` には呼び出し元のメソッドと同じ引数がそのまま渡されます。そうでない場合には、指定した引数が渡されます。

## 共変性と反変性

継承が少し厄介なのは、配列の場合です。配列の要素に継承されたものが使われた場合は、十分に注意すべきです。例えば、次のような例を考えてみましょう。

```crystal
class Foo
end

class Bar < Foo
end

foo_arr = [Bar.new] of Foo  # => [#<Bar:0x10215bfe0>] : Array(Foo)
bar_arr = [Bar.new]         # => [#<Bar:0x10215bfd0>] : Array(Bar)
bar_arr2 = [Foo.new] of Bar # コンパイルエラー
```

Foo の配列は Foo と Bar を持つことができますが、Bar の配列は Bar とそのサブクラスしか持つことができません。

これは自動キャストが作用しているときに、悩ましい結果を引き起こすことがあります。例えば、次は動作しません。

```crystal
class Foo
end

class Bar < Foo
end

class Test
  @arr : Array(Foo)

  def initialize
    @arr = [Bar.new]
  end
end
```

`@arr` を `Array(Foo)` として宣言したので、このインスタンス変数に対して `Bar` の配列を代入できるように感じます。しかし、そうはいきません。`initialize` での `[Bar.new]` という式の型は `Array(Bar)` です。そして `Array(Bar)` は `Array(Foo)` のインスタンス変数に代入することは*できません*。

どのようにするのが正しい方法でしょうか？*式の型を*正しい型にしましょう。つまり `Array(Foo)` のように (具体的な方法は以下で)。

```crystal
class Foo
end

class Bar < Foo
end

class Test
  @arr : Array(Foo)

  def initialize
    @arr = [Bar.new] of Foo
  end
end
```

この例は特定の型 (配列) と特定の操作 (代入) に対するもので、上記の方法は他の型の場合や代入意外の操作の場合にも同様に適用できるわけではありません。一般的な[共変性と反変性][1]は完全にはサポートされていません。

[1]: https://en.wikipedia.org/wiki/Covariance_and_contravariance_%28computer_science%29
