# new/initialize/allocate

クラスのインスタンスを作成するには、クラスに対して `new` メソッドを実行します。

```
person = Person.new
```

この例では、`person` は `Person` クラスのインスタンスです。

ただ、`person` インスタンスにはまだほとんど何の機能もありません。そこで、いくつかの機能を追加してみましょう。`Person` は名前 (name) と年齢 (age) を持つことにします。「すべてがオブジェクト」のセクションで、「オブジェクトは型を持ち、メソッドに応答する」ものであると書きました。つまり、オブジェクトと対話するためにはメソッドが必要だということです。それでは、名前と年齢のために `name` と `age` の2つのメソッドを設定しましょう。そして、これらの情報はインスタンス変数 (変数名の先頭は `@`) に保存します。また、Person が生まれる (インスタンスとして生成される) とき、名前は指定した名前で、年齢は0歳の状態になっているようにしたいと思います。この「生まれる (インスタンスとして生成される) 」ときの処理には、`initialize` という特別なメソッドを使います。このメソッドを「コンストラクタ」と呼ぶこともあります。 

```ruby
class Person
  def initialize(name)
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

```ruby
john = Person.new "John"
peter = Person.new "Peter"

john.name #=> "John"
john.age #=> 0

peter.name #=> "Peter"
```

ただ、ちょっと不思議に思わないでしょうか？`new` を使って `Person` のインスタンスを生成していますが、先ほど初期化処理を実装したのは `initialize` メソッドで、`new` メソッドではありません。これは一体どういうことでしょう？

実は、`initialize` メソッドを定義したとき、Crystal は同時に `new` メソッドも定義しているのです。

```ruby
class Person
  def self.new(name)
    instance = Person.allocate
    instance.initialize(name)
    instance
  end
 end
```

まず、`self.new` と書いていることに注目してください。これは、このメソッドが `Person` という**クラス**自体に属していることを意味します。クラスの特定のインスタンスに対してではありません。このことによって、`Person.new` としてメソッドを実行することができるのです。

次に `allocate` というメソッドについてです。これはローレベルなクラスメソッドで、与えられた型のオブジェクトを初期化されていない状態で作成します。そのとき、必要なメモリが割り当てられます。そのオブジェクトに対して `initialize` が実行され、初期化されたインスタンスを得ることができる、という流れになります。`allocate` は[安全でない (unsafe)](unsafe.html) であるため、一般的には自分で実行することはありません。`new` と `initialize` がこういった関係性になっているのはこのことが理由です。

