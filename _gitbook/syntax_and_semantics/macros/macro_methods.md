# マクロメソッド

マクロで def を使うと、クラス階層内でメソッドを定義することが可能で、そのメソッドは型推論フェーズの終わりに評価されます。そのとき、マクロはそれぞれの派生型の型情報を知っている状態で評価されます。例をあげます。

```ruby
class Object
  macro def instance_vars_names : Array(String)
    {{ @type.instance_vars.map &.name.stringify }}
  end
end

class Person
  def initialize(@name, @age)
  end
end

person = Person.new "John", 30
person.instance_vars_names #=> ["name", "age"]
```

マクロの def では、返り値の型を指定する必要があることに注意してください。

