# 可視性

メソッドのデフォルトの可視性は public になっており、どこからでも実行することが可能です。そのため `public` キーワードは存在しません。

メソッドは`private`もしくは`protected`を指定することが_できます_。

## プライベートメソッド

`private` メソッドはレシーバのない形式でのみ呼び出すことができます。例外として、`self` をレシーバとすることはできます。

```crystal
class Person
  private def say(message)
    puts message
  end

  def say_hello
    say "hello"      # レシーバが無いため OK
    self.say "hello" # self がレシーバのため OK

    other = Person.new
    other.say "hello" # other がレシーバのためエラー
  end
end
```

`private` メソッドはサブクラスから呼び出すこともできることには注意してください。

```crystal
class Employee < Person
  def say_bye
    say "bye" # OK
  end
end
```

## プライベート型

プライベート型は自身の定義された名前空間の内側からのみ参照できて、完全なパスで参照することのできない型です。

```crystal
class Foo
  private class Bar
  end

  Bar      # OK
  Foo::Bar # Error
end

Foo::Bar # Error
```

この場合の `private` は `class`、`module`、`lib`、`enum`、そして`alias`と定数に対して指定することができます。

```crystal
class Foo
  private ONE = 1

  ONE # => 1
end

Foo::ONE # Error
```

## プロテクテッドメソッド

`protected` メソッドは次のレシーバに対してのみ呼び出せるメソッドです。

1. 現在の型と同じ型のインスタンス
2. 現在の型と同じ名前空間 (クラス、構造体、モジュールなど) の型のインスタンス

```crystal
# 1 の場合の例

class Person
  protected def say(message)
    puts message
  end

  def say_hello
    say "hello"      # 暗黙の self は Person なので OK
    self.say "hello" # self は Person なので OK

    other = Person.new "Other"
    other.say "hello" # other は Person なので OK
  end
end

class Animal
  def make_a_person_talk
    person = Person.new
    person.say "hello" # person は Person だけど、現在の型は Animal なのでエラー
  end
end

one_more = Person.new "One more"
one_more.say "hello" # one_more は Person だけど現在の型は Program なのでエラー

# 2 の場合の例

module Namespace
  class Foo
    protected def foo
      puts "Hello"
    end
  end

  class Bar
    def bar
      # Foo と Bar は Namespace 以下で定義されているので正しく動作します。
      Foo.new.foo
    end
  end
end

Namespace::Bar.new.bar
```

`protected` メソッドは現在のスコープや、そのさらに下のスコープからのみ呼び出すことができます。これはクラスのスコープやクラスメソッドの本体部分、プロテクテッドメソッドを定義した型のインスタンスメソッドを含み、その型を継承したクラスや同じ名前空間のすべて型に対しても同様です。

```crystal
class Parent
  protected def self.protected_method
  end

  Parent.protected_method # OK

  def instance_method
    Parent.protected_method # OK
  end

  def self.class_method
    Parent.protected_method # OK
  end
end

class Child < Parent
  Parent.protected_method # OK

  def instance_method
    Parent.protected_method # OK
  end

  def self.class_method
    Parent.protected_method # OK
  end
end

class Parent::Sub
  Parent.protected_method # OK

  def instance_method
    Parent.protected_method # OK
  end

  def self.class_method
    Parent.protected_method # OK
  end
end
```

## トップレベルのプライベートメソッド

`private` をトップレベルのメソッドにつけると、現在のファイルからのみ見えるものになります。

!!!example "one.cr"
```crystal
private def greet
puts "Hello"
end

    greet # => "Hello"
    ```

!!!example "two.cr"
```crystal
require "./one"

    greet # undefined local variable or method 'greet'
    ```

このことで、あるファイルの中でのみ利用できるヘルパーメソッドを定義することが可能です。

## トップレベルのプライベート型

`private` をトップレベルの型につけると、現在のファイルからのみ見えるものになります。

!!!example "one.cr"
```crystal
private class Greeter
def self.greet
"Hello"
end
end

    Greeter.greet # => "Hello"
    ```

!!!example "two.cr"
```crystal
require "./one"

    Greeter.greet # undefined constant 'Greeter'
    ```
