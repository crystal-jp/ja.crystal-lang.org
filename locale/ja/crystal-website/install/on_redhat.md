---
subtitle: On Red Hat
---

In Red Hat derived distributions, you can use the official Crystal repository.
[Linuxbrew](#linuxbrew) is also available.

## Setup repository

まずは、公式の Crystal リポジトリを追加するために Yum を構成します。簡単にその設定を行うためのスクリプトを用意していますので、以下のコマンドをそのまま実行してください。

<div class="code_section">
{% highlight bash %}
curl https://dist.crystal-lang.org/rpm/setup.sh | sudo bash
{% endhighlight bash %}
</div>

これで、署名用のキーとリポジトリの設定が追加されます。もし手動で構成したいのであれば、以下の操作を実行してください。

<div class="code_section">
{% highlight bash %}
rpm --import https://dist.crystal-lang.org/rpm/RPM-GPG-KEY

cat > /etc/yum.repos.d/crystal.repo <<END
[crystal]
name = Crystal
baseurl = https://dist.crystal-lang.org/rpm/
END

{% endhighlight bash %}
</div>

## Install
Once the repository is configured you're ready to install Crystal:

<div class="code_section">
{% highlight bash %}
sudo yum install crystal
{% endhighlight bash %}
</div>

## Upgrade

新しいバージョンの Crystal がリリースされた場合には、以下でアップグレードすることが可能です。

<div class="code_section">
{% highlight bash %}
sudo yum update crystal
{% endhighlight bash %}
</div>

{% include install_from_linuxbrew.md %}
