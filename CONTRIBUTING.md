# Contribution Guide

このリポジトリへのコントリビュート (貢献) 方法についてのガイドです。

**注意**: 翻訳に参加したい場合はこの文章を必ず一読してください。

## このリポジトリについて

このリポジトリの構造は以下のようになっています。

  - `i18n/`: OmegaTのプロジェクトが格納されたディレクトリ
  - `locale/`: 翻訳元/翻訳後のファイルが格納されたディレクトリ
    - `en/`: 翻訳元のディレクトリ
    - `ja/`: 翻訳後のディレクトリ

また、`en/`ディレクトリと`ja/`ディレクトリにはそれぞれ、次のようなディレクトリがあります。

  - `crystal-book`: [言語リファレンス](https://ja.crystal-lang.org/reference)に対応するディレクトリ
  - `crystal-website`: [トップページ](https://ja.crystal-lang.org)やブログ記事などに対応するディレクトリ

**注意**: これらのディレクトリにあるファイルに対して、原則として直接の編集は行なわないでください。
         このリポジトリのほとんどのファイルはOmegaTや`make`などのツール・コマンドを介して更新されています。

## このリポジトリのクローン

このリポジトリは`git`のサブモジュールを使っています。
なので`--recursive`オプションをつけてクローンすることをオススメします。

```console
$ git clone --recursive https://github.com/crystal-jp/ja.crystal-lang.org
$ cd ja.crystal-lang.org
```

もし`--recursive`オプションをつけ忘れた場合は`git submodule update --init`としてもサブモジュールを取得できます。

## ローカル環境でのプレビュー方法

### crystal-book

静的サイトジェネレータとして[GitBook](https://gitbook.com)を利用しています。
GitBookはMarkdownでドキュメントを記述できるツールです。詳細は[GitBookのドキュメント](https://docs.gitbook.com)を確認してください。

GitBookを利用するにはCLIツールをインストールする必要があります。
`npm`コマンドが使える環境で、以下のコマンドを実行してください。

```console
$ npm install -g gitbook-cli
```

これで`gitbook`コマンドが利用できるようになります。

(`npm install -g`をするのが嫌な場合はインストールをせず、`gitbook`コマンドの代わりに`npx -p gitbook-cli gitbook`とすることもできます。)

次にGitBookのプラグイン等をインストールします。

```console
$ cd locale/ja/crystal-book # ディレクトリの移動
$ gitbook install
```

最後に、プレビュー用のサーバーを起動します。
最初にビルドをするので、サーバーが立ち上がるまで少し時間がかかるのに注意してください。

```console
$ gitbook serve
```

`Serving book on http://localhost:4000`と出たらブラウザで<http://localhost:4000/>を開くとプレビューが見れるはずです。
一度`gitbook serve`を実行すると、`locale/ja/crysta-book`以下のファイルが更新される度に再度ビルドが行なわれ、自動で内容が更新されるようになっています。

以降、依存関係等の更新が無ければ、最後の`gitbook serve`を実行するだけでプレビューができます。

(`crystal-book`の`README.md`には`docker-compose`を利用する方法も説明されていますが、この方法はファイルを更新したときに安定しないので個人的にはオススメしません)

### crystal-website

静的サイトジェネレータとして[Jekyll](https://jekyllrb.com)を利用しています。
JekyllはRubyで書かれた静的サイトジェネレータです。詳細は公式サイトを確認してください。

こちらはプレビューに`docker-compose`を使っても問題が起きづらいので、その方法で説明します。
次のコマンドを実行してください。

```console
$ cd locale/ja/crystal-website # ディレクトリの移動
$ docker-compose up
```

これでしばらく待つと`Server address: http://0.0.0.0:4000`という表示が出るので、ブラウザで<http://localhost:4000>を開くとプレビューが見れます。
こちらも`locale/ja/crystal-website`以下のファイルが更新されると自動で再度をビルドを行います。

## 翻訳の仕方

### OmegaTのセットアップ

翻訳には[OmegaT](https://omegat.org/ja/)というソフトウェアを利用しています。
またOmegaTにいくつかのプラグインを導入する必要があります。
その方法を説明していきます。

まずOmegaTをインストールしてください。
筆者はバージョン4.3.2 (6a661c5e0) というバージョンのOmegaTを利用しています。
なるべく、このバージョンに近いOmegaTをインストールしてください。

(Homebrewであれば`brew cask install omegat`でインストールできます)

次にMarkdownを翻訳するために必要なプラグインである[Okapi Filters Plugin for OmegaT](https://okapiframework.org/wiki/index.php?title=Okapi_Filters_Plugin_for_OmegaT)をインストールします。
基本的には「[Download and Installation](https://okapiframework.org/wiki/index.php?title=Okapi_Filters_Plugin_for_OmegaT#Download_and_Installation)」の内容に従えばよいです。

  1. [Okapi Filter Pluginのリリースページ](https://bintray.com/okapi/Distribution/OmegaT_Plugin)からバージョン1.7-1.39のzipファイルをダウンロードしてください。
     (`okapiFiltersForOmegaT-1.7-1.39-dist.zip`という名前です)
  2. ダウンロードしてきたzipファイルを解凍して、その中にあるjarファイル(`okapiFiltersForOmegaT-1.7-1.39.jar`)をOmegaTの設定ファイルのあるディレクトリに配置します。
     設定ファイルのあるディレクトリはWindowsであれば`<OmegaTをインストールしたディレクトリ>/plugins`、macOSであれば`~/Library/Preferences/OmegaT/plugins`です。

### 翻訳元ファイルのコピー

重複したファイルをリポジトリに入れることを避けるため、翻訳プロジェクトには翻訳対象のファイルは含まれていません。
次のコマンドを実行して、翻訳元から`i18n/source`ディレクトリに翻訳対象のファイルをコピーする必要があります。

```console
$ make i18n/source
```

このコマンドによって`locale/en`以下の翻訳対象のファイルが`i18n/source`ディレクトリ以下にコピーされて、OmegaTで開いた際の翻訳対象に含まれるようになります。

ここまで来ればOmegaTでこのプロジェクトを開くことができるはずです。
OmegaTのメニューから「プロジェクト > 開く」でこのリポジトリの`i18n`ディレクトリを指定するか、macOSであれば`open -a OmegaT i18n`などと実行して、OmegaTでこのプロジェクトを開いてみてください。

OmegaTの具体的な使い方は各自調べてください。

### Pull Request

あるファイルに対して翻訳が完了したら、OmegaTでプロジェクトを保存したのち、「プロジェクト > 訳文ファイルを生成」を実行してください。
これを実行することで、`i18n/target`に翻訳結果のファイルが生成されます。

そして、次のコマンドを実行することで、翻訳結果のファイルが`locale/ja`以下にコピーされます。

```console
$ make locale/ja
```

この後は、通常Gitを使うように`git switch`、`git add`、`git commit`して、自分のForkしたリポジトリに向かって`git push`してください。

```console
$ git switch -c feat/translate-xxx
$ git add i18n locale/ja/
$ git commit -m "feat: translate xxx"
$ git push fork feat/translate-xxx
```

その後、GitHubでPull Requestを作成してください。
