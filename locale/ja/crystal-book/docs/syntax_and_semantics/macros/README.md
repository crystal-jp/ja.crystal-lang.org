# マクロ

マクロとは、コンパイル時に AST ノードを受け取り、コードを生成してそれをプログラムに書き込むメソッドです。例をあげます。

```crystal
macro define_method(name, content)
  def {{name}}
    {{content}}
  end
end

# これで以下が生成されます。
#
#     def foo
#       1
#     end
define_method foo, 1

foo # => 1
```

マクロ定義の本体はほぼ通常の Crystal コードですが、AST ノードを扱うための拡張されたシンタックスを利用します。生成されたコードは正しい Crystal コードでなくてはいけません。例えば、対応する `end` の無い `def` や、`case` 式の `when` 部分だけのものなどは、完全な式として正しいものではないので生成することができません。詳しくは[落とし穴](#pitfalls)を参照してください。

## スコープ

トップレベルで宣言されたマクロはどこからでもアクセス可能です。トップレベルのマクロが `private` 指定されていた場合は、そのファイル内でのみアクセスできます。

クラスやモジュール内で定義することも可能で、それはそのスコープ内でアクセスできます。また、マクロは継承チェーン (スーパクラスとインクルードされたモジュール) からも探索されます。

例えば、ブロックが与えられていて、`with ... yield` によってデフォルトのレシーバが設定されているときには、そのオブジェクトの継承チェーンの中で定義されているマクロにアクセスすることが可能です。

```crystal
class Foo
  macro emphasize(value)
    "***#{ {{value}} }***"
  end

  def yield_with_self
    with self yield
  end
end

Foo.new.yield_with_self { emphasize(10) } # => "***10***"
```

クラスやモジュールに定義されたマクロを、その外側から呼び出すこともできます。

```crystal
class Foo
  macro emphasize(value)
    "***#{ {{value}} }***"
  end
end

Foo.emphasize(10) # => "***10***"
```

## 文字列の補間

前述した例にもあったように、AST ノードを貼り付ける、もしくは埋め込むには `{{...}}` を使います。

ノードは「そのまま」貼り付けされることに注意してください。例えばもし、上記の例でシンボルを渡した場合には、生成されたコードは不正なものとなります。

```crystal
# これで以下が生成されます:
#
#     def :foo
#       1
#     end
define_method :foo, 1
```

マクロに渡されたものがそのまま埋め込まれるので、結果は `:foo` となっています。こういった、識別子を必要とする場合には [`ASTNode#id`](https://crystal-lang.org/api/latest/Crystal/Macros/ASTNode.html#id%3AMacroId-instance-method) が利用できます。

## マクロにおけるメソッド呼び出し

コンパイル時に、メソッドの**既定のサブセット**を AST ノードに対して実行することが可能です。これらのメソッドは [Crystal::Macros](https://crystal-lang.org/api/latest/Crystal/Macros.html) というフェイクのモジュールでドキュメントされています。

例えば、上の例では [`ASTNode#id`](https://crystal-lang.org/api/latest/Crystal/Macros/ASTNode.html#id%3AMacroId-instance-method) を呼びa出すことで問題を解決できます。

```crystal
macro define_method(name, content)
  def {{name.id}}
    {{content}}
  end
end

# 以下が正しく生成される:
#
#     def foo
#       1
#     end
define_method :foo, 1
```

## モジュールとクラス

モジュールやクラス、構造体を生成することもできます。

```crystal
macro define_class(module_name, class_name, method, content)
  module {{module_name}}
    class {{class_name}}
      def initialize(@name : String)
      end

      def {{method}}
        {{content}} + @name
      end
    end
  end
end

# これで以下が生成される:
#     module Foo
#       class Bar
#         def initialize(@name : String)
#         end
#
#         def say
#           "hi " + @name
#         end
#       end
#     end
define_class Foo, Bar, say, "hi "

p Foo::Bar.new("John").say # => "hi John"
```

## 条件分岐

`{% if condition %}` ... `{% end %}` を使うことで、条件に応じてコードを生成することが可能になります。

```crystal
macro define_method(name, content)
  def {{name}}
    {% if content == 1 %}
      "one"
    {% elsif content == 2 %}
      "two"
    {% else %}
      {{content}}
    {% end %}
  end
end

define_method foo, 1
define_method bar, 2
define_method baz, 3

foo # => one
bar # => two
baz # => 3
```

通常のコードと同様に、[`Nop`](https://crystal-lang.org/api/latest/Crystal/Macros/Nop.html) と [`NilLiteral`](https://crystal-lang.org/api/latest/Crystal/Macros/NilLiteral.html)、そして偽の [`BoolLiteral`](https://crystal-lang.org/api/latest/Crystal/Macros/BoolLiteral.html) は*偽となり*、それ以外はすべて*真となり*ます。

マクロの条件分岐は、マクロの外側でも使用することができます。

```crystal
{% if env("TEST") %}
  puts "We are in test mode"
{% end %}
```

## 繰り返し

有限回の繰り返しをすることができます。

```crystal
macro define_constants(count)
  {% for i in (1..count) %}
    PI_{{i.id}} = Math::PI * {{i}}
  {% end %}
end

define_constants(3)

PI_1 # => 3.14159...
PI_2 # => 6.28318...
PI_3 # => 9.42477...
```

[`ArrayLiteral`](https://crystal-lang.org/api/latest/Crystal/Macros/ArrayLiteral.html) を繰り返すには次のようにします。

```crystal
macro define_dummy_methods(names)
  {% for name, index in names %}
    def {{name.id}}
      {{index}}
    end
  {% end %}
end

define_dummy_methods [foo, bar, baz]

foo # => 0
bar # => 1
baz # => 2
```

上記の `index` 変数は任意です。

[`HashLiteral`](https://crystal-lang.org/api/latest/Crystal/Macros/HashLiteral.html) を繰り返すには次のようにします。

```crystal
macro define_dummy_methods(hash)
  {% for key, value in hash %}
    def {{key.id}}
      {{value}}
    end
  {% end %}
end

define_dummy_methods({foo: 10, bar: 20})
foo # => 10
bar # => 20
```

マクロの繰り返し構文は、マクロの外側でも使用することができます。

```crystal
{% for name, index in ["foo", "bar", "baz"] %}
  def {{name.id}}
    {{index}}
  end
{% end %}

foo # => 0
bar # => 1
baz # => 2
```

## 可変長引数とスプラット展開

マクロは可変長引数を受け取ることができます。

```crystal
macro define_dummy_methods(*names)
  {% for name, index in names %}
    def {{name.id}}
      {{index}}
    end
  {% end %}
end

define_dummy_methods foo, bar, baz

foo # => 0
bar # => 1
baz # => 2
```

引数は [`TupleLiteral`](https://crystal-lang.org/api/latest/Crystal/Macros/TupleLiteral.html) に変換されてマクロに渡されます。

さらに、[`TupleLiteral`](https://crystal-lang.org/api/latest/Crystal/Macros/TupleLiteral.html) を埋め込む際に `*` を使うと、要素がカンマ区切りのものとして埋め込まれます。

```crystal
macro println(*values)
  print {{*values}}, '\n'
end

println 1, 2, 3 # outputs 123\n
```

## 型の情報

マクロが実行される際に、`@type` という項別なインスタンス変数を使うことで、現在のスコープ、もしくは型にアクセスすることが可能です。この変数の型は [`TypeNode`](https://crystal-lang.org/api/latest/Crystal/Macros/TypeNode.html) で、コンパイル時の型情報にアクセスできます。

`@type` は常に (もしクラスメソッドの中で実行されたとしても) *インスタンス*の型になることに注意してください。

例をあげます。

```crystal
macro add_describe_methods
  def describe
    "Class is: " + {{ @type.stringify }}
  end

  def self.describe
    "Class is: " + {{ @type.stringify }}
  end
end

class Foo
  add_describe_methods
end

Foo.new.describe # => "Class is Foo"
Foo.describe     # => "Class is Foo"
```

## メソッドの情報

マクロが実行される際に、`@def` という特別なインスタンス変数を使うことで、メソッド、もしくはマクロにアクセスすることが可能です。この変数の型は [`Def`](https://crystal-lang.org/api/latest/Crystal/Macros/Def.html) で、もしマクロがメソッドの外で実行されていた場合は [`NilLiteral`](https://crystal-lang.org/api/latest/Crystal/Macros/NilLiteral.html) となります。

例:

```crystal
module Foo
  def Foo.boo(arg1, arg2)
    {% @def.receiver %} # => Foo
    {% @def.name %}     # => boo
    {% @def.args %}     # => [arg1, arg2]
  end
end

Foo.boo(0, 1)
```

## 定数

マクロは定数にアクセスすることができます。例をあげます。

```crystal
VALUES = [1, 2, 3]

{% for value in VALUES %}
  puts {{value}}
{% end %}
```

もし定数が型を示していれば、そのとき得られるのは [`TypeNode`](https://crystal-lang.org/api/latest/Crystal/Macros/TypeNode.html) となります。

## ネストしたマクロ

いくつかのマクロを生成するようなマクロを定義することができます。このとき、内側のマクロが外側のマクロによって評価されるのを防ぐため、バックラッシュでエスケープする必要があります。

```crystal
macro define_macros(*names)
  {% for name in names %}
    macro greeting_for_{{name.id}}(greeting)
      \{% if greeting == "hola" %}
        "¡hola {{name.id}}!"
      \{% else %}
        "\{{greeting.id}} {{name.id}}"
      \{% end %}
    end
  {% end %}
end

# これは以下を生成します:
#
#     macro greeting_for_alice
#       {% if greeting == "hola" %}
#         "¡hola alice!"
#       {% else %}
#         "{{greeting.id}} alice"
#       {% end %}
#     end
#     macro greeting_for_bob
#       {% if greeting == "hola" %}
#         "¡hola bob!"
#       {% else %}
#         "{{greeting.id}} bob"
#       {% end %}
#     end
define_macros alice, bob

greeting_for_alice "hello" # => "hello alice"
greeting_for_bob "hallo"   # => "hallo bob"
greeting_for_alice "hej"   # => "hej alice"
greeting_for_bob "hola"    # => "¡hola bob!"
```

### verbatim

ネストしたマクロを定義する他の方法としては、`verbatim` という特別なメソッドを使うものがあります。これを使うことで、内側のマクロをエスケープする必要がなくなります。

```crystal
macro define_macros(*names)
  {% for name in names %}
    macro greeting_for_{{name.id}}(greeting)

      # name は verbatim ブロックの中では有効ではありません
      \{% name = {{name.stringify}} %}

      {% verbatim do %}
        {% if greeting == "hola" %}
          "¡hola {{name.id}}!"
        {% else %}
          "{{greeting.id}} {{name.id}}"
        {% end %}
      {% end %}
    end
  {% end %}
end

# 以下が生成されます。
#
#     macro greeting_for_alice
#       {% name = "alice" %}
#       {% if greeting == "hola" %}
#         "¡hola alice!"
#       {% else %}
#         "{{greeting.id}} alice"
#       {% end %}
#     end
#     macro greeting_for_bob
#       {% name = "bob" %}
#       {% if greeting == "hola" %}
#         "¡hola bob!"
#       {% else %}
#         "{{greeting.id}} bob"
#       {% end %}
#     end
define_macros alice, bob

greeting_for_alice "hello" # => "hello alice"
greeting_for_bob "hallo"   # => "hallo bob"
greeting_for_alice "hej"   # => "hej alice"
greeting_for_bob "hola"    # => "¡hola bob!"
```

内側のマクロの変数は `verbatim` ブロックの中では有効ではないことに注意してください。ブロックの中身は「そのまま」文字列のようにコンパイラに渡され、再度検査されます。

## コメント

コメント中のマクロの式は、コンパイルされるコードと同様に評価されます。これは関係するドキュメントコメントを生成するのに使えます。

```crystal
{% for name, index in ["foo", "bar", "baz"] %}
  # Provides a placeholder {{name.id}} method. Always returns {{index}}.
  def {{name.id}}
    {{index}}
  end
{% end %}
```

この評価は埋め込みだけでなくディレクティブに対してもはたらきます。結果として、マクロをコメントアウトすることはできません。

```crystal
macro a
  # {% if false %}
  puts 42
  # {% end %}
end

a
```

上記の式は何も出力しないでしょう。

## 落とし穴

マクロを書く際 (とくにマクロ定義の外で)、マクロによって生成されたコードは、メインのプログラムのコードにマージされる前から、それ自身として有効なコードである必要があることを覚えておいてください。要するに、例えば、マクロは冒頭の `case` が生成するコードに含まれていないような`case` 式の `when` 節を生成することはできない、ということです。

次が、そのような無効なマクロの例になります。

```crystal
case 42
{% for klass in [Int32, String] %} # Syntax Error: unexpected token: {% (expecting when, else or end)
  when {{klass.id}}
    p "is {{klass}}"
{% end %}
end
```

`case` がマクロの外側にあることに注目してください。マクロによって生成されたコードは2つの孤立した `when` 節からなりますが、これは有効な Crystal のコードではありません。`case` をマクロによって生成されるコードに含めるために、`begin` と `end` を使うことができます。

```crystal
{% begin %}
  case 42
  {% for klass in [Int32, String] %}
    when {{klass.id}}
      p "is {{klass}}"
  {% end %}
  end
{% end %}
```
