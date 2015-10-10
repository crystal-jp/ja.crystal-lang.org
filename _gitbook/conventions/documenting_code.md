# コードのドキュメント化

Crystal のドキュメンテーションコメントは [Markdown](https://daringfireball.net/projects/markdown/) のサブセットになっています。 

* ドキュメンテーションコメントはクラス、モジュール、そしてメソッド定義のすぐ上に配置してください。間に空白行が入っていてはいけません。

```crystal
# A unicorn is a **legendary animal** (see the `Legendary` module) that has been
# described since antiquity as a beast with a large, spiraling horn projecting
# from its forehead.
class Unicorn
end

# よくない例: これはどのクラスにも紐付けられません

class Legendary
end
```

* メソッドのドキュメントは、メソッドの概要、およびメソッドの詳細の内容となります。前者が含むのは最初の1行のみで、後者はドキュメント全体を含みます。簡単に言うと、以下のようにするのが好ましいということです。

  1. 最初の行にメソッドの目的と機能を記載する
  2. その後で、詳細と使用方法をその後に記載する

例えば、

``````crystal
# Returns the number of horns this unicorn has.
#
# ```
# Unicorn.new.horns #=> 1
# ```
def horns
  @horns
end
``````

* 3人称を使ってください。つまり、`Return the number of horns this unicorn has` ではなく、`Returns the number of horns this unicorn has` とします。

* パラメータ名は「イタリック体」とします。1つのアスタリスク (`*`) またはアンダースコア(`_`) で囲みます。

```crystal
# Creates a unicorn with the specified number of *horns*.
def initialize(@horns = 1)
  raise "Not a unicorn" if @horns != 1
end
```

* Crystal のコードブロックは3つのバックティック (バッククォート) で囲むか、スペース4つでインデントします。

``````crystal
# ```
# unicorn = Unicorn.new
# unicorn.speak
# ```
``````

または 

```crystal
#     unicorn = Unicorn.new
#     unicorn.speak 
```

* 例えばプログラムの出力を示すためのテキストのブロックは、「text」というキーワードをつけた3つのバックティック (バッククォート) で囲みます。

``````crystal
# ```text
# "I'm a unicorn"
# ```
``````

* 自動的に他の型にリンクさせたい場合は、1つのバックティック (バッククォート) で囲みます。

```crystal
# the `Legendary` module
```

* 現在の型のメソッドに対して自動的にリンクさせたい場合は、`#horns` や `#index(char)` のようにハッシュ記号をつけて、1つのバックティック (バッククォート) で囲みます。

* 他の型のメソッドに対して自動的にリンクさせたい場合は、`OtherType#method(arg1, arg2)` のようにするか、または単純に `OtherType#method` として、1つのバックティック (バッククォート) で囲みます。

例をあげます。

```crystal
# Check the number of horns with `#horns`.
# See what a unicorn would say with `Unicorn#speak`.
```

* コードブロックの中で式の値を示したい場合は、`#=>` を使います。

```crystal
1 + 2 #=> 3
Unicorn.new.speak #=> "I'm a unicorn"
```

* 前の定義と同じコメントを使いたい場合は、`ditto` (同上の意味) を使います。

```crystal
# ditto
def number_of_horns
  horns
end
```

* public に定義されたものを生成されたドキュメント上では隠したい場合には、`:nodoc:` を使います。private や protected のメソッドに関しては、はじめから常に隠されています。

```crystal
class Unicorn
  # :nodoc:
  class Helper
  end
end
```

### 全体の例

`````crystal
# A unicorn is a **legendary animal** (see the `Legendary` module) that has been
# described since antiquity as a beast with a large, spiraling horn projecting
# from its forhead.
#
# To create a unicorn:
#
# ```
# unicorn = Unicorn.new
# unicorn.speak
# ```
#
# The above produces:
#
# ```text
# "I'm a unicorn"
# ```
#
# Check the number of horns with `#horns`.
class Unicorn
  include Legendary

  # Creates a unicorn with the specified number of *horns*.
  def initialize(@horns = 1)
    raise "Not a unicorn" if @horns != 1
  end

  # Returns the number of horns this unicorn has
  #
  # ```
  # Unicorn.new.horns #=> 1
  # ```
  def horns
    @horns
  end

  # ditto
  def number_of_horns
    horns
  end

  # Makes the unicorn speak to STDOUT
  def speak
    puts "I'm a unicorn"
  end

  # :nodoc:
  class Helper
  end
end
`````

### ドキュメントの生成

プロジェクトのドキュメントを生成するには、`crystal doc` を実行します。これで、`doc` ディレクトリが作られ、そのエントリポイントは `doc/index.html` となります。対象となるのは、ルートの `src` ディレクトリ内に含まれるすべてのファイルです。
