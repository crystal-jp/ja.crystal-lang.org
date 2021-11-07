---
subtitle: ソースコードからの
---

もしコントリビュートしたいと考えているのであれば、Crystal をソースコードからインストールしたくなることと思います。

1. [最新のリリースの Crystal をインストールしてください](/install)。Crystal をコンパイルするには、Crystal 自身が必要なのです。

2. サポートしているバージョンの LLVM にパスが通っているか確認してください。When possible, use [the latest supported version](https://github.com/crystal-lang/crystal/blob/master/src/llvm/ext/llvm-versions.txt).

3. そして、[すべての必要なライブラリ (英語)](https://github.com/crystal-lang/crystal/wiki/All-required-libraries) がインストールされていることを確認してください。また、[コントリビューションガイド (英語)](https://github.com/crystal-lang/crystal/blob/master/CONTRIBUTING.md) にも目を通しておくとよいでしょう。

4. リポジトリをクローンしてください。 `git clone https://github.com/crystal-lang/crystal`

5. `make` を実行してコンパイラをビルドします。

6. `make std_spec compiler_spec` を実行して、spec をパスして正しくインストールできていることを確認してください。

7. これで、`bin/crystal` が Crystal ファイルの実行に使えるようになります。

`bin/crystal` コマンドについてより詳しい情報が必要な場合は、ドキュメントの[コンパイラの使い方](https://ja.crystal-lang.org/reference/using_the_compiler/)を参照してください。

注意: 実際にビルドされたバイナリは `.build/crystal` に置かれています。ですが、 `bin/crystal` ラッパースクリプトを Crystal の実行に使うべきです。
