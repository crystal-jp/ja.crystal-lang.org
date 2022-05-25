## Snapcraft を使う

Crystal の snap は classic な制限環境下を要求します。`snapd` がインストールしてあれば、Crystal をインストールする準備は万端です。

```bash
sudo snap install crystal --classic
```

最新のバージョンを `edge` チャンネルを使ってインストールすることもできます。

```bash
sudo snap install crystal --classic --edge
```

{% assign snapcraft_url = 'https://snapcraft.io/install/crystal/' | append: include.distro %}

より詳しい情報は [Crystal の snapcraft のページ]({{ snapcraft_url }})を参照してください。
