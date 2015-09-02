# Debian や Ubuntu

Debian 系のディストリビューションでは、公式の Crystal リポジトリを利用してインストールすることができます。

## リポジトリの設定

まずは、公式の Crystal リポジトリを追加するために Apt を構成します。簡単にその設定を行うためのスクリプトを用意していますので、以下のコマンドをそのまま実行してください。

```
  curl http://dist.crystal-lang.org/apt/setup.sh | sudo bash
```

これで、署名用のキーとリポジトリの設定が追加されます。もし手動で構成したいのであれば、以下の操作を実行してください。

```
apt-key adv --keyserver keys.gnupg.net --recv-keys 09617FD37CC06B54
echo "deb http://dist.crystal-lang.org/apt crystal main" > /etc/apt/sources.list.d/crystal.list
```

## インストール
リポジトリの構成が完了すると、Crystal をインストールすることができます。

```
sudo apt-get install crystal
```

## アップグレード

新しいバージョンの Crystal がリリースされた場合には、以下でアップグレードすることが可能です。

```
sudo apt-get update
sudo apt-get install crystal
```
