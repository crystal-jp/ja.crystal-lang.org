# 可視性

メソッドのデフォルトの可視性は public になっており、どこからでも実行することが可能です。したがって、`public` というキーワードは存在しません。

メソッドには `private` または `protected` を指定することができます。

`private` メソッドはレシーバの指定なしでのみ実行可能です。つまり、ドットを使わない形でしか実行できないということです。

```ruby
class Person
  private def say(message)
    puts message
  end

  def say_hello
    say "hello" # レシーバなしなので OK
    self.say "hello" # self というレシーバが指定されているのでエラー

    other = Person.new "Other"
    other.say "hello" # other というレシーバが指定されているのでエラー
  end
end
```

`private` メソッドがサブクラスからも実行可能であることに注意してください。

```ruby
class Employee < Person
  def say_bye
    say "bye" # OK
  end
end
```

`protected` メソッドは、その型と同一の型のインスタンスに対してのみ実行可能です。

```ruby
class Person
  protected def say(message)
    puts message
  end

  def say_hello
    say "hello" # 暗黙の self が Person なので OK
    self.say "hello" # self は Person なので OK

    other = Person.new "Other"
    other.say "hello" # other は Person なので OK
  end
end

class Animal
  def make_a_person_talk
    person = Person.new
    person.say "hello" # person は Person だが
                       # 現在の型が Animal なのでエラー
  end
end

one_more = Person.new "One more"
one_more.say "hello" # one_more が Person だが
                     # 現在の型が Program なのでエラー
```

`protected` のクラスメソッドはインスタンスメソッドから実行することが可能で、その反対の場合も同様です。

```ruby
class Person
  protected def self.say(message)
    puts message
  end

  def say_hello
    Person.say "hello" # OK
  end
end
```

## トップレベルの private メソッド

トップレベルに定義された `private` メソッドはそのファイルの中でのみ見えます。

```ruby
# one.cr ファイル
private def greet
  puts "Hello"
end

greet #=> "Hello"

# two.cr ファイル
require "./one"

greet # undefined local variable or method 'greet'
```

このことで、あるファイルの中でのみ利用できるヘルパーメソッドを定義することが可能です。
