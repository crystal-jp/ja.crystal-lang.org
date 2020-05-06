# 型推論

Crystal の哲学は型制約をなるべく減らすことです。しかし、どうしても型制約が必要になる場合もあります。

このようなクラスの定義を考えてください。

```crystal
class Person
  def initialize(@name)
    @age = 0
  end
end
```

`@age`が整数型だということは一目で分かりますが、`@name`の型は分かりません。`Person` クラスでのすべての使われ方から型を推論することは不可能ではありません。ですが、そのようにするといくつかの問題が生じます。

* コード読む際に型が明確でない。型を知るためには`Person`中でどのように使われているかすべてを確認する必要があります。
* コンパイル速度の問題。メソッドの解析を一度に処理したり、インクリメンタルコンパイルをすることがほとんど不可能になります。

コードベースが育ってきたときにこれらの問題は顕著になります。プロジェクトの全容の把握は困難になり、コンパイル時間は耐え難いほど長くなるでしょう。

これらの理由から、Crystal ではインスタンス変数と[クラス](class_variables.html)変数の型ははっきり分かるように書くことを要求します。

Crystal に型を理解させる方法はいくつかあります。

## 型制約を指定する場合

もっとも単純で、そしておそらくもっとも面白くない方法が、明示的に型制約を指定することです。

```crystal
class Person
  @name : String
  @age : Int32

  def initialize(@name)
    @age = 0
  end
end
```

## 型制約を指定しない場合

明示的に型制約をしなかった場合、コンパイラは構文上の規則からインスタンス変数・クラス変数の型を推論しようとします。

あるインスタンス変数・クラス変数について、その規則が適用されて型が予想できたとき、その型は一旦記憶されます。そして、これ以上適用する規則がなくなったとき、記憶された型の[ユニオン型](union_types.html)として推論されます。さらに、コンパイラが型を推論した変数が初期化されていないとき、[Nil](literals/nil.html) も型に加えられます。

規則はいくつかありますが、ほとんどの場合最初のものを利用することになるでしょう。他のものは記憶しなくてもよいです。コンパイラがインスタンス変数の型を推論できずエラーが起こったときは、明示的に型制限を追加することもできます。

これらの規則はインスタンス変数に関するものとして記述されていますが、クラス変数に対しても同様に扱われます。紹介していきます。

### 1. リテラルの代入

リテラルがインスタンス変数に代入されているとき、リテラルの型が予想された型として記憶されます。すべての[リテラル](literals.html)はそれに対応する型を持っています。

次の例で、`@name` は `String` に、`@age` は `Int32` に推論されます。

```crystal
class Person
  def initialize
    @name = "John Doe"
    @age = 0
  end
end
```

この規則やその他すべての規則は、`initialize`以外のメソッドに対しても適用されます。例をあげます。

```crystal
class SomeObject
  def lucky_number
    @lucky_number = 42
  end
end
```

この場合、`@lucky_number` は `Int32 | Nil` に推論されます。`Int32` は 42 が代入されているためで、 `Nil` は初期化されていないために、そのようになります。

### 2. クラスメソッド `new` の呼び出し結果の代入

`Type.new(...)` のような式をインスタンス変数に代入しているとき、型 `Type` が予想された型として記憶されます。

次の例で、`@address` は `Address` に推論されます。

```crystal
class Person
  def initialize
    @address = Address.new("somewhere")
  end
end
```

この規則はジェネリック型にも適用されます。この例で、`@values` は `Array(Int32)` に推論されます。

```crystal
class Something
  def initialize
    @values = Array(Int32).new
  end
end
```

**注意**: `new` メソッドが再定義されている場合もあります。この場合、その他の規則で型が推論できれば、`new`で返る型に推論できるでしょう。

### 3. 型制約を持った引数の代入

次の例で `@name` は `String` に推論されます。これは `name` が `String` の型制約を持ち、`@name` に代入されているためです。

```crystal
class Person
  def initialize(name : String)
    @name = name
  end
end
```

メソッドの引数の名前は特に重要ではありません。次のようにしても動作します。

```crystal
class Person
  def initialize(obj : String)
    @name = obj
  end
end
```

より簡潔に、メソッドの引数にインスタンス変数を指定しても同じ結果を得られます。

