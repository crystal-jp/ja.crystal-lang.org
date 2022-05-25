---
subtitle: On macOS
---

To easily install Crystal on macOS you can use [Homebrew](http://brew.sh/).

```bash
brew update
brew install crystal
```

Homebrew で最新のバージョンの Crystal をインストールすることもできます。Crystal のコアチームが formula をメンテナンスしています。

Alternative there are `.tar.gz` and `.pkg` files in each [release](https://github.com/crystal-lang/crystal/releases) targeted for darwin. これは[tar.gz からのインストール](/install/from_targz)を参照してください。

## アップグレード

新しいバージョンの Crystal がリリースされた場合には、以下でアップグレードすることが可能です。

```bash
brew update
brew upgrade crystal
```

## トラブルシューティング

### macOS 10.14 (Mojave) での注意

以下のエラーが発生することがあります。

```text
ld: library not found for -lssl (this usually means you need to install the development package for libssl)
```

その場合 OpenSSL をインストールして pkg-config にその OpenSSL を伝える必要があります。

```bash
brew install openssl
export PKG_CONFIG_PATH=$PKG_CONFIG_PATH:/usr/local/opt/openssl/lib/pkgconfig
```

その他の keg-only な formula については、`brew info <formula>` を使うことで、どうやって `pkg-config` に情報を伝えられるか確認できます。

Crystal はデフォルトでリンクするライブラリを探すのに `pkg-config` を使います。
