# Getting Started

Crystal のリファレンスにようこそ！

First, let's make sure to [install the compiler](https://crystal-lang.org/install/) so that we may try all the examples listed in this book.

インストールが済んでいれば、`crystal` というコマンドでコンパイラを利用できます。

試してみましょう。

## Crystal のバージョン

コンパイラのバージョンを確認しましょう。もしコンパイラを正しくインストールできていれば、このように表示されるはずです。

```console
$ crystal --version
--8<-- "crystal-version.txt"
```

いい感じですね。

## Crystal のヘルプ

さて、コンパイラに渡すことのできるオプションのリストを表示するには、`crystal` コマンドに何も引数を渡さずに実行します。

```console
$ crystal
Usage: crystal [command] [switches] [program file] [--] [arguments]

Command:
    init                     generate a new project
    build                    build an executable
    docs                     generate documentation
    env                      print Crystal environment information
    eval                     eval code from args or standard input
    play                     starts Crystal playground server
    run (default)            build and run program
    spec                     build and run specs (in spec directory)
    tool                     run a tool
    help, --help, -h         show this help
    version, --version, -v   show version

Run a command followed by --help to see command-specific information, ex:
    crystal <command> --help
```

より詳細のコンパイラの使い方を確認したい場合は、`man crystal` を実行して man ページを見るか、このリファレンスの[コンパイラのマニュアル](../using_the_compiler/README.md)を参照してください。

## Hello Crystal

次の例は典型的な Hello World プログラムです。Crystal ではこのようになります。

```crystal title="hello_world.cr"
puts "Hello World!"
```

これを、このように実行できます。

```console
$ crystal hello_world.cr
Hello World!
```

!!!note
    メインの処理は単純にプログラム自身となります。"main" 関数のような関数を定義する必要はありません。

Next you might want to start with the [Introduction Tour](../tutorials/basics/README.md) to get acquainted with the language.

最初の Crystal プログラムとして、次の2つの例を用意してあります。

- [HTTP サーバー](./http_server.md)
- [コマンドラインアプリケーション](./cli.md)
