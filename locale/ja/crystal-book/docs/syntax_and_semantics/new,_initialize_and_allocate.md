# new/initialize/allocate

クラスのインスタンスを作成するには、クラスに対して `new` メソッドを実行します。

```crystal
person = Person.new
```

この例では `person` は `Person` クラスのインスタンスです。

しかし `person` に対してできることはほとんどありません。そこで、いくつかの機能を追加してみましょう。`Person` は名前 (name) と年齢 (age) を持つことにします。「すべてがオブジェクト」のセクションで「オブジェクトは型を持つメソッドに応答する」ものであると書きました。つまり、メソッドがオブジェクトと対話する唯一の方法だということです。よって、名前と年齢のために `name` と `age` の2つのメソッドが必要になります。そして、これらの情報は*アットマーク記号* (`@`) が先頭についたインスタンス変数に格納します。また Person のインスタンスが生成されるとき、名前は指定されたものに、年齢は0歳の状態になっているようにしたいと思います。インスタンスが生成されるときの処理は`initialize`メソッドに定義します (このメソッドは*コンストラクタ*と呼ぶこともあります)。

```crystal
class Person
  def initialize(name : String)
    @name = name
    @age = 0
  end

  def name
    @name
  end

  def age
    @age
  end
end
```

これで、以下のようにしてインスタンスを生成することができます。

```crystal
john = Person.new "John"
peter = Person.new "Peter"

john.name # => "John"
john.age  # => 0

peter.name # => "Peter"
```

(`name` には `String` と指定しているのに `age` に対してはそれが必要ないことを不思議に思う人もいるでしょう。これは [グローバル型推論アルゴリズムの項](type_inference.md)を参照してください。)

`new` メソッドによって `Person` のインスタンスを生成しましたが、初期化処理は `initialize` メソッドに定義したのであって、`new` メソッドにではないことが気になります。これは一体どういうことでしょう？

実は、`initialize` メソッドを定義したとき、Crystal は同時に`new` メソッドも定義しているのです。

```crystal
class Person
  def self.new(name : String)
    instance = Person.allocate
    instance.initialize(name)
    instance
  end
end
```

まず、`self.new` と書いていることに注目してください。これは[クラスメソッド](class_methods.md)といって、`Person`**クラス**自体に属すメソッドを表しています。特定のインスタンスに対してではありません。これによって `Person.new` とできるわけです。

次に、`allocate`は与えられたクラスの初期化されていないオブジェクトを生成する、低レベルなクラスメソッドです。必要なメモリを割り当てて、`initialize` メソッドを呼び出し、最後にそのインスタンスを返しています。`allocate`は[安全でない](unsafe.md)メソッドなので、一般的には直接呼び出すこと無いでしょう。`new` と `initialize` がこういった関係になっているのは、そのような理由です。
