## Linuxbrew を使う

[Linuxbrew](https://linuxbrew.sh) がインストールされていれば、Crystal をインストールする準備は万端です。

<div class="code_section">{% highlight bash %}
brew update
brew install crystal-lang
{% endhighlight bash %}</div>

言語にコントリビュートするつもりであれば、同時に LLVM もインストールしておくとよいでしょう。その場合、最後の行を以下の通りに変更してください。

<div class="code_section">{% highlight bash %}
brew install crystal-lang --with-llvm
{% endhighlight bash %}</div>
