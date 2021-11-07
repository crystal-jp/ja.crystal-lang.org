---
subtitle: On OpenBSD
---

OpenBSD includes the Crystal compiler in the ports tree, starting from version OpenBSD 6.4.

Currently, it is only available for the `amd64` platform.

## パッケージのインストール

Crystal はコンパイル済みのパッケージとして有効です。ですが、それは一番最近のバージョンではないかもしれません。The package also includes `shards`.

<div class="code_section">
{% highlight bash %}
doas pkg_add crystal
{% endhighlight bash %}
</div>

## port によるインストール

Crystal を自身でビルドする場合は、ports ツリーによるインストールが有効です。

If the ports collection is not already installed, instructions to installing it can be found in the [OpenBSD Ports guide](https://www.openbsd.org/faq/ports/ports.html).

<div class="code_section">
{% highlight bash %}
cd /usr/ports/lang/crystal
doas make clean install
{% endhighlight bash %}
</div>

To avoid building dependencies from source (which can take a long time), you can first install them from binary packages:

<div class="code_section">
{% highlight bash %}
doas pkg_add llvm libiconv boehm-gc libevent2 pcre libyaml
{% endhighlight bash %}
</div>
