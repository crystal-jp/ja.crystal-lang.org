# shards コマンド

Crystal には通常、依存関係管理ツールとして Shards が付随しています。

これは Crystal のプロジェクトやライブラリの依存関係を管理して、あるシステムやコンピュータのまたがって再現可能なインストールを実現します。

## インストール方法

Shards 通常であれば Crystal 自身と共に配布されています。そうでなければ、分割された`shards`パッケージがあなたのシステムでは有効かもしれません。

ソースコードからインストールするには、[リポジトリ](https://github.com/crystal-lang/shards)からソースコードをダウンロードかクローンしてきて、`make CRFLAGS=--release` を実行します。コンパイルされたバイナリは `bin/shards` にあるので、`PATH` にそれを追加してください。

## 使い方

`shards` は `shard.yml` がプロジェクトのフォルダ (現在のディレクトリ) に置いてあることを要求します。このファイルはプロジェクトの説明と、ビルドに必要な依存関係のリストを含んでいます。
デフォルトのファイルは [`shards init`](#shards-install) を実行することで生成できます。
そのファイルの内容は [*Shard の書き方*というガイド](../guides/writing_shards.md)で説明されていて、詳細な説明は[shard.yml の仕様 (英語)](https://github.com/crystal-lang/shards/blob/master/docs/shard.yml.adoc) にあります。

[`shards install`](#shards-install) を実行すると、指定された依存関係の解決とインストールが行なわれます。
`shards install` がもう一度実行されたときに同じバージョンがインストールされるために、インストールしたバージョンは `shard.lock` に書き出されます。

アプリケーションを開発しているのであれば、再現可能な依存関係のインストールを実現するために、`shard.yml` と `shard.lock` をバージョン管理下に置いてください。
他のshardから依存されるようなライブラリである場合 `shard.lock` はバージョン管理下に置くべき*ではあありません*。`shard.yml` のみを含めてください。`.gitignore` にそれを含めることをオススメします ([`crystal init`](../using_the_compiler/README.md#crystal-init) は `lib` リポジトリを初期化する際にそれを自動的に行います).

## shards コマンド

```bash
shards [<options>...] [<command>]
```

コマンドが指定されなかった場合、`install`がデフォルトでは実行されます。

* [`shards build`](#shards-build): 実行可能ファイルのビルド
* [`shards check`](#shards-check): インストールされている依存関係の検証
* [`shards init`](#shards-init): `shard.yml` を新規に生成
* [`shards install`](#shards-install): 依存関係の解決とインストール
* [`shards list`](#shards-list): インストールされた依存関係の一覧を表示
* [`shards prune`](#shards-prune): 利用されていない依存関係の削除
* [`shards update`](#shards-update): 依存関係の解決と更新
* [`shards version`](#shards-version): shard のバージョンを表示

特定のコマンドの有効なオプションを確認したい場合は、コマンド名のあとに`--help`を付けて実行してください。

**よく使うオプション:**

* `--version`: `shards`のバージョンを表示
* `-h, --help`: 使用方法をおおざっぱに表示
* `--no-color`: 色付けされた出力を無効にする
* `--production`: リリースモードで実行する。開発用の依存関係は実行されずロックされた依存関係のみがインストールされます。`shard.yml` と `shard.lock` の依存関係の同期が取れていない場合にコマンドは失敗します (`install`、`update`、`check` および `list` の場合)
* `-q, --quiet`: ログの冗長さを減らして、警告およびエラーのみを表示するようにする
* `-v, --verbose`: ログの冗長さを増して、すべてのデバッグ用のメッセージも表示するようにする

### `shards build`

```bash
shards build [<targets>] [<options>...]
```

`bin` にある指定したターゲットをビルドします。ターゲットが指定されていなければ、すべてがビルドされます。
このコマンドはビルド前に依存関係をインストールするので、`shards install` を事前に実行することは必要ではありません。

コマンドに続くすべてのオプションは `crystal build` に渡されます。

### `shards check`

```bash
shards check
```

すべての依存関係がインストールされていて、要求を満たしているか検証します。

終了コード:

* `0`: 依存関係は充足されています
* `1`: 依存関係は充足されていません

### `shards init`

```bash
shards init
```

shard用のフォルダを生成して `shard.yml` を生成します。

### `shards install`

```bash
shards install
```

依存関係を解決して、それらを `lib` にインストールします。`shard.lock` が存在しない場合、解決した依存関係、ロックしたバージョンもしくはGitコミットから生成します。

`shard.lock` がある場合は、そこからロックされたバージョンとコミットを読み込んで強制します。ロックされたバージョンが要求に一致しない場合、コマンドは失敗することがあります。しかし、衝突することなく新しい依存関係を追加できれば、新たな`shard.lock`ファイルを生成してコマンドは成功します。

### `shards list`

```bash
shards list
```

インストールされた依存関係とそれらのバージョンの一覧を表示します。

### `shards prune`

```bash
shards prune
```

使われていない依存関係をlibフォルダから削除します。

### `shards update`

```bash
shards update
```

`shard.lock` にロックされたバージョンやコミットがあるかどうかに関わらず、すべての依存関係を解決してlibフォルダの内容を再度更新します。最終的には新たな `shard.lock` を生成します。

### `shards version`

```bash
shards version [<path>]
```

shard コマンドのバージョンを表示します。
