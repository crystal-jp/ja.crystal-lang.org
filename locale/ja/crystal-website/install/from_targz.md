---
subtitle: From tar.gz
---

Crystal をスタンドアローンの `.tar.gz` ファイルからインストールすることができます。

最新のファイルは [GitHub のリリースページ](https://github.com/crystal-lang/crystal/releases)から入手できます。

それぞれのプラットフォームに合わせて適切なファイルをダウンロードして展開してください。その中に、`bin/crystal` という実行可能ファイルが含まれています。

実行ファイルに対して、パスの通った場所のシンボリックを貼っておけば、より簡単に利用することができるでしょう。

```bash
ln -s /full/path/to/bin/crystal /usr/local/bin/crystal
```

こうしておけば、次のようにするだけでコンパイラを実行できます。

```bash
crystal --version
```
