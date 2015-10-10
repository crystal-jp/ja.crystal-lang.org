# マクロメソッド

マクロで def を使うと、クラス階層内でメソッドを定義することが可能で、そのメソッドは型推論フェーズの終わりに評価されます。そのとき、マクロはそれぞれの派生型の型情報を知っている状態で評価されます。例をあげます。

```crystal
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

マクロメソッド (macro def) では、返り値の型を指定する必要があることに注意してください。

マクロの定義では、引数は AST ノードとして渡され、マクロ展開 (`{{some_macro_argument}}`) を使ってそれらにアクセスすることが可能です。しかし、これはマクロメソッド (macro def) に対しては有効ではありません。「macro def」によって生成されたメソッドの引数のリストに対して、それらのコンパイル時の値にアクセスすることは不可能です。

```crystal
class Object
  macro def has_instance_var?(name) : Bool
    # ここで、マクロ展開によって name にアクセスすることはできない
    # その代わりに、マクロの記法を使って配列を構築する必要がある
    # そして、それを含んでいるかのチェックをランタイムに行う必要がある
    {{ @type.instance_vars.map &.name.stringify }}.includes? name
  end
end

person = Person.new "John", 30
person.has_instance_var?("name") #=> true
person.has_instance_var?("birthday") #=> false
```
