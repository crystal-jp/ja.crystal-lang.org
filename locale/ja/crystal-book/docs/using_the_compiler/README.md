# コンパイラの使い方

## コンパイルと同時に実行する

ファイル名を1つ指定して[`crystal run`](#crystal-run)コマンドを実行することで、プログラムのコンパイルと実行を一発で行うことができます。

```console
$ echo 'puts "Hello World!"' > hello_world.cr
$ crystal run hello_world.cr
Hello World!
```

`run`コマンドは`hello_world.cr`というソースコードをその場限りの実行可能バイナリにコンパイルして、即時にそれを実行します。

## 実行可能ファイルの生成

[`crystal build`](#crystal-build)コマンドで実行可能バイナリがビルドされます。
出力されるファイルのファイル名はソースコードのファイル名から`.cr`という拡張子を除いたものになります。

```console
$ crystal build hello_world.cr
$ ./hello_world
Hello World!
```

### リリースビルド

デフォルトでは、生成された実行可能ファイルは完全には最適化されていません。`--release`というフラグを付けることで最適化を有効にできます。

```console
$ crystal build hello_world.cr --release
```

リリースモードでないコンパイルは十分に早く、また生成されるバイナリもそれなりのパフォーマンスではあります。

リリースモードでのビルドはプロダクションでの利用やベンチマークの測定の際に用いてください。
開発時のビルドであれば、リリースビルドをする必要はありません。

配布するファイルのサイズを減らすには、`--no-debug`フラグを用いることが有効です。これはファイルサイズを減らすためにデバッグシンボルをファイルから削除しますが、一方、当然にデバッグは困難になります。

### 静的リンクした実行可能ファイルの生成

`--static`フラグは、静的リンクした実行可能ファイルの生成に用います。

```console
$ crystal build hello_world.cr --release --static
```

!!! note
    静的リンクした実行可能ファイルのビルドは現在Alpine Linux上でのみサポートされています。

静的リンクについてのより詳細な情報は[「静的リンク」についてのガイド](../guides/static_linking.md)を参照してください。

コンパイラは`CRYSTAL_LIBRARY_PATH`という環境変数を、静的もしくは動的にリンクするライブラリを最初に探索する場所とします。これは動的ライブラリとしても有効な、静的なバージョンのライブラリを提供することに使えます。

### Crystal のプロジェクトの作成

[`crystal init`](#crystal-init) コマンドは基本的なディレクトリ構成を持った Crystal プロジェクトの初期化をするのに役に立ちます。`crystal init app <name>`はアプリケーション向けで、
`crystal init lib <name>`はライブラリ向けです。

```console
$ crystal init app myapp
    create  myapp/.gitignore
    create  myapp/.editorconfig
    create  myapp/LICENSE
    create  myapp/README.md
    create  myapp/.travis.yml
    create  myapp/shard.yml
    create  myapp/src/myapp.cr
    create  myapp/src/myapp/version.cr
    create  myapp/spec/spec_helper.cr
    create  myapp/spec/myapp_spec.cr
Initialized empty Git repository in /home/crystal/myapp/.git/
```

すべてのファイルがあらゆるプロジェクトで必要になるわけではなく、カスタマイズが必要に感じる場合もあるでしょう。しかし、`crystal init`は Crystal のlアプリケーションやライブラリの開発に十分なデフォルトの環境を提供しています。

## コマンドの概要

* [`crystal init`](#crystal-init): 新規プロジェクトの生成
* [`crystal build`](#crystal-build): 実行可能ファイルのビルド
* [`crystal docs`](#crystal-docs): ドキュメントの生成
* [`crystal env`](#crystal-env): Crystal 環境の情報を表示
* [`crystal eval`](#crystal-eval): 引数や標準入力からコードを評価
* [`crystal play`](#crystal-play): Crystal プレイグラウンドを起動
* [`crystal run`](#crystal-run): プログラムをビルドして実行
* [`crystal spec`](#crystal-spec): spec をビルドして実行
* [`crystal tool`](#crystal-tool): ツールの実行
* `crystal help`: コマンドとオプションのヘルプの表示
* [`crystal version`](#crystal-version): バージョンの表示

特定のコマンドの有効なオプションを確認したい場合は、コマンド名のあとに`--help`を付けて実行してください。

### `crystal run`

`run`コマンドはソースコードを実行可能バイナリにコンパイルして、即時にそれを実行します。

```
crystal [run] [<options>] <programfile> [-- <argument>...]
```

コンパイルされたバイナリへの引数は、コンパイラへの引数のあとに2つのハイフン (`--`) で区切って渡します。
コンパイルと実行の間、生成された実行可能ファイルは一時的な場所に保存されています。

例:

```console
$ echo 'puts "Hello #{ARGV[0]?}!"' > hello_world.cr
$ crystal run hello_world.cr -- Crystal
Hello Crystal!
```

**よく使うオプション:**

* `--release`: リリースモードを有効にして、生成されるバイナリに最適化をしてコンパイルする
* `--progress`: コンパイルの進捗を逐次表示する
* `--static`: 静的にリンクする

その他のオプションは統合されたヘルプにて説明されています。`crystal run --help`を使うか、`man crystal`で man ページを見てください。

### `crystal build`

`crystal build`コマンドは動的リンクした実行可能バイナリをビルドします。

```
crystal build [<options>] <programfile>
```

明示的に指定しなければ、生成されるバイナリはソースコードのファイル名から `.cr` という拡張子を除いたものになります。

例:

```console
$ echo 'puts "Hello #{ARGV[0]?}!"' > hello_world.cr
$ crystal build hello_world.cr
$ ./hello_world Crystal
Hello Crystal!
```

**よく使うオプション:**

* `--cross-compile`: .o ファイルを生成して、実行可能ファイルを生成するためのコマンドを表示する
* `-D FLAG, --define FLAG`: コンパイル時フラグを指定する
* `-o <output_file>`: 出力されるバイナリのファイル名を指定する
* `--release`: リリースモードを有効にして、生成されるバイナリに最適化をしてコンパイルする
* `--link-flags FLAGS`: リンカに渡す追加のフラグを指定する
* `--lto=thin`: リリースビルドのパフォーマンスを向上させるために ThinLTO を利用する。
* `--no-debug`: ファイルサイズを減らすためにデバッグシンボルの生成をしないようにする
* `--progress`: コンパイルの進捗を逐次表示する
* `--static`: 静的にリンクする
* `--verbose`: 内部的に実行したコマンドを表示する

その他のオプションは統合されたヘルプにて説明されています。`crystal build --help`を使うか、`man crystal` で man ページを見てください。

### `crystal eval`

`crystal eval`コマンドは Crystal のソースコードをコマンドラインか標準入力から読み込んで、それを実行可能ファイルにコンパイルして即時に実行します。

```
crystal eval [<options>] [<source>]
```

`source`が引数で指定されなかった場合は、ソースコードを標準入力から読み込みます。コンパイルと実行の間、生成された実行可能ファイルは一時的な場所に保存されています。

例:

```console
$ crystal eval 'puts "Hello World"'
Hello World!
$ echo 'puts "Hello World"' | crystal eval
Hello World!
```

!!! note
    対話的に実行したい場合、一般的には`Ctrl+D`を入力することで標準入力を閉じることができます。

**よく使うオプション:**

* `-o <output_file>`: 出力されるバイナリのファイル名を指定する
* `--release`: リリースモードを有効にして、生成されるバイナリに最適化をしてコンパイルする
* `--lto=thin`: パフォーマンスを向上させるために ThinLTO を利用する。
* `--no-debug`: ファイルサイズを減らすためにデバッグシンボルの生成をしないようにする
* `--progress`: コンパイルの進捗を逐次表示する
* `--static`: 静的にリンクする

lgstその他のオプションは統合されたヘルプにて説明されています。`crystal eval --help`を使うか、`man crystal`で man ページを見てください。

### `crystal version`

`crystal version`コマンドは Crystal のバージョンや LLVM のバージョン、そしてデフォルトで使うターゲットトリプルを出力します。

```
crystal version
```

例:

```console
$ crystal version
--8<-- "crystal-version.txt"
```

### `crystal init`

`crystal init`コマンドは Crystal プロジェクトに使うフォルダを初期化します。

```
crystal init (lib|app) <name> [<dir>]
```

最初の引数は`lib`か`app`のいずれかです。`lib`は再利用可能なライブラリで、`app`は依存関係に含めることのないアプリケーションであることを意図しています。ライブラリは自身のリポジトリに`shard.lock`を含めず、`shard.yml`にビルド目標を持ちませんが、依存関係としてどのように利用するかの説明があります。

例:

```console
$ crystal init lib my_cool_lib
    create  my_cool_lib/.gitignore
    create  my_cool_lib/.editorconfig
    create  my_cool_lib/LICENSE
    create  my_cool_lib/README.md
    create  my_cool_lib/.travis.yml
    create  my_cool_lib/shard.yml
    create  my_cool_lib/src/my_cool_lib.cr
    create  my_cool_lib/spec/spec_helper.cr
    create  my_cool_lib/spec/my_cool_lib_spec.cr
Initialized empty Git repository in ~/my_cool_lib/.git/
```

### `crystal docs`

`crystal docs` コマンドは Crystal のソースコード中のコメントから API ドキュメントを生成します (詳しくは [*コードのドキュメント化*](../conventions/documenting_code.md) を参照)。

```bash
crystal docs [--output=<output_dir>] [--canonical-base-url=<url>] [<source_file>...]
```

このコマンドは`output_dir` (デフォルトでは `./docs`) に、 Crystal での名前を反映したディレクトリ構造で、各 HTML ファイルが1つ1つの型に対応するような、静的な Web サイトを生成します。Web ブラウザで見る際のエントリーポイントは `docs/index.html` になります。
API ドキュメント全体は JSON として `$output_dir/index.json` に保存されています。

デフォルトでは、`./src` ディレクトリにあるすべてのファイルからドキュメント生成をします (つまり `src/**/*.cr` が指定されたような挙動です)。
読む込む順序に依存する場合は、ドキュメントジェネレータに明示的に1つ (ないし複数) の`source_file` をエントリーポイントして指定してください。

```bash
crystal docs src/my_app.cr
```

**よく使うオプション:**

* `--project-name=NAME`: プロジェクト名を設定する。可能な場合`shard.yml`にある名前をデフォルト値として利用します。デフォルト値が見つからない場合、このオプションは必須です
* `--project-version=VERSION`: プロジェクトのバージョンを指定します。可能な場合`shard.yml`に指定されたものかgitのコミットからバージョンを取り出します。デフォルト値が見つからない場合、このオプションは必須です
* `--output=DIR, -o DIR`: 出力先のディレクトリを指定する (デフォルト: `./docs`)
* `--canonical-base-url=URL, -b URL`: [canonical なベース URL](https://en.wikipedia.org/wiki/Canonical_link_element) を設定します。

次の例ではcanonicalなベースURLを明示的に指定した上で、`public`を出力先のディレクトリにして, そして`src/my_app.cr`をエントリーポイントとしてドキュメントを生成しています。

```bash
crystal docs --output public --canonical-base-url http://example.com/ src/my_app.cr
```

### `crystal env`

`crystal env` コマンドは Crystal が使う環境変数を出力します。

```bash
crystal env [<var>...]
```

デフォルトではシェルスクリプトのように情報を出力します。もしいくつかの`var`引数が渡された場合、それらの変数の値がそれぞれの行に出力されます。

例:

```console
$ crystal env
CRYSTAL_CACHE_DIR="/home/crystal/.cache/crystal"
CRYSTAL_PATH="/usr/bin/../share/crystal/src:lib"
CRYSTAL_VERSION="0.28.0"
CRYSTAL_LIBRARY_PATH="/usr/bin/../lib/crystal/lib"
$ crystal env CRYSTAL_VERSION
0.28.0
```

### `crystal spec`

`crystal spec` コマンドは Crystal の spec のコンパイルと実行を一度に行います。

```
crystal spec [<options>] [<file>...] [-- [<runner_options>]]
```

`files`引数で指定されたすべてのファイルは1つの Crystal ソースコードとして結合されます。引数がフォルダを指していた場合、そのフォルダ中の spec をまとめて指定したことになります。何も`files`引数を指定しなかった場合は、デフォルト値として`./spec`が与えられます。すべてのファイル名は`:`と行番号をあとに続けることで、spec ランナーに対して `--location` で指定する場合と同様の指定ができます (この後に詳細)。

`crystal spec --options`で可能なオプションの一覧を見ることができます。

**spec ランナーに対するオプション:**

`runner_options` はコンパイルされた spec を実行する際に渡すオプションを表しています。これらは他の引数とは `--` で区切る必要があります。

* `--verbose`: すべての spec 名を含むような詳細な出力をする
* `--profile`: 実行に時間のかかった spec を10個まで表示する
* `--fail-fast`: どれか1つでも spec が失敗したら即座に中断する
* `--junit_output <output_dir>`: JUnit XML を生成する

次のオプションは実行する spec の一覧をフィルターするために組み合わせられます。

* `--example <name>`: `name` を含むような spec を実行する
* `--line <line>`: 行番号が `line` に一致した spec を実行する
* `--location <file>:<line>`: `file` の `line` にある spec を実行する (複数指定可能)
* `--tag <tag>`: 指定されたタグを持つ spec を実行する、もしくは `~` に続けたタグを持つ spec を実行する spec の一覧から除く。
   * `--tag a --tag b` という指定は、タグ `a` もしくはタグ `b` を持つ spec を含めることになります。
   * `--tag ~a --tag ~b` という指定は タグ`a` もタグ`b` も持たない spec を含めることになります。
   * `--tag a --tag ~b` という指定は、タグ `a` を持つがタグ `b` を持たないような spec を含めることになります。

例:

```console
$ crystal spec
F

Failures:

  1) Myapp works
     Failure/Error: false.should eq(true)

       Expected: true
            got: false

     # spec/myapp_spec.cr:7

Finished in 880 microseconds
1 examples, 1 failures, 0 errors, 0 pending

Failed examples:

crystal spec spec/myapp_spec.cr:6 # Myapp works
```

### `crystal play`

`crystal play` コマンドは対話的な Crystal のプレイグラウンドを提供する Web サーバーを起動します。

```
crystal play [--port <port>] [--binding <host>] [--verbose] [file]
```

![Crystal プレイグラウンドのスクリーンショット](crystal-play.png)

### `crystal tool`

* `crystal tool context`: 与えられた位置でのコンテキストを表示
* `crystal tool expand`: 与えられた位置のマクロを展開
* [`crystal tool format`](#crystal-tool-format): Crystal ファイルのフォーマット
* `crystal tool hierarchy`: 型の階層を表示
* `crystal tool implementations`: 指定された位置で呼び出されているメソッドの実装がどこにあるかを表示
* `crystal tool types`: 主要な変数の型を表示

### `crystal tool format`

`crystal tool format` コマンドは Crystal のソースコードに標準的なフォーマットを適用します。

```
crystal tool format [--check] [<path>...]
```

`path` にはファイル名かフォルダ名が指定できて、フォルダ名の場合そのフォルダ中の Crystal ファイルを再帰的に辿ります。`path`が指定されなかった場合、現在のデイレクトリを指定したものとします。

フォーマッタはコメント中の Crystal のコードブロックにも適用されます (see [*コードのドキュメント化*](../conventions/documenting_code.md) を参照)。

## 環境変数

これらの環境変数は、もしセットされていれば Crystal のコンパイラによって利用されます。指定されていなければ、コンパイラはデフォルト値を利用します。これらの値は[`crystal env`](#crystal-env)を使うことで確認できます。

* `CRYSTAL_CACHE_DIR`: 続くビルドを高速化するために Crystal がキャッシュしている部分的なコンパイルの結果を保存するパスを指定します。このパスは[`crystal run`](#crystal-run)で一時的に保存される実行可能ファイルを保存する先としても利用されます ([`crystal build`](#crystal-build) では利用しません)。
   デフォルト値は次に上げるディレクトリのうち最初に見つかったか作成可能だったものになります: `${XDG_CACHE_HOME}/crystal` (`XDG_CACHE_HOME`がある場合)、`${HOME}/.cache/crystal`、`${HOME}/.crystal`、もしくは`./.crystal`。`CRYSTAL_CACHE_DIR`で指定されたパスが書き込み不可能だった場合もデフォルト値が代わりに利用されます。
* `CRYSTAL_PATH`: Crystal が require されたファイルを探索するパスを指定します。
* `CRYSTAL_VERSION` は[`crystal env`](#crystal-env)の出力としてのみ有効です。これを明示的にセットすることもできず、コンパイラはこの変数を実際には利用しません。
* `CRYSTAL_LIBRARY_PATH`: コンパイラはこの変数に指定されたパスを、静的もしくは動的にリンクするライブラリを最初に探索する場所として利用します。例えば静的ライブラリが`build/libs`に置かれていたとすると、環境変数をそれに応じて設定することでコンパイラがそこにライブラリを探索しに行くように伝えることができます。