```crystal
class Person
  def initialize(@name : String)
  end
end
```

Also note that the compiler doesn't check whether a method argument is reassigned a different value:

```crystal
class Person
  def initialize(name : String)
    name = 1
    @name = name
  end
end
```

In the above case, the compiler will still infer `@name` to be `String`, and later will give a compile time error, when fully typing that method, saying that `Int32` can't be assigned to a variable of type `String`. Use an explicit type restriction if `@name` isn't supposed to be a `String`.

### 4. 型制約のあるクラスメソッドの呼び出し結果の代入

次の例で、`@address` は `Address` に推論されます。これはクラスメソッド `Address.unknown` に戻り値の型制約として `Address` が指定されているためです。

```crystal
class Person
  def initialize
    @address = Address.unknown
  end
end

class Address
  def self.unknown : Address
    new("unknown")
  end

  def initialize(@name : String)
  end
end
```

実際のところ、上記のコードでは`self.unknown`の型制約は必要ありません。なぜなら、コンパイラはクラスメソッドの本体を見て、これまで説明してきた規則 (`new` メソッドの呼び出し、単純なリテラル、など) が適用できる場合に、式の型を推論するためです。よって、上記は次のように簡潔に書けます。

```crystal
class Person
  def initialize
    @address = Address.unknown
  end
end

class Address
  # ここの戻り値の型制約は必要ない
  def self.unknown
    new("unknown")
  end

  def initialize(@name : String)
  end
end
```

この追加の規則は、よくある`new`を呼ぶだけのコンストラクタ的なメソッドに対して動作するため非常に便利です。

### 5. デフォルト値のある引数の代入

次の例で、`name` のデフォルト値は文字列リテラルで、それが `@name` に代入されているため、結果 `String` に推論されます。

```crystal
class Person
  def initialize(name = "John Doe")
    @name = name
  end
end
```

これは短かい書き方をしても同様に動作します。

```crystal
class Person
  def initialize(@name = "John Doe")
  end
end
```

デフォルト値は `Type.new(...)` の形や戻り値の型制約のあるクラスメソッドでもよいです。

### 6. `lib` 関数の呼び出し結果の代入

[lib 関数](c_bindings/fun.html) は明示的な型を持つため、それがインスタンス変数に代入されたとき、コンパイラは戻り値の型を予想できます。

次の例で、`@age` は `Int32` に推論されます。

```crystal
class Person
  def initialize
    @age = LibPerson.compute_default_age
  end
end

lib LibPerson
  fun compute_default_age : Int32
end
```

### 7. lib 式の `out` の利用

[lib 関数](c_bindings/fun.html) は明示的な型を持つため、ポインタ型の引数が期待される場所で `out` 形式でインスタンス変数が渡されたとき、そのポインタ型をデリファレンスしたものとして予想します。

次の例で、`@age` は `Int32` に推論されます。

```crystal
class Person
  def initialize
    LibPerson.compute_default_age(out @age)
  end
end

lib LibPerson
  fun compute_default_age(age_ptr : Int32*)
end
```

### その他の規則

なるべく明示的な型制約を少なくできるよう、コンパイラは賢く動作しようとします。例えば、`if` 式の`then` 節と `else` 節で型推論された場合を考えます。

```crystal
class Person
  def initialize
    @age = some_condition ? 1 : 2
  end
end
```

上記の `if`  (正確には参考演算子ですが `if` と同様です) は整数リテラルを返すので、`@age` は正しく `Int32` と推論され、型制約は必要ありません。

他にも `||` や `||=` の場合にも上手く動作することがあります。

```crystal
class SomeObject
  def lucky_number
    @lucky_number ||= 42
  end
end
```

上の例で `@lucky_number` は `Int32 | Nil` と推論されます。これは初期化が遅延される場合に便利でしょう。

これはコンパイラにとって (そして人間からしても) 容易な場合、定数を使った場合も上手く動作します。

```crystal
class SomeObject
  DEFAULT_LUCKY_NUMBER = 42

  def initialize(@lucky_number = DEFAULT_LUCKY_NUMBER)
  end
end
```

ここでは規則5 (引数のデフォルト値) が利用されています。そして定数が整数リテラルに解決されるので、`@lucky_number` は `Int32` に推論されます。
