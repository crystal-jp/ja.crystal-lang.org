## Crystal 公式の rpm リポジトリ

To install latest stable Crystal release from the official Crystal repository hosted on the [Open Build Service](https://build.opensuse.org) run in your command line:

<div class="code_section">
{% highlight bash %}
curl -fsSL https://crystal-lang.org/install.sh | sudo bash
{% endhighlight bash %}
</div>

インストールスクリプトはその他のチャンネルのリリースをインストール、もしくは更新するためのオプション引数を受け付けます。

- `--crystal` 引数に `major.minor.patch`、`major.minor` もしくは `major.minor.patch-iteration` の形式でバージョンを指定できます。
- `--channel` 引数では、`stable`、`unstable`、もしくは`nightly` の値を指定できます、

<div class="code_section">
{% highlight bash %}
curl -fsSL https://crystal-lang.org/install.sh | sudo bash -s -- --channel=nightly
{% endhighlight bash %}
</div>

より詳細な情報はこの[告知記事](/2021/04/30/new-apt-and-rpm-repositories.html)を参照してください。

### マニュアルセットアップ

Insert your distribution name and release as `{REPOSITORY}` in the following script and you are all set.
You can find available options on the [installation page at OBS](https://software.opensuse.org/download.html?project=devel%3Alanguages%3Acrystal&package=crystal).

<div class="code_section">
{% highlight bash %}
cat > /etc/yum.repos.d/crystal.repo &lt;&lt;END
[crystal]
name=Crystal
type=rpm-md
baseurl=https://download.opensuse.org/repositories/devel:languages:crystal/{REPOSITORY}/
gpgcheck=1
gpgkey=https://download.opensuse.org/repositories/devel:languages:crystal/{REPOSITORY}/repodata/repomd.xml.key
enabled=1
END

{% endhighlight bash %}
</div>

リポジトリの設定が完了すれば、Crystal がインストールできます。

<div class="code_section">
{% highlight bash %}
sudo yum install crystal
{% endhighlight bash %}
</div>

新しいバージョンの Crystal がリリースされた場合には、以下でアップグレードすることが可能です。

<div class="code_section">
{% highlight bash %}
sudo yum update crystal
{% endhighlight bash %}
</div>
