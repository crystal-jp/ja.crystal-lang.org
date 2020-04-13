---
subtitle: On macOS
---

To easily install Crystal on macOS you can use [Homebrew](http://brew.sh/).

<div class="code_section">{% highlight bash %}
brew update
brew install crystal
{% endhighlight bash %}</div>

You should be able to install the latest version from homebrew. Crystal's core-team help maintain that formula.

Alternative there are `.tar.gz` and `.pkg` files in each [release](https://github.com/crystal-lang/crystal/releases) targeted for darwin. See [Install from a tar.gz](/install/from_targz)

## Upgrade

新しいバージョンの Crystal がリリースされた場合には、以下でアップグレードすることが可能です。

<div class="code_section">{% highlight bash %}
brew update
brew upgrade crystal
{% endhighlight bash %}</div>

## Troubleshooting

### On macOS 10.11 (El Capitan)

以下のエラーが発生することがあります。

<div class="code_section">{% highlight txt %}
ld: library not found for -levent
{% endhighlight txt %}</div>

この場合、Command Line Tools を再インストールした後、デフォルトのツールチェインを選択する必要がありあります。

<div class="code_section">{% highlight bash %}
xcode-select --install
xcode-select --switch /Library/Developer/CommandLineTools
{% endhighlight bash %}</div>

### On macOS 10.14 (Mojave)

以下のエラーが発生することがあります。

<div class="code_section">{% highlight txt %}
ld: library not found for -lssl (this usually means you need to install the development package for libssl)
{% endhighlight txt %}</div>

you may need to install OpenSSL and link pkg-config to OpenSSL:

<div class="code_section">{% highlight bash %}
brew install openssl
export PKG_CONFIG_PATH=$PKG_CONFIG_PATH:/usr/local/opt/openssl/lib/pkgconfig
{% endhighlight bash %}</div>

As with other keg-only formulas there are some caveats shown in `brew info <formula>` that shows how to link `pkg-config` with this library.

The Crystal compiler will by default use `pkg-config` to find the locations of libraries to link with.
