# マクロ

マクロとは、コンパイル時に AST ノードを受け取り、コードを生成してそれをプログラムに書き込むメソッドです。例をあげます。

```ruby
macro define_method(name, content)
  def {{name}}
    {{content}}
  end
end

# これで以下が生成されます
#
#     def foo
#       1
#     end
define_method foo, 1

foo #=> 1
```

マクロ定義の本体はほぼ通常の Crystal コードですが、AST ノードを扱うための特別なシンタックスを利用します。生成されたコードは正しい Crystal コードでなくてはいけません。例えば、対応する `end` のない `def` や、`case` の `when` 式単体のものなどは、完全な式として正しいものではないので生成することができません。

## スコープ

トップレベルで宣言されたマクロはどこからでもアクセス可能です。もしトップレベルのマクロが `private` に指定された場合は、そのファイル内でのみアクセスできます。

クラスやモジュール内で定義することも可能で、その場合はそれらのスコープ内でのみアクセスできます。また、マクロは継承チェーン (スーパクラスとインクルードされたモジュール) からも探索されます。

例えば、ブロックが与えられていて、`with ... yield` によってデフォルトのレシーバがあるオブジェクトに設定されているときには、そのオブジェクトの継承チェーンの中で定義されているマクロにアクセスすることが可能です。

```ruby
class Foo
  macro emphasize(value)
    "***#{ {{value}} }***"
  end

  def yield_with_self
    with self yield
  end
end

Foo.new.yield_with_self { emphasize(10) } #=> "***10***"
```

## 文字列埋め込み (String Interpolation)

前述した例にもあったように、AST ノードを貼り付け/埋め込みには `{{...}}` を使います。 

ノードは「そのまま」貼り付けされることに注意してください。例えばもし、上記の例でシンボルを渡した場合には、生成されたコードは不正なものとなります。

```ruby
# 下記が生成される
#
#     def :foo
#       1
#     end
define_method :foo, 1
```

マクロに渡されたものがそのまま埋め込まれるので、結果は `:foo` となっています。こういった、識別子を必要とする場合には、 `ASTNode#id` を利用することができます。

## マクロにおけるメソッド呼び出し

コンパイル時に、メソッドの **規定のサブセット** を AST ノードに対して実行することが可能です。これらのメソッドは [Macros](http://crystal-lang.org/api/Macros.html) という「フェイクの」モジュールでドキュメント化されています。

例えば、上記の例では、`ASTNode#id` を実行することで問題を解決できます。

```ruby
macro define_method(name, content)
  def {{name.id}}
    {{content}}
  end
end

# 以下が正しく生成される
#
#     def foo
#       1
#     end
define_method :foo, 1
```

## 条件

`{% if condition %}` ... `{% end %}` を使うことで、条件に応じてコードを生成することが可能になります。

```ruby
macro define_method(name, content)
  def {{name}}
    {% if content == 1 %}
      "one"
    {% else %}
      {{content}}
    {% end %}
  end
end

define_method foo, 1
define_method bar, 2

foo #=> one
bar #=> 2
```

通常のコードと同様に、`Nop` と `NilLiteral` 、そして「偽」の `BoolLiteral` は「偽」で、それ以外はすべて「真」と判断されます。

マクロの条件分岐は、マクロの外側でも使用することができます。

```ruby
{% if env("TEST") %}
  puts "We are in test mode"
{% end %}
```

### イテレーション
`ArrayLiteral` をイテレートするには以下のようにします。

```ruby
macro define_dummy_methods(names)
  {% for name, index in names %}
    def {{name.id}}
      {{index}}
    end
  {% end %}
end

define_dummy_methods [foo, bar, baz]

foo #=> 0
bar #=> 1
baz #=> 2
```

上記の `index` 変数はオプションです。

`HashLiteral` をイテレートするには以下のようにします。

```ruby
macro define_dummy_methods(hash)
  {% for key, value in hash %}
    def {{key.id}}
      {{value}}
    end
  {% end %}
end
define_dummy_methods({foo: 10, bar: 20})
foo #=> 10
bar #=> 20
```

マクロのイテレーションは、マクロの外側でも使用することができます。

```ruby
{% for name, index in ["foo", "bar", "baz"] %}
  def {{name.id}}
    {{index}}
  end
{% end %}

foo #=> 0
bar #=> 1
baz #=> 2
```

## 可変長引数と展開

マクロは可変長引数を受け取ることができます。

```ruby
macro define_dummy_methods(*names)
  {% for name, index in names %}
    def {{name.id}}
      {{index}}
    end
  {% end %}
end

define_dummy_methods foo, bar, baz

foo #=> 0
bar #=> 1
baz #=> 2
```

引数は `ArrayLiteral` に変換されてマクロに渡されます。

さらに、`ArrayLiteral` を埋め込む際に `*` を使うと、要素がカンマで分割されて埋め込まれます。

```ruby
macro println(*values)
   print {{*values}}, '\n'
end

println 1, 2, 3 # 123\n と出力
```

### 型情報

マクロが実行される際に  `@type` という特別のインスタンス変数を使うことで、現在のスコープ、および型にアクセスすることが可能です。この変数の型は `TypeNode` で、コンパイル時の型情報にアクセスすることを可能にします。

`@type` は常に (もしクラスメソッドの中で実行されたとしても) 「インスタンス」の型になることに注意してください。

### 定数

マクロは定数にアクセスすることができます。例をあげます。

```ruby
VALUES = [1, 2, 3]

{% for value in VALUES %}
  puts {{value}}
{% end %}
```

もし定数が型を示していれば、そのとき得られるのは `TypeNode` となります。
