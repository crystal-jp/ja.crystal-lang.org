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

## OSX 10.11 (El Capitan) での注意

以下のエラーが発生することがあります。

```
ld: library not found for -levent
```

この場合、Command Line Tools を再インストールした後、デフォルトのツールチェインを選択する必要がありあります。

```
$ xcode-select --install
$ xcode-select --switch /Library/Developer/CommandLineTools
```
