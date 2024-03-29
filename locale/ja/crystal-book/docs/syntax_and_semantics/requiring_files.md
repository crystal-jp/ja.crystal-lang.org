# ファイルの require

小さなプログラムやベンチマーク用途のコードであれば1つのファイルに書いても OK ですが、大きなプログラムの場合は、複数のファイルに分けることでメンテナンスが楽になり、また理解もしやすくなります。

コンパイラに別のファイルを処理させたいときは`require "..."`を使用します。引数には1つの文字列リテラルをとり、その書き方によって様々な形式で対象を指定することができます。

ファイルが一度`require`されると、 コンパイラはその絶対パスを記憶し、以降ではそのファイルは読み込まれなくなります。

## require "filename"

このように記述した場合、require パスの中で "filename" に対応するファイルを探します。

By default, the require path includes two locations:

* the `lib` directory relative to the current working directory (this is where dependencies are looked up)
* the location of the standard library that comes with the compiler

探索の対象となるディレクトリはこれらのみです。

The exact paths used by the compiler can be queried as `crystal env CRYSTAL_PATH`:

```console
$ crystal env CRYSTAL_PATH
lib:/usr/bin/../share/crystal/src
```

These lookup paths can be overridden by defining the [`CRYSTAL_PATH` environment variable](../using_the_compiler/README.md#environment-variables).

ファイルの探索は以下の流れで処理されます。

* "filename.cr" という名前のファイルが require パスで見つかれば、そのファイルが読み込まれます。
* "filename" という名前のディレクトリの中に "filename.cr" というファイルがあれば、そのファイルが読み込まれます。
* "filename" という名前のディレクトリの中の "src" ディレクトリ中に "filename.cr" というファイルがあれば、そのファイルが読み込まれます。
* それ以外の場合はコンパイルエラーとなります。

2番目の規則は、次のようになっているときに、

```
- project
  - src
    - file
      - sub1.cr
      - sub2.cr
    - file.cr (requires "./file/*")
```

このようにすることができることも意味しています。

```
- project
  - src
    - file
      - file.cr (requires "./*")
      - sub1.cr
      - sub2.cr
```

こちらの方が良いと感じる人もいるでしょう。

3番目の規則はプロジェクトの典型的なディレクトリ構造にマッチしているためとても便利です。

```
- project
  - lib
    - foo
      - src
        - foo.cr
    - bar
      - src
        - bar.cr
  - src
    - project.cr
  - spec
    - project_spec.cr
```

つまり、各 "lib/{project}" が `src` や `spec`、`README.md` があるようなプロジェクトのディレクトリ構造になっています。

このとき `project.cr` に `require "foo"` を加えて `crystal src/project.cr` をプロジェクトのルートディレクトリで実行すると、コンパイラは `foo` として `lib/foo/foo.cr` を発見します。

4番目の規則は2番目の規則に3番目の規則を適用したものです。

プロジェクトのルートディレクトリ以外の場所からコンパイラを実行すると (例えば  `src` ディレクトリの中から、など)、 `lib` は require パスに追加されず `require "foo"` はうまく解決できません。

## require "./filename"

このように記述した場合、require を実行したファイルから相対的に "filename" に対応するファイルを探します。

ファイルの探索は以下の流れで処理されます。

* "filename.cr" という名前のファイルが現在のディレクトリから相対的な位置で見つかれば、そのファイルを読み込まれます。
* "filename" という名前のディレクトリの中に "filename.cr" というファイルがあれば、そのファイルが読み込まれます。
* それ以外の場合はコンパイルエラーとなります。

この相対パス参照はプロジェクトの中で他のファイルを参照するときによく使われます。また、[specs](../guides/testing.md) からコードを参照する場合にも利用されます。

```crystal title="spec/spec_helper.cr"
require "../src/project"
```

## その他の形式

上記したどちらのケースでも、ネストされた形式で名前を指定することが可能で、その場合にはネストされたデイレクトリを探索します。

* `require "foo/bar/baz"` は require パスから "foo/bar/baz.cr" や "foo/bar/baz/baz.cr"、 "foo/src/bar/baz.cr"、 "foo/src/bar/baz/baz.cr" を探します。
* `require "./foo/bar/baz"` は現在のファイルから相対的に "foo/bar/baz.cr" or "foo/bar/baz/baz.cr" を探します。

また、 "../" を使えば現在のファイルの親ディレクトリを指定することができ、`require "../../foo/bar"` のように書くこともできます。

これらのすべての場合で、末尾に `*` と `**` という特別な記号を利用できます。

* `require "foo/*"` は "foo" ディレクトリ中のすべての ".cr" ファイルを読み込むが、"foo" 中のディレクトリまでは読み込みません。
* `require "foo/**"` は "foo" ディレクトリ中のすべての ".cr" ファイルにくわえて、"foo" 中のディレクトリも再帰的に読み込みます。
