---
subtitle: From tar.gz
---

You can download Crystal in a standalone `.tar.gz` file with everything you need to get started.

The latest files can be found on the [Releases page at GitHub](https://github.com/crystal-lang/crystal/releases).

それぞれのプラットフォームに合わせて適切なファイルをダウンロードして展開してください。Inside it you will have a `bin/crystal` executable.

実行ファイルに対して、パスの通った場所のシンボリックを貼っておけば、より簡単に利用することができるでしょう。

<div class="code_section">{% highlight bash %}
ln -s [full path to bin/crystal] /usr/local/bin/crystal
{% endhighlight bash %}</div>

Then you can invoke the compiler by just typing:

<div class="code_section">{% highlight bash %}
crystal --version
{% endhighlight bash %}</div>
