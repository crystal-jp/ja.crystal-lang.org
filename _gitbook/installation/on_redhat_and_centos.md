# RedHat や CentOS

RedHat 系のディストリビューションでは、公式の Crystal リポジトリを利用してインストールすることができます。

## リポジトリの設定

まずは、公式の Crystal リポジトリを追加するために Yum を構成します。簡単にその設定を行うためのスクリプトを用意していますので、以下のコマンドをそのまま実行してください。

```
  curl http://dist.crystal-lang.org/rpm/setup.sh | sudo bash
```

これで、署名用のキーとリポジトリの設定が追加されます。もし手動で構成したいのであれば、以下の操作を実行してください。

```
rpm --import http://dist.crystal-lang.org/rpm/RPM-GPG-KEY

cat > /etc/yum.repos.d/crystal.repo <<END
[crystal]
name = Crystal
baseurl = http://dist.crystal-lang.org/rpm/
END
```

## インストール
リポジトリの構成が完了すると、Crystal をインストールすることができます。

```
sudo yum install crystal
```

## アップグレード

新しいバージョンの Crystal がリリースされた場合には、以下でアップグレードすることが可能です。

```
sudo yum update crystal
```
