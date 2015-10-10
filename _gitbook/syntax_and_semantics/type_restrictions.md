# 型制約

メソッドの引数に型アノテーションを指定することで、メソッドが受け取ることができる型を制約することが可能です。

```crystal
def add(x : Number, y : Number)
  x + y
end

# これは OK
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

この理由は、`add` を実行するとき、そのメソッドは引数の型にしたがって初期化される、ということによります。つまり、異なる型を与えてメソッドを実行すると、メソッドを初期化した結果もそれぞれ異なるものとなるからです。

前者のエラーメッセージの方がより明快であるという少しの違いはあるものの、コンパイル時にエラーが発生するという点では、これらはどちらも安全な定義のしかたであると言えます。したがって、通常は型制約を使わず、メソッドをオーバーロードするときにのみ使用するくらいが好ましいでしょう。その方がより汎用的で、再利用しやすいコードになります。例えば、`Number` ではないクラスが `+` メソッドを持っている場合を考えてみてください。もし `add` というメソッドが型制約を持たない場合、それらのクラスを利用することができますが、型制約がある場合には利用することができません。

```crystal
# + メソッドを持っているが Number ではないクラス
class Six
  def +(other)
    6 + other
  end
end

# 型制約のない add メソッド
def add(x, y)
  x + y
end

# OK
add Six.new, 10

# 型制約のある add メソッド
def restricted_add(x : Number, y : Number)
  x + y
end

# Error: no overload matches 'restricted_add' with types Six, Int32
restricted_add Six.new, 10
```

型制約を設定する際の記載方法については[型文法](type_grammar.html)を参照してください。

## self 制約

型制約には `self` を使った特別な指定方法があります。

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

john == another_john #=> true
john == peter #=> false (name が異なるため)
john == 1 #=> false (1 は Person ではないため)
```

上記の例では、`self` を指定するのは、そのまま `Person` と書くことと同じです。しかし、`self` と書くことで自身の型を指定できることは、メソッドを定義したモジュールがインクルードされて、そのメソッドを持つのが最終的にインクルードした側の型になる場合により便利です。

また、これは補足ですが、`Person` は `Reference` を継承しているため、実際には2つ目の `==` を定義する必要はありません。 同様のメソッドが `Reference` で定義されています。

注意点として、それがもしクラスメソッドの中であったとしても、`self` は常にインスタンスの型に対してのチェックとなります。

```crystal
class Person
  def self.compare(p1 : self, p2 : self)
    p1.name == p2.name
  end
end

john = Person.new "John"
peter = Person.new "Peter"

Person.compare(john, peter) # OK
```

制約の対象を Person クラスにする場合には、`self.class` を使用してください。次のセクションで型制約における `.class` サフィックスについて記載します。

## クラスによる制約

例えば、`Int32` の型に制約したとき、メソッドは `Int32` のインスタンスのみしか受け入れません。

```crystal
def foo(x : Int32)
end

foo 1       # OK
foo "hello" # エラー
```

もし、メソッドが (そのインスタンスではなく) `Int32` というクラスだけを受け入れるようにしたい場合、`.class` を使用します。

```crystal
def foo(x : Int32.class)
end

foo Int32  # OK
foo String # エラー
```

これは、インスタンスではなく型によってメソッドをオーバーロードしたい場合に便利です。

```crystal
def foo(x : Int32.class)
  puts "Got Int32"
end

def foo(x : String.class)
  puts "Got String"
end

foo Int32  # "Got Int32" を表示
foo String # "Got String" を表示
```

## splat 展開での型制約

splat 展開でも型制約を利用することができます。

```crystal
def foo(*args : Int32)
end

def foo(*args : String)
end

foo 1, 2, 3       # OK、最初のオーバーロードを実行
foo "a", "b", "c" # OK, 2つ目のオーバーロードを実行
foo 1, 2, "hello" # エラー
foo()             # エラー
```

このように型を指定した場合、タプルのすべての要素がその型である必要があります。また、空のタプルは上記の例ではマッチしません。もし空のタプルもサポートしたいのであれば、もう1つオーバーロードを追加してください。

```crystal
def foo
  # 空のタプルの場合
end
```

## 自由変数

型制約において、型を1文字の大文字で指定するとその識別子は自由変数となります。

```crystal
def foo(x : T)
  T
end

foo(1)       #=> Int32
foo("hello") #=> String
```

つまり、`T` が型を示すため、メソッドを初期化する際に効果的に利用することができます。

自由変数は、型制約でジェネリック型を指定する場合に、そのパラメータの型を展開することにも使えます。

```crystal
def foo(x : Array(T))
  T
end

foo([1, 2])   #=> Int32
foo([1, "a"]) #=> (Int32 | String)
```

型のインスタンスではなく、型自体の名前を利用したい場合は、型制約の自由変数に `.class` を追加してください。

```crystal
def foo(x : T.class)
  Array(T)
end

foo(Int32)  #=> Array(Int32)
foo(String) #=> Array(String)
```

## コンストラクタにおける自由変数

自由変数を使うことで、ジェネリック型を作るときに型推論を行うことができます。詳しくは[ジェネリクス](generics.html)を参照してください。

