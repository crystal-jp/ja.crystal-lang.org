## Crystal 公式の deb リポジトリ

[Open Build Service](https://build.opensuse.org) でホストされている Crystal 公式の deb リポジトリから最新の安定板の Crystal のリリースをインストールするには、コマンドラインで次のように入力してください。

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

ディストリビューション名とリリース名を次のスクリプトの `{REPOSITORY}` に挿入することで、設定できます。
有効なオプションの一覧は [OBS のインストールページ](https://software.opensuse.org/download.html?project=devel%3Alanguages%3Acrystal&package=crystal) で確認できます。

<div class="code_section">
{% highlight bash %}
echo "deb http://download.opensuse.org/repositories/devel:/languages:/crystal/{REPOSITORY}/ /" | tee /etc/apt/sources.list.d/crystal.list

# 署名用の鍵の追加
curl -fsSL https://download.opensuse.org/repositories/devel:languages:crystal/{REPOSITORY}/Release.key | gpg --dearmor | sudo tee /etc/apt/trusted.gpg.d/crystal.gpg > /dev/null
{% endhighlight bash %}
</div>

リポジトリの設定が完了すれば、Crystal がインストールできます。

<div class="code_section">{% highlight bash %}
sudo apt update
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
