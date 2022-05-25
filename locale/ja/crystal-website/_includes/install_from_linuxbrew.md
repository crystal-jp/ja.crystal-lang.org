## Linuxbrew を使う

If you have [Linuxbrew](https://docs.brew.sh/Homebrew-on-Linux) installed you're ready to install Crystal:

```bash
brew update
brew install crystal-lang
```

言語にコントリビュートするつもりであれば、同時に LLVM もインストールしておくとよいでしょう。その場合、最後の行を以下の通りに変更してください。

```bash
brew install crystal-lang --with-llvm
```
