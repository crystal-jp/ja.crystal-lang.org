# 継承

クラス階層のルートクラスである `Object` を除き、すべてのクラスは他のクラス (スーパークラス) を継承しています。継承元を明示的に指定せず定義した場合、クラスであれば `Reference` を、構造体であれば `Struct` がスーパークラスになります。

クラスを継承したとき、すべてのインスタンス変数、およびインスタンスメソッドとクラスメソッドがスーパースラスから引き継がれます。その中にはコンストラクタ (`new` と `initialize`) も含まれます。

```ruby
class Person
  def initialize(@name)
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

もしクラスに `new` や `initialize` が定義されると、スーパークラスのコンストラクタは継承されません。

```ruby
class Person
  def initialize(@name)
  end
end

class Employee < Person
  def initialize(@name, @company_name)
  end
end

Employee.new "John", "Acme" # OK
Employee.new "Peter" # 'Employee:Class#new' (1 for 2) を実行すると
                     # wrong number of arguments のエラーが発生
```

派生クラスではメソッドをオーバーライドすることが可能です。

```ruby
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

```ruby
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

`super` を使うと、スーパークラスのメソッドを実行することが可能です。引数とカッコなしで実行すると、メソッドの引数がそのまま親メソッドに渡されます。

```ruby
class Person
  def greet(msg)
    puts "Hello, "#{msg}"
  end
end

class Employee < Person
  def greet(msg)
    super # Same as: super(msg)
    super("another message")
  end
end
```

`super` を引数なし、かつカッコもなしで実行したとき、そのメソッドが受け取った引数がそのまま渡されます。上記に当てはまらない場合には、指定した引数が渡されます。
