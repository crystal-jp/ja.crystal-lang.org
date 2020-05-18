## Snapcraft を使う

Crystal の snap は classic な制限環境下を要求します。`snapd` がインストールしてあれば、Crystal をインストールする準備は万端です。

<div class="code_section">{% highlight bash %}
sudo snap install crystal --classic
{% endhighlight bash %}</div>

最新のバージョンを `edge` チャンネルを使ってインストールすることもできます。

<div class="code_section">{% highlight bash %}
sudo snap install crystal --classic --edge
{% endhighlight bash %}</div>

{% assign snapcraft_url = 'https://snapcraft.io/install/crystal/' | append: include.distro %}

より詳しい情報は [Crystal の snapcraft のページ ]を参照してください ({{ snapcraft_url }})
