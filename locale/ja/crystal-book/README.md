# プログラミング言語 Crystal

本ドキュメントは「Crystal」というプログラミング言語について記載するものです。

Crystal は次の目標を掲げるプログラミング言語です。

* Rubyのような構文を持つ (しかし互換性は目標ではない)。
* 静的に型チェックがされる。しかし変数やメソッドの引数に型を明示する必要はない。
* Crystalでバインディングを書くことでC言語のコードを呼び出せる。
* コンパイル時評価が出来て、ボイラープレートを消し去るためコンパイル時にコード生成ができる。
* 効率的なネイティブコードにコンパイルする。

**Crystal の標準ライブラリのドキュメントは [API ドキュメント](https://crystal-lang.org/api)にあります。**

## このリファレンスへの貢献方法

助けを求める人のことを考えていますか？　バグ、もしくはより詳細な説明の必要なセクションを見つけたのなら、この言語リファレンスへ貢献することを歓迎します。Pull Requestはこれらのリポジトリに投稿してください:
(オリジナル) https://github.com/crystal-lang/crystal-book, (この翻訳) https://github.com/crystal-jp/ja.crystal-lang.org

貢献よろしくお願いします!

### ローカルでのビルドとサーバーの起動方法

```console
$ git clone https://github.com/crystal-lang/crystal-book
$ cd crystal-book
```

ライブプレビューを実行 (http://127.0.0.1:8000):

```console
$ make serve
INFO    -  Building documentation...
INFO    -  Cleaning site directory
INFO    -  Documentation built in 3.02 seconds
INFO    -  Serving on http://127.0.0.1:8000
...
```

`site` ディレクトリにビルド (いくつかの機能はファイルをローカルで開いていると動作しません):

```console
$ make build
```

### ページの追加方法

ページを追加する場合、Markdown ファイルを希望の場所に配置してください。そして、言語リファレンスのナビゲーションである`SUMMARY.md`にリンクを追加してください。
