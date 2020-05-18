---
subtitle: Debian への
---

Debian 系のディストリビューションでは、公式の Crystal リポジトリを利用してインストールすることができます。[Snapcraft](#snapcraft) や [Linuxbrew](#linuxbrew) も使えます。

## リポジトリの設定

まずは、公式の Crystal リポジトリを追加するために Apt を設定します。簡単にその設定を行うためのスクリプトを用意していますので、以下のコマンドをそのまま実行してください。

<div class="code_section">{% highlight bash %}
curl -sSL https://dist.crystal-lang.org/apt/setup.sh | sudo bash
{% endhighlight bash %}</div>

これで、署名用のキーとリポジトリの設定が追加されます。もし手動で設定したいのであれば、以下のコマンドを実行してください。

<div class="code_section">{% highlight bash %}
curl -sL "https://keybase.io/crystal/pgp_keys.asc" | sudo apt-key add -
echo "deb https://dist.crystal-lang.org/apt crystal main" | sudo tee /etc/apt/sources.list.d/crystal.list
sudo apt-get update
{% endhighlight bash %}</div>

## インストール

リポジトリの設定が完了すれば、Crystal がインストールできます。

<div class="code_section">{% highlight bash %}
sudo apt install crystal
{% endhighlight bash %}</div>

次のパッケージは必ずしも必要なわけではありません。ですが、標準ライブラリの対応する機能を利用するのであればインストールを推奨します。

<div class="code_section">{% highlight bash %}
sudo apt install libssl-dev      # for using OpenSSL
sudo apt install libxml2-dev     # for using XML
sudo apt install libyaml-dev     # for using YAML
sudo apt install libgmp-dev      # for using Big numbers
sudo apt install libreadline-dev # for using Readline
sudo apt install libz-dev        # for using crystal play
{% endhighlight bash %}</div>

## アップグレード

新しいバージョンの Crystal がリリースされた場合には、以下でアップグレードすることが可能です。

<div class="code_section">{% highlight bash %}
sudo apt update
sudo apt install crystal
{% endhighlight bash %}</div>

{% include install_from_snapcraft.md distro="debian" %}
{% include install_from_linuxbrew.md %}

