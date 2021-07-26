# shard の作り方

ここでは Crystal の shard の作り方とリリース方法について説明します。

## _shard とは？_

簡単に言うと、shard とは Crystal のコードのパッケージで、他のプロジェクトとコードを共有したり他のプロジェクトのコードを使ったりできます。

詳しくは [shards コマンド](../the_shards_command/README.md)の章を参照してください。

## 導入

このチュートリアルでは、_palindrome-example_ という Crystal のライブラリを作ります。

> 知らない方のために説明すると、palindrome (回文) というのは前から読んでも後ろから読んでも同じになるような語のことです。例えば、 racecar や mom、dad、kayak、madam などの単語が挙げられます。

### 必要なもの

Crystal の shard をリリースするために、そしてこのチュートリアルを続けていくためには、次のものが必要です。

* [Crystal のコンパイラ](../using_the_compiler/README.md)が動作するようにインストールされていること
* [Git](https://git-scm.com) が動作するようにインストールされていること
* [GitHub](https://github.com) もしくは [GitLab](https://gitlab.com/) のアカウント

### プロジェクトの作成

[Crystal のコンパイラ](../using_the_compiler/README.md) の `init lib` コマンドを使って、標準的なディレクトリ構造を持った Cryatal ライブラリのディレクトリを作成してください。

ターミナルで、次のように実行します: `crystal init lib <YOUR-SHARD-NAME>`

例:

```console
$ crystal init lib palindrome-example
    create  palindrome-example/.gitignore
    create  palindrome-example/.editorconfig
    create  palindrome-example/LICENSE
    create  palindrome-example/README.md
    create  palindrome-example/.travis.yml
    create  palindrome-example/shard.yml
    create  palindrome-example/src/palindrome-example.cr
    create  palindrome-example/src/palindrome-example/version.cr
    create  palindrome-example/spec/spec_helper.cr
    create  palindrome-example/spec/palindrome-example_spec.cr
Initialized empty Git repository in /<YOUR-DIRECTORY>/.../palindrome-example/.git/
```

こうしたら、`cd` で作ったディレクトリに移動してください。

例:

```bash
cd palindrome-example
```

そして、`add` と `commit` をして、ファイルを Git にトラッキングされるようにしましょう。

```console
$ git add -A
$ git commit -am "First Commit"
[master (root-commit) 77bad84] First Commit
10 files changed, 102 insertions(+)
create mode 100644 .editorconfig
create mode 100644 .gitignore
create mode 100644 .travis.yml
create mode 100644 LICENSE
create mode 100644 README.md
create mode 100644 shard.yml
create mode 100644 spec/palindrome-example_spec.cr
create mode 100644 spec/spec_helper.cr
create mode 100644 src/palindrome-example.cr
create mode 100644 src/palindrome-example/version.cr
```

### コードを書く

どんなコードを書こうとも自由ですが、どのようなコードを書いたかは、そのライブラリを使おうとしている、もしくはライブラリにコントリビュートしたいという人にとって影響のあることです。

#### コードのテスト

- コードのテストを書きましょう。それがすべてです。人々 (あなたを含む) にとって、テストだけがどのように機能するものなのかを示すものになります。
- Crystal は[ビルトインのテストライブラリ](https://crystal-lang.org/api/latest/Spec.html)を持っています。それを使ってください。

#### ドキュメント化

- コメントでコードをドキュメント化してください。それがすべてです。private なメソッドでもドキュメントを書きましょう。
- Crystal は[組み込みのドキュメントジェネレータ](../syntax_and_semantics/documenting_code.md)を持っています。それを使ってください。

`crystal docs` を実行することで、コードのコメントを API ドキュメントに変換できます。`/docs/` ディレクトリのファイルを Web ブラウザで開くことで、生成されたドキュメントがどのようなものか確認できます。

以降で、コンパイラが生成したドキュメントを GitHub や GitLab でホスティングする方法が説明されています。

ドキュメントのホスティングが完了したら、その存在を報せるためにリポジトリにドキュメンテーションバッジを追加するといいでしょう。GitLab では以降で説明する方法で、このバッジをプロジェクトに設定することができます。GitHub では README.md に次のように追加します。
(`<LINK-TO-YOUR-DOCUMENTATION>` を自分のものに置き換えることを忘れないでください

```markdown
[![Docs](https://img.shields.io/badge/docs-available-brightgreen.svg)](<LINK-TO-YOUR-DOCUMENTATION>)
```

### README を書く

良い README があるかどうかはプロジェクトの成功を左右します。
[Awesome README](https://github.com/matiassingers/awesome-readme) はこの話題の素晴らしい例やリソースのキュレーテッドリストになっています。

最も重要なことですが、README では次のことが説明されているべきでしょう。

1. このライブラリが何なのか
2. 何をするものなのか
3. どのようにして使うのか

この説明にはいくつかの例を適切に章立てして含めるべきです。

!!!note
Crystal の生成した README のテンプレート中の `[your-github-name]` という部分を実際の GitHub もしくはl GitLab のユーザ名で置換するのを忘れないでください。また GitLab を使っている場合は、`github` を `gitlab` に変更してください。

#### コーディングスタイル

- 自身のスタイルを持つことは良いことですが、[Crystal チームの慣習的なスタイル](../conventions/coding_style.md)に従うことで、コードの一貫性や可読性を保ち、他の開発者の理解しやすいものにできます。
- Crystal [組み込みのフォーマッタ](../syntax_and_semantics/documenting_code.md)を活用して、すべての `.cr` ファイルをフォーマットしましょう。

例:

```
crystal tool format
```

`--check` をコマンドの末尾につけることで、コードが正しくフォーマットされているかを確かめる、要するにフォーマッタがコードを変更しないことを確かめられます。

例:

```
crystal tool format --check
```

この確認を[継続的インテグレーション](ci/README.md)の1ステップとして追加すると良いでしょう。

### `shard.yml` を書く

[仕様書](https://github.com/crystal-lang/shards/blob/master/docs/shard.yml.adoc)を確認してください。これに従いましょう。

#### 名前

`shard.yml`ので `name` プロパティは簡潔かつ説明的なものにすべきです。

- [crystalshards.xyz](https://crystalshards.xyz/) で検索して、既に使われている名前でないか確認しておきましょう。

例:

```yaml
name: palindrome-example
```

#### 説明

`description` を `shard.yml` に追加しましょう。

`description` は1行の説明文で、検索の際に使われます。

description は次のようにすべきです。

1. 有益な情報を含む
2. 発見可能なものにする

#### 最適化

見つけられるものでなければ、誰もあなたのプロジェクトを利用しないでしょう。
今のところ、[crystalshards.xyz](https://crystalshards.xyz/) に Crystal のライブラリは集約されています。なので、ここに向けて最適化します。

_精確な_機能からライブラリを探す人と、_一般的な_機能からライブラリを探す人がいます。
例えば Bob は回文を扱うライブラリを必要としていて、一方で Felipe が探しているのはテキストを扱うライブラリで、Susan が探しているのはスペルについてのライブラリ、といったように、です。

この場合、`name` にはすでに Bob の探している "palindrome" という単語が含まれています。なので _palindrome_ と繰り返す必要はないでしょう。代わりに、Susan の探している "spelling" や Felipe の探している "text" といった単語を含めるようにするといいでしょう。

```yaml
description: |
  A textual algorithm to tell if a word is spelled the same way forwards as it is backwards.
```

### ホスティング

ここからのガイドは GitHub で公開するか GitLab で公開するかによって変わってきます。それ以外の場所で公開しているのであれば、ぜひガイドを書いて、このリファレンスに追加するよう言ってください。

* [GitHub でのホスト方法](./hosting/github.md)
* [GitLab でのホスト方法](./hosting/gitlab.md)
