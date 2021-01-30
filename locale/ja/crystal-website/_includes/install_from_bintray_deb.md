## Crystal 公式の deb リポジトリ

[Bintray](https://bintray.com/beta/#/crystal/deb?tab=packages) でホストされている Crystal 公式の deb リポジトリから最新の安定板の Crystal のリリースをインストールするには、コマンドラインで次のように入力してください。

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

`deb_distribution=all` と `deb_component` と共に選言された deb リポジトリがチャンネルに利用されます。

- 有効なチャンネル名は `stable`、`unstable`、もしくは `nightly` です。

利用したいチャンネル名で次のスクリプトの `{CHANNEL}` の置き換えることで、設定できます。

<div class="code_section">
{% highlight bash %}
echo "deb https://dl.bintray.com/crystal/deb all {CHANNEL}" | tee /etc/apt/sources.list.d/crystal.list

# リポジトリのメタデータの署名鍵 (bintray 共有の署名鍵) を追加します。
apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys 379CE192D401AB61
apt-get update
{% endhighlight bash %}
</div>

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
sudo apt install libz-dev        # for using crystal play
{% endhighlight bash %}</div>

新しいバージョンの Crystal がリリースされた場合には、以下でアップグレードすることが可能です。

<div class="code_section">
{% highlight bash %}
sudo apt update
sudo apt install crystal
{% endhighlight bash %}
</div>
