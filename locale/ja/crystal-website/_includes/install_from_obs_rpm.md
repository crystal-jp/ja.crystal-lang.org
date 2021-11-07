## Crystal 公式の rpm リポジトリ

[Open Build Service](https://build.opensuse.org) でホストされている Crystal 公式の deb リポジトリから最新の安定板の Crystal のリリースをインストールするには、コマンドラインで次のように入力してください。

<div class="code_section">
{% highlight bash %}
curl -fsSL https://crystal-lang.org/install.sh | sudo bash
{% endhighlight bash %}
</div>

インストールスクリプトはその他のチャンネルのリリースをインストール、もしくは更新するためのオプション引数を受け付けます。

- `--version` with `major.minor` or `latest` values
- `--channel` 引数では、`stable`、`unstable`、もしくは`nightly` の値を指定できます、

<div class="code_section">
{% highlight bash %}
curl -fsSL https://crystal-lang.org/install.sh | sudo bash -s -- --channel=nightly
{% endhighlight bash %}
</div>

より詳細な情報はこの[告知記事](/2021/04/30/new-apt-and-rpm-repositories.html)を参照してください。

### マニュアルセットアップ

ディストリビューション名とリリース名を次のスクリプトの `{REPOSITORY}` に挿入することで、設定できます。
有効なオプションの一覧は [OBS のインストールページ](https://software.opensuse.org/download.html?project=devel%3Alanguages%3Acrystal&package=crystal) で確認できます。

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
