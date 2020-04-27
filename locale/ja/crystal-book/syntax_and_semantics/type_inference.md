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

## 型制約を指定する

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

## 型制約を指定しない

明示的に型制約をしなかった場合、コンパイラは構文上の規則からインスタンス変数・クラス変数の型を推論することを試みます。

あるインスタンス変数・クラス変数について、その規則が適用されて型が予想できたとき、その型は一旦記憶されます。そして、これ以上適用する規則がなくなったとき、記憶された型の[ユニオン型](union_types.html)として推論されます。さらに、コンパイラが型を推論した変数が初期化されていないとき、[Nil](literals/nil.html) も型に加えられます。

規則はいくつかありますが、ほとんどの場合最初のものを利用することになるでしょう。他のものは記憶しなくてもよいです。コンパイラがインスタンス変数の型を推論できずエラーが起こったときは、明示的に型制限を追加することもできます。

これらの規則はインスタンス変数とクラス変数に関するものです。They are:

### 1. Assigning a literal value

When a literal is assigned to an instance variable, the literal's type is added to the set. All [literals](literals.html) have an associated type.

In the following example, `@name` is inferred to be `String` and `@age` to be `Int32`.

```crystal
class Person
  def initialize
    @name = "John Doe"
    @age = 0
  end
end
```

This rule, and every following rule, will also be applied in methods other than `initialize`. 例をあげます。

```crystal
class SomeObject
  def lucky_number
    @lucky_number = 42
  end
end
```

In the above case, `@lucky_number` will be inferred to be `Int32 | Nil`: `Int32` because 42 was assigned to it, and `Nil` because it wasn't assigned in all of the class' initialize methods.

### 2. Assigning the result of invoking the class method `new`

When an expression like `Type.new(...)` is assigned to an instance variable, the type `Type` is added to the set.

In the following example, `@address` is inferred to be `Address`.

```crystal
class Person
  def initialize
    @address = Address.new("somewhere")
  end
end
```

This also is applied to generic types. Here `@values` is inferred to be `Array(Int32)`.

```crystal
class Something
  def initialize
    @values = Array(Int32).new
  end
end
```

**Note**: a `new` method might be redefined by a type. In that case the inferred type will be the one returned by `new`, if it can be inferred using some of the next rules.

### 3. Assigning a variable that is a method argument with a type restriction

In the following example `@name` is inferred to be `String` because the method argument `name` has a type restriction of type `String`, and that argument is assigned to `@name`.

```crystal
class Person
  def initialize(name : String)
    @name = name
  end
end
```

Note that the name of the method argument is not important; this works as well:

```crystal
class Person
  def initialize(obj : String)
    @name = obj
  end
end
```

Using the shorter syntax to assign an instance variable from a method argument has the same effect:

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

### 4. Assigning the result of a class method that has a return type restriction

In the following example, `@address` is inferred to be `Address`, because the class method `Address.unknown` has a return type restriction of `Address`.

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

In fact, the above code doesn't need the return type restriction in `self.unknown`. The reason is that the compiler will also look at a class method's body and if it can apply one of the previous rules (it's a `new` method, or it's a literal, etc.) it will infer the type from that expression. So, the above can be simply written like this:

```crystal
class Person
  def initialize
    @address = Address.unknown
  end
end

class Address
  # No need for a return type restriction here
  def self.unknown
    new("unknown")
  end

  def initialize(@name : String)
  end
end
```

This extra rule is very convenient because it's very common to have "constructor-like" class methods in addition to `new`.

### 5. Assigning a variable that is a method argument with a default value

In the following example, because the default value of `name` is a string literal, and it's later assigned to `@name`, `String` will be added to the set of inferred types.

```crystal
class Person
  def initialize(name = "John Doe")
    @name = name
  end
end
```

This of course also works with the short syntax:

```crystal
class Person
  def initialize(@name = "John Doe")
  end
end
```

The default value can also be a `Type.new(...)` method or a class method with a return type restriction.

### 6. Assigning the result of invoking a `lib` function

Because a [lib function](c_bindings/fun.html) must have explicit types, the compiler can use the return type when assigning it to an instance variable.

In the following example `@age` is inferred to be `Int32`.

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

### 7. Using an `out` lib expression

Because a [lib function](c_bindings/fun.html) must have explicit types, the compiler can use the `out` argument's type, which should be a pointer type, and use the dereferenced type as a guess.

In the following example `@age` is inferred to be `Int32`.

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

### Other rules

The compiler will try to be as smart as possible to require less explicit type restrictions. For example, if assigning an `if` expression, type will be inferred from the `then` and `else` branches:

```crystal
class Person
  def initialize
    @age = some_condition ?1 : 2
  end
end
```

Because the `if` above (well, technically a ternary operator, but it's similar to an `if`) has integer literals, `@age` is successfully inferred to be `Int32` without requiring a redundant type restriction.

Another case is `||` and `||=`:

```crystal
class SomeObject
  def lucky_number
    @lucky_number ||= 42
  end
end
```

In the above example `@lucky_number` will be inferred to be `Int32 | Nil`. This is very useful for lazily initialized variables.

Constants will also be followed, as it's pretty simple for the compiler (and a human) to do so.

```crystal
class SomeObject
  DEFAULT_LUCKY_NUMBER = 42

  def initialize(@lucky_number = DEFAULT_LUCKY_NUMBER)
  end
end
```

Here rule 5 (argument's default value) is used, and because the constant resolves to an integer literal, `@lucky_number` is inferred to be `Int32`.
