---
subtitle: OpenSUSE への
---

OpenSUSE では、Zypper を使って公式の rpm パッケージからインストールできます。
[Snapcraft](#snapcraft) も使えます。

## リポジトリの設定

まず、署名用のキーを追加します。

<div class="code_section">
{% highlight bash %}
rpm --import https://dist.crystal-lang.org/rpm/RPM-GPG-KEY
{% endhighlight bash %}
</div>

次に Zypper のリポジトリを設定します。

<div class="code_section">
{% highlight bash %}
sudo zypper ar -e -f -t rpm-md https://dist.crystal-lang.org/rpm/ Crystal
{% endhighlight bash %}
</div>

## インストール

リポジトリの設定が完了すれば、Crystal はインストールできます。

<div class="code_section">
{% highlight bash %}
sudo zypper install crystal
{% endhighlight bash %}
</div>

## アップグレード

新しい Crystal のバージョンがリリースされたら、このようにしてアップグレードできます。

<div class="code_section">
{% highlight bash %}
sudo zypper update crystal
{% endhighlight bash %}
</div>

{% include install_from_snapcraft.md distro='opensuse' %}
