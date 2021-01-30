## Crystal 公式の rpm リポジトリ

[Bintray](https://bintray.com/beta/#/crystal/rpm?tab=packages) でホストされている Crystal 公式のリポジトリから最新の安定板の Crystal のリリースをインストールするには、コマンドラインで次のように入力してください。

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

より詳細な情報はこの[告知記事](/2020/08/24/announcing-new-apt-and-rpm-repositories.html)を参照してください。

### マニュアルセットアップ

リポジトリの URL は `https://dl.bintray.com/crystal/rpm/{DISTRO}/{ARCH}/{CHANNEL}` です。

- 有効な `{DISTRO}` の値は `el6` と `all` となります。
- この rpm では `{ARCH}` としては `x86_64` のみをサポートしています。
- 有効な `{CHANNEL}` の値は `stable`、`unstable`、もしくは `nightly` です。

希望の値で次のスクリプトの `{DISTRO}` と `{CHANNEL}` を置き換えることで、設定できます。

<div class="code_section">
{% highlight bash %}
cat > /etc/yum.repos.d/crystal.repo &lt;&lt;END
[crystal]
name=Crystal
baseurl=https://dl.bintray.com/crystal/rpm/{DISTRO}/x86_64/{CHANNEL}
gpgcheck=0
repo_gpgcheck=1
gpgkey=http://bintray.com/user/downloadSubjectPublicKey?username=bintray
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
