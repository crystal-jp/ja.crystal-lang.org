---
subtitle: macOS への
---

[Homebrew](http://brew.sh/) を利用すると、簡単に macOS に Crystal をインストールできます。

<div class="code_section">{% highlight bash %}
brew update
brew install crystal
{% endhighlight bash %}</div>

Homebrew で最新のバージョンの Crystal をインストールすることもできます。Crystal のコアチームが formula をメンテナンスしています。

あるいは darwin 向けの `.tar.gz` や `.pkg` ファイルが各[リリース](https://github.com/crystal-lang/crystal/releases)毎に用意されています。これは[tar.gz からのインストール](/install/from_targz)を参照してください。

## アップグレード

新しいバージョンの Crystal がリリースされた場合には、以下でアップグレードすることが可能です。

<div class="code_section">{% highlight bash %}
brew update
brew upgrade crystal
{% endhighlight bash %}</div>

## トラブルシューティング

### macOS 10.14 (Mojave) での注意

以下のエラーが発生することがあります。

<div class="code_section">{% highlight txt %}
ld: library not found for -lssl (this usually means you need to install the development package for libssl)
{% endhighlight txt %}</div>

その場合 OpenSSL をインストールして pkg-config にその OpenSSL を伝える必要があります。

<div class="code_section">{% highlight bash %}
brew install openssl
export PKG_CONFIG_PATH=$PKG_CONFIG_PATH:/usr/local/opt/openssl/lib/pkgconfig
{% endhighlight bash %}</div>

その他の keg-only な formula については、`brew info <formula>` を使うことで、どうやって `pkg-config` に情報を伝えられるか確認できます。

Crystal はデフォルトでリンクするライブラリを探すのに `pkg-config` を使います。
