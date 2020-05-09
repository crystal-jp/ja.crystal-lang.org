# マクロメソッド

マクロ def を使うと、各サブタイプの実体に応じたクラス階層についてメソッドを定義することができます。

`def` は `@type` を参照するマクロ式が含まれているときに `macro def` として考慮されます。例をあげます。

```crystal
class Object
  def instance_vars_names
    {{ @type.instance_vars.map &.name.stringify }}
  end
end

class Person
  def initialize(@name : String, @age : Int32)
  end
end

person = Person.new "John", 30
person.instance_vars_names # => ["name", "age"]
```

マクロ定義では、引数はそれ自身の AST ノードとして渡され `{{some_macro_argument}}` のようにしてそれらにアクセスすることができました。しかしマクロ def ではそれは異なります。ここでは引数リストはマクロ def によって生成されたメソッドに渡るものになります。コンパイル時にそれらにアクセスすることはできません。

```crystal
class Object
  def has_instance_var?(name) : Bool
    # ここで、マクロ展開によって name にアクセスすることはできない
    # その代わりに、マクロの記法を使って配列を構築する必要がある
    # そして、それを含んでいるかのチェックをランタイムに行う必要がある
    {{ @type.instance_vars.map &.name.stringify }}.includes?name
  end
end

person = Person.new "John", 30
person.has_instance_var?("name")     # => true
person.has_instance_var?("birthday") # => false
```
