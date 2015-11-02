# Mac OS X (Homebrew を利用)

[Homebrew](http://brew.sh/) を利用すると、簡単に Mac に Crystal をインストールすることができます。

```
brew update
brew install crystal-lang
```

もしプロジェクトにコントリビュートしたいのであれば、同時に LLVM もインストールしておくとよいでしょう。その場合、最後の行を以下の通りに変更してください。

```
brew install crystal-lang --with-llvm
```
