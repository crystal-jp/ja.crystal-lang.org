# 型制約

型制約はメソッドの引数に適用されて、受け取ることができる型を制約するものです。

```crystal
def add(x : Number, y : Number)
  x + y
end

# Ok
add 1, 2

# Error: no overload matches 'add' with types Bool, Bool
add true, false
```

ただし、`add` に型制約をしていなかった場合でも、このコードはコンパイルエラーになります。

```crystal
def add(x, y)
  x + y
end

add true, false
```

このとき以下のコンパイルエラーが発生します。

```
Error in foo.cr:6: instantiating 'add(Bool, Bool)'

add true, false
^~~

in foo.cr:2: undefined method '+' for Bool

  x + y
    ^
```

この理由は、`add` を呼び出すとき、そのメソッドは引数の型にしたがって実体化されるためです。異なる型を与えたメソッドは、それぞれ別のものとして実体化されます。

前者のエラーメッセージの方がより明快であるという少しの違いはあるものの、コンパイル時にエラーが発生するという点では、これらはどちらも安全な定義のしかたであると言えます。したがって、通常は型制約を使わず、メソッドをオーバーロードするときにのみ使用するくらいが好ましいでしょう。その方がより汎用的で、再利用しやすいコードになります。例えば、`Number` ではないクラスが `+` メソッドを持っている場合を考えてみてください。もし `add` というメソッドが型制約を持たない場合、そのクラスを渡すことができますがが、`add` メソッドが型制約を持っている場合はそれができません。

```crystal
# + メソッドを持っているけれど Number ではないクラス
class Six
  def +(other)
    6 + other
  end
end

# 型制約を持たない add メソッド
def add(x, y)
  x + y
end

# OK
add Six.new, 10

# 型制約を持つ add メソッド
def restricted_add(x : Number, y : Number)
  x + y
end

# Error: no overload matches 'restricted_add' with types Six, Int32
restricted_add Six.new, 10
```

型制約に指定する型の記法については、[型の文法](type_grammar.md)を参照してください。

実際のメソッドの本体での引数の型が型制約によって制約されているわけではないことには注意してください。

```crystal
def handle_path(path : String)
  path = Path.new(path) # *path* はこれによって Path 型になった
  # *path* を使う
end
```

## self 型制約

`self` という特別な型制約があります。

```crystal
class Person
  def ==(other : self)
    other.name == name
  end

  def ==(other)
    false
  end
end

john = Person.new "John"
another_john = Person.new "John"
peter = Person.new "Peter"

john == another_john # => true
john == peter        # => false (名前が異なるため)
john == 1            # => false (1 は Person 型ではないため)
```

上記の例では `self` を指定するのは、そのまま `Person` と書くことと同じです。しかし、`self` と書くことは最終的にそのメソッドが呼び出される際の自身の型となるので、モジュールのメソッドなどの場合に便利です。

また、これは補足ですが、`Person` は `Reference` を継承しているため、実際には2つ目の `==` を定義する必要はありません。同様のメソッドが `Reference` で定義されています。

そして、クラスメソッドの中でも `self` はインスタンスの型を表すことに注意してください。

```crystal
class Person
  getter name : String

  def initialize(@name)
  end

  def self.compare(p1 : self, p2 : self)
    p1.name == p2.name
  end
end

john = Person.new "John"
peter = Person.new "Peter"

Person.compare(john, peter) # OK
```

制約の対象を Person クラスにする場合には、`self.class` を使用してください。次で型制約における `.class` サフィックスについては説明します。

## クラスによる制約

例えば `Int32` を型制約に指定したとき、メソッドは `Int32` のインスタンスのみしか受け入れません。

```crystal
def foo(x : Int32)
end

foo 1       # OK
foo "hello" # Error
```

もし、メソッドが(インスタンスではなく) Int32 クラスだけを受け入れるようにしたい場合、`.class` を使用します。

```crystal
def foo(x : Int32.class)
end

foo Int32  # OK
foo String # Error
```

これは、インスタンスではなく型によってメソッドをオーバーロードしたい場合に便利です。

```crystal
def foo(x : Int32.class)
  puts "Got Int32"
end

def foo(x : String.class)
  puts "Got String"
end

foo Int32  # "Got Int32" と表示
foo String # "Got String" と表示
```

## スプラット展開での型制約

スプラット展開でも型制約を利用することができます。

```crystal
def foo(*args : Int32)
end

def foo(*args : String)
end

foo 1, 2, 3       # OK, invokes first overload
foo "a", "b", "c" # OK, invokes second overload
foo 1, 2, "hello" # Error
foo()             # Error
```

このように型を指定した場合、タプルのすべての要素がその型である必要があります。また、空のタプルは上記の例ではマッチしません。もし空のタプルもサポートしたいのであれば、もう1つオーバーロードを追加してください。

```crystal
def foo
  # タプルが空の場合
end
```

どんな型の1つ以上の引数に対してもマッチするようにしたい場合、`Object` を型制約に指定することもできます。

```crystal
def foo(*args : Object)
end

foo()       # Error
foo(1)      # OK
foo(1, "x") # OK
```

## 自由変数

`forall`を使うことで、型制約で引数の型や型の一部分を受け取ることができます。

```crystal
def foo(x : T) forall T
  T
end

foo(1)       # => Int32
foo("hello") # => String
```

ここで、`T` は実体化の際に実際に利用された型となっています。

自由変数は、型制約の中のジェネリック型の、型パラメータを取り出すことにも使えます。

```crystal
def foo(x : Array(T)) forall T
  T
end

foo([1, 2])   # => Int32
foo([1, "a"]) # => (Int32 | String)
```

インスタンスの型ではなくクラスの型を受け取るメソッドの場合、自由変数に `.class` を付けたものを型制約に使ってください。

```crystal
def foo(x : T.class) forall T
  Array(T)
end

foo(Int32)  # => Array(Int32)
foo(String) # => Array(String)
```

複数の引数に対して、複数の自由変数を指定することができます。

```crystal
def push(element : T, array : Array(T)) forall T
  array << element
end

push(4, [1, 2, 3])      # OK
push("oops", [1, 2, 3]) # Error
```

