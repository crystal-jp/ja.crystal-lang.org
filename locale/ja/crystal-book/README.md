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

```
$ git clone https://github.com/crystal-lang/crystal-book.git
$ cd crystal-book
$ npm install -g gitbook-cli@2.3.0
$ npm install
$ gitbook install
$ gitbook serve
Live reload server started on port: 35729
Press CTRL+C to quit ...

info: 8 plugins are installed
info: loading plugin "ga"... OK
...
Starting server ...
Serving book on http://localhost:4000

```

HTML の出力は`_book`ディレクトリになります (一部のリンクはローカルでは上手く開けません)。
依存関係をシステム全体にインストールしないで、Docker 環境を利用することもできます。

```
$ docker-compose up
...
gitbook_1  | Starting server ...
gitbook_1  | Serving book on http://localhost:4000
gitbook_1  | Restart after change in file node_modules/.bin
...
```

### ページの追加方法

ページを追加する場合、Markdown ファイルを希望の場所に配置してください。例: `overview/hello_world.md`。そして、言語リファレンスのナビゲーションである`SUMMARY.md`にリンクを追加してください。
