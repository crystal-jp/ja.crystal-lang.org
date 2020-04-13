## Linuxbrew

If you have [Linuxbrew](https://linuxbrew.sh) installed you're ready to install Crystal:

<div class="code_section">{% highlight bash %}
brew update
brew install crystal-lang
{% endhighlight bash %}</div>

If you're planning to contribute to the language itself you might find useful to install LLVM as well. その場合、最後の行を以下の通りに変更してください。

<div class="code_section">{% highlight bash %}
brew install crystal-lang --with-llvm
{% endhighlight bash %}</div>
