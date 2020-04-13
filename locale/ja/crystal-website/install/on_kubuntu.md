---
subtitle: On Kubuntu
---

In Ubuntu derived distributions, you can use the official Crystal repository. [Snapcraft](#snapcraft) and [Linuxbrew](#linuxbrew) are also available.

## Setup repository

まずは、公式の Crystal リポジトリを追加するために Apt を構成します。簡単にその設定を行うためのスクリプトを用意していますので、以下のコマンドをそのまま実行してください。

<div class="code_section">{% highlight bash %}
curl -sSL https://dist.crystal-lang.org/apt/setup.sh | sudo bash
{% endhighlight bash %}</div>

これで、署名用のキーとリポジトリの設定が追加されます。If you prefer to do it manually, execute the following commands:

<div class="code_section">{% highlight bash %}
curl -sL "https://keybase.io/crystal/pgp_keys.asc" | sudo apt-key add -
echo "deb https://dist.crystal-lang.org/apt crystal main" | sudo tee /etc/apt/sources.list.d/crystal.list
sudo apt-get update
{% endhighlight bash %}</div>

## Install

Once the repository is configured you're ready to install Crystal:

<div class="code_section">{% highlight bash %}
sudo apt install crystal
{% endhighlight bash %}</div>

The following packages are not required, but recommended for using the respective features in the standard library:

<div class="code_section">{% highlight bash %}
sudo apt install libssl-dev      # for using OpenSSL
sudo apt install libxml2-dev     # for using XML
sudo apt install libyaml-dev     # for using YAML
sudo apt install libgmp-dev      # for using Big numbers
sudo apt install libreadline-dev # for using Readline
sudo apt install libz-dev        # for using crystal play
{% endhighlight bash %}</div>

## Upgrade

新しいバージョンの Crystal がリリースされた場合には、以下でアップグレードすることが可能です。

<div class="code_section">{% highlight bash %}
sudo apt update
sudo apt install crystal
{% endhighlight bash %}</div>

{% include install_from_snapcraft.md distro="kubuntu" %}
{% include install_from_linuxbrew.md %}
