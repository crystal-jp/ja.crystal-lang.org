---
subtitle: FreeBSD への
---

FreeBSD では、バージョン 11.0 から Crystal のコンパイラが ports ツリーに含まれています。

今のところは、`aarch64` と `amd64` のプラットフォームでのみ有効です。

FreeBSD 上で `--release` フラグをつけて Crystal のコードをビルドする際は、`--no-debug` フラグをつけて LLVM の警告が出ないようにする必要があります。

## パッケージのインストール

Crystal はコンパイル済みのパッケージとして有効です。ですが、それは一番最近のバージョンではないかもしれません。


<div class="code_section">
{% highlight bash %}
sudo pkg install -y crystal shards
{% endhighlight bash %}
</div>

`-RELEASE` バージョンの FreeBSD であれば、デフォルトで `pkg` は `quarterly` パッケージセットに設定されています。これは各クオーター毎に更新されます (セキュリティパッケージを除いて)。

クオーター毎の更新を `latest` に切り替えるには、`/usr/local/etc/pkg/repos/FreeBSD.conf` を次の内容で作成します。


<div class="code_section">
{% highlight ucl %}
FreeBSD: {
  url: "pkg+http://pkg.FreeBSD.org/${ABI}/latest"
}
{% endhighlight ucl %}
</div>

## port によるインストール

Crystal を自身でビルドする場合は、ports ツリーによるインストールが有効です。

ports コレクションをインストールしていない場合は、`portsnap fetch` か `git clone https://github.com/freebsd/freebsd-ports` でダウンロードしてください。

<div class="code_section">
{% highlight bash %}
sudo make -C/usr/ports/lang/crystal reinstall clean
sudo make -C/usr/ports/devel/shards reinstall clean
{% endhighlight bash %}
</div>

LLVM をビルドするのを避けるため (これはとても時間がかかります)、まず最初にバイナリパッケージをインストールすることができます。

<div class="code_section">
{% highlight bash %}
sudo pkg install -y llvm60
{% endhighlight bash %}
</div>

もしくは、[Synth](https://github.com/jrmarino/synth) のような賢い port ビルダーを使うこともできます。これは再ビルドが必要ない場合に、自動的に依存関係のバイナリパッケージをダウンロードしてくれます。
