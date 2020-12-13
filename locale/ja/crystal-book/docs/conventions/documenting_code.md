# コードのドキュメント化

Crystal のドキュメンテーションコメントは [Markdown](https://daringfireball.net/projects/markdown/) のサブセットになっています。

プロジェクトのドキュメントを生成するには`crystal docs`を実行します。デフォルトでは`docs`ディレクトリが生成され、`docs/index.html`がエントリーポイントとなります。より詳細には[コンパイラの利用 - ドキュメントの生成](../using_the_compiler/#crystal-docs)を閲覧してください。

* ドキュメンテーションコメントはクラス、モジュール、そしてメソッド定義のすぐ上に配置してください。間に空白行が入っていてはいけません。

   ```crystal
   # A unicorn is a **legendary animal** (see the `Legendary` module) that has been
   # described since antiquity as a beast with a large, spiraling horn projecting
   # from its forehead.
   class Unicorn
   end

   # Bad: This is not attached to any class.

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
   # Unicorn.new.horns # => 1
   # ```
   def horns
     @horns
   end
   ``````

* 3人称を使ってください。つまり、`Return the number of horns this unicorn has`ではなく`Returns the number of horns this unicorn has`とします。

* パラメータ名は*イタリック体*とします。1つのアスタリスク (`*`) もしくはアンダースコア (`_`)  で囲みます。

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

* 現在の型のメソッドに対して自動的にリンクさせたい場合は、`#horns`や`#index(char)`のようにハッシュ記号をつけて、1つのバックティック (バッククォート) で囲みます。

* 他の型のメソッドに対して自動的にリンクさせたい場合は、`OtherType#method(arg1, arg2)`のようにするかa、または単純に`OtherType#method`として、1つのバックティック (バッククォート) で囲みます。

   例をあげます。

   ```crystal
   # Check the number of horns with `#horns`.
   # See what a unicorn would say with `Unicorn#speak`.
   ```

* コードブロックの中で式の値を示したい場合は、`# =>`を使います。

   ```crystal
   1 + 2             # => 3
   Unicorn.new.speak # => "I'm a unicorn"
   ```

* 前の定義と同じコメントを使いたい場合は、`:ditto:` (同上の意味) を使います。

   ```crystal
   # :ditto:
   def number_of_horns
     horns
   end
   ```

* 公開APIであることを生成されたドキュメントでは隠したい場合、`:nodoc:`を使います。private や protected のメソッドに関しては、はじめから常に隠されています。

   ```crystal
   class Unicorn
     # :nodoc:
     class Helper
     end
   end
   ```

### ドキュメントの継承

インスタンスメソッドがドキュメンテーションコメントを持たないが、親クラスで同じシグネチャのメソッドがあるときは、ドキュメントは親クラスのものから継承されます。

例をあげます。

```crystal
abstract class Animal
  # Returns the name of `self`.
  abstract def name : String
end

class Unicorn < Animal
  def name : String
    "unicorn"
  end
end
```

`Unicorn#name`のドキュメントは次のようになります。

```
Description copied from class `Animal`

Returns the name of `self`.
```

子クラスのメソッドで親クラスからドキュメントをコピーすることを明示するために`:inherit:`が利用できます。この場合 `Description copied from ...`というメッセージは生成されません。`:inherit:`を子クラスのドキュメントに親クラスのものを挿入するためにも利用できます。

例をあげます。

```crystal
abstract class Parent
  # Some documentation common to every *id*.
  abstract def id : Int32
end

class Child < Parent
  # Some documentation specific to *id*'s usage within `Child`.
  #
  # :inherit:
  def id : Int32
    -1
  end
end
```

`Child#id`のドキュメントは次のようになります。

```
Some documentation specific to *id*'s usage within `Child`.

Some documentation common to every *id*.
```

!!! note
    ドキュメントの継承はコンストラクタメソッドではなく、 _インスタンスメソッド_ でのみ機能します。

### クラス、モジュール、そしてメソッドに対するフラグ付け

特定のキーワードを与えると Crystal は自動で問題や注意を強調するために、視覚的なフラグを生成します。

次のキーワードがサポートされています。

- BUG
- DEPRECATED
- FIXME
- NOTE
- OPTIMIZE
- TODO

フラグ付けのキーワードはそれぞれの行の最初の単語であり、かつすべて大文字でなければいけません。可読性のためにコロンを続けることが推奨されます。

``````crystal
# Makes the unicorn speak to STDOUT
#
# NOTE: Although unicorns don't normally talk, this one is special
# TODO: Check if unicorn is asleep and raise exception if not able to speak
# TODO: Create another `speak` method that takes and prints a string
def speak
  puts "I'm a unicorn"
end

# Makes the unicorn talk to STDOUT
#
# DEPRECATED: Use `speak`
def talk
  puts "I'm a unicorn"
end
``````

### Crystal のコードフォーマッタの利用

Crystal に組み込みのコードフォーマッタはコードのフォーマットのためだけでなく、ドキュメンテーションコメント中のコードブロックもフォーマットのためにも利用できます。

`crystal tool format`すれば、現在のディレクトリのすべての`.cr`のドキュメンテーションコメントもフォーマットされます。

単一のファイルをフォーマットするには以下のようにします。

```console
$ crystal tool format file.cr
```

ディレクトリに含まれる`.cr`ファイルをすべてフォーマットするには以下のようにします。

```console
$ crystal tool format src/
```

このツールを使ってコーディングスタイルを統一し、ドキュメントの改善をCrystal 自身に従わせてください。

フォーマッタは十分に早く、もし単一のファイルでなくプロジェクト全体のフォーマットをしたとしても、損う時間はほとんどありません。

### 全体の例

``````crystal
# A unicorn is a **legendary animal** (see the `Legendary` module) that has been
# described since antiquity as a beast with a large, spiraling horn projecting
# from its forehead.
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
  # Unicorn.new.horns # => 1
  # ```
  def horns
    @horns
  end

  # :ditto:
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
``````
