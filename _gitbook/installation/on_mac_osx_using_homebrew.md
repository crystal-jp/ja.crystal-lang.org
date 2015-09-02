# Mac OS X (Homebrew を利用)

Mac に Crystal をインストールする場合、[Homebrew](http://brew.sh/) の [tap](https://github.com/Homebrew/homebrew/wiki/brew-tap) を用意しているので、それを利用すると簡単です。

```
brew tap manastech/crystal
brew update
brew install crystal-lang
```

もしプロジェクトにコントリビュートしたいのであれば、同時に LLVM もインストールしておくとよいでしょう。その場合、最後の行を以下の通りに変更してください。

```
brew install crystal-lang --with-llvm
```
