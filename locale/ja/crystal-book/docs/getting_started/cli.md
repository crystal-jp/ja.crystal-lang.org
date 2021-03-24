# CLI アプリケーション

コマンドラインインターフェースアプリケーション (CLI アプリケーション) の開発は、プログラマのタスクの中で最も愉快なものの1つです。それでは、Crystal での最初の CLI の開発を楽しみましょう。

CLI アプリケーションの開発には、主なトピックが2つあります。

* [入力](#input)
* [出力](#output)

## 入力

このトピックでは、次の話題に関連することを扱っていきます。

* [アプリケーションに渡されたオプションの処理](#options)
* [ユーザーの入力の要求](#request-for-user-input)

### オプション

アプリケーションにオプションを渡すことはとても一般的です。例えば`crystal -v`を実行すると、Crystal は次のように表示します。

```console
$ crystal -v
--8<-- "crystal-version.txt"
```

そして`crystal -h`と実行すると、Crystal は自身のオプションとそれらの利用方法を表示します。

ここで「**オプションの解析部分を実装する必要がある？**」と疑問を持つことでしょう。その必要はありません。Crystal では`OptionParser`がその機能を提供しています。それではこのパーサーを使ったアプリケーションを作ってみましょう。

CLI アプリケーションの開発を始めるにあたって、まず次のオプションを持っていることにします。

* `-v` / `--version`: アプリケーションのバージョンを表示する。
* `-h` / `--help`: アプリケーションの利用方法を表示する。

!!!example "help.cr"
```crystal
require "option_parser"

    OptionParser.parse do |parser|
      parser.banner = "Welcome to The Beatles App!"

      parser.on "-v", "--version", "Show version" do
        puts "version 1.0"
        exit
      end
      parser.on "-h", "--help", "Show help" do
        puts parser
        exit
      end
    end
    ```

さて、これがどうやって動作するというのでしょうか？　それは……魔法のように！　いえいえ、実のところ魔法ではないのです。実装が簡単になったのは Crystal のおかげです。
プログラムが開始すると、まず`OptionParser#parse`に渡されたブロックが実行されます。このブロックですべてのオプションを定義しています。ブロックが実行されたのち、オプションパーサーがアプリケーションに渡された引数を処理して、定義したオプションにマッチするかを確認します。ここで、オプションがマッチしたときに、`parser#on`に渡されたブロックが実行される、というわけです。

`OptionParser` のすべてを[公式の API ドキュメント](https://crystal-lang.org/api/latest/OptionParser.html)によって確認できます。そして、そこから1クリックでソースコードを見ることができます。……これが魔法ではないということの証明です。

さて、それではアプリケーションを実際に実行してみましょう。[コンパイラの実行方法](../using_the_compiler/README.md)は2種類あります。

1. [アプリケーションのビルド](../using_the_compiler/README.md#crystal-build)をして、それを実行する。
2. コンパイルと[アプリケーションの実行](../using_the_compiler/README.md#crystal-run)を、1度のコマンドでまとめて行う。

今回は2番目の方法でいきたいと思います。

```console
$ crystal run ./help.cr -- -h

Welcome to The Beatles App!
    -v, --version                    Show version
    -h, --help                       Show help
```

続けて、こんな機能を持つ_ファビュラスな_アプリケーションを作ってみましょう:

デフォルトでは (オプションが与えられなかったときに) The Fab Four のメンバーを表示します。しかし、`-t` もしくは `--twist` が渡されたときには、名前を大文字にします。

!!!example "twist_and_shout.cr"
```crystal
require "option_parser"

    the_beatles = [
      "John Lennon",
      "Paul McCartney",
      "George Harrison",
      "Ringo Starr"
    ]
    shout = false

    option_parser = OptionParser.parse do |parser|
      parser.banner = "Welcome to The Beatles App!"

      parser.on "-v", "--version", "Show version" do
        puts "version 1.0"
        exit
      end
      parser.on "-h", "--help", "Show help" do
        puts parser
        exit
      end
      parser.on "-t", "--twist", "Twist and SHOUT" do
        shout = true
      end
    end

    members = the_beatles
    members = the_beatles.map &.upcase if shout

    puts ""
    puts "Group members:"
    puts "=============="
    members.each do |member|
      puts member
    end
    ```

    `-t` をつけてこのアプリケーションを実行すると、次のように表示されるでしょう。

    ```console
    $ crystal run ./twist_and_shout.cr -- -t

    Group members:
    ==============
    JOHN LENNON
    PAUL MCCARTNEY
    GEORGE HARRISON
    RINGO STARR
    ```

#### オプションのパラメーター

次はこんなアプリケーションを作ってみましょう。_`-g` / `--goodbye_hello`オプションが与えられたときに、**オプションのパラメーター**として渡された名前に挨拶をする_。

!!!example "hello_goodbye.cr"
```crystal
require "option_parser"

    the_beatles = [
      "John Lennon",
      "Paul McCartney",
      "George Harrison",
      "Ringo Starr"
    ]
    say_hi_to = ""

    option_parser = OptionParser.parse do |parser|
      parser.banner = "Welcome to The Beatles App!"

      parser.on "-v", "--version", "Show version" do
        puts "version 1.0"
        exit
      end
      parser.on "-h", "--help", "Show help" do
        puts parser
        exit
      end
      parser.on "-g NAME", "--goodbye_hello=NAME", "Say hello to whoever you want" do |name|
        say_hi_to = name
      end
    end

    unless say_hi_to.empty?
      puts ""
      puts "You say goodbye, and #{the_beatles.sample} says hello to #{say_hi_to}!"
    end
    ```

この場合、ブロックにはオプションに与えられたパラメーターの値が渡されます。

試してみましょう。

```console
$ crystal run ./hello_goodbye.cr -- -g "Penny Lane"

You say goodbye, and Ringo Starr say hello to Penny Lane!
```

いい感じですね。アプリケーションが段々といい感じになってきました。ですが、**渡されたオプションを宣言していなかった場合、どうなるのでしょうか？**　例えば -n を渡してみましょう。

```console
$ crystal run ./hello_goodbye.cr -- -n
Unhandled exception: Invalid option: -n (OptionParser::InvalidOption)
  from ...
```

なんてことでしょう。これは壊れていますね。**無効なオプション**と**無効なパラメーター**が渡されたときの処理をする必要するがあります。2つの状況に応じて、`OptionParser`クラスは`#invalid_option`と`#missing_option`という2つメソッドを持っています。

それでは、これらのオプションハンドラーを追加して、さらにこれまでに作った2つのCLI アプリケーションをまとめて、1つのファビュラスな CLI アプリケーションにしましょう。

#### All My CLI: 完成した CLI アプリケーション

これが、無効なオプション/パラメーターの処理を追加して、新しいオプションを追加した、最終的なソースコードです。

!!!example "all_my_cli.cr"
```crystal
require "option_parser"

    the_beatles = [
      "John Lennon",
      "Paul McCartney",
      "George Harrison",
      "Ringo Starr"
    ]
    shout = false
    say_hi_to = ""
    strawberry = false

    option_parser = OptionParser.parse do |parser|
      parser.banner = "Welcome to The Beatles App!"

      parser.on "-v", "--version", "Show version" do
        puts "version 1.0"
        exit
      end
      parser.on "-h", "--help", "Show help" do
        puts parser
        exit
      end
      parser.on "-t", "--twist", "Twist and SHOUT" do
        shout = true
      end
      parser.on "-g NAME", "--goodbye_hello=NAME", "Say hello to whoever you want" do |name|
        say_hi_to = name
      end
      parser.on "-r", "--random_goodbye_hello", "Say hello to one random member" do
        say_hi_to = the_beatles.sample
      end
      parser.on "-s", "--strawberry", "Strawberry fields forever mode ON" do
        strawberry = true
      end
      parser.missing_option do |option_flag|
        STDERR.puts "ERROR: #{option_flag} is missing something."
        STDERR.puts ""
        STDERR.puts parser
        exit(1)
      end
      parser.invalid_option do |option_flag|
        STDERR.puts "ERROR: #{option_flag} is not a valid option."
        STDERR.puts parser
        exit(1)
      end
    end

    members = the_beatles
    members = the_beatles.map &.upcase if shout

    puts "Strawberry fields forever mode ON" if strawberry

    puts ""
    puts "Group members:"
    puts "=============="
    members.each do |member|
      puts "#{strawberry ?"🍓" : "-"} #{member}"
    end

    unless say_hi_to.empty?
      puts ""
      puts "You say goodbye, and I say hello to #{say_hi_to}!"
    end
    ```

### ユーザーへの入力の要求

しばしばユーザーに値を入力してもらいたい場合があります。どのようにして値を_読む_のでしょうか？　
簡単です！The Fab Four が望むフレーズを唄ってくれる、というアプリケーションを作ってみましょう。このアプリケーションを実行すると、ユーザーにフレーズを要求して、そして魔法が起こります！

!!!example "let_it_cli.cr"
```crystal
puts "Welcome to The Beatles Sing Along version 1.0!"
puts "Enter a phrase you want The Beatles to sing"
print "> "
user_input = gets
puts "The Beatles are singing: 🎵#{user_input}🎶🎸🥁"
```

[`gets`](https://crystal-lang.org/api/latest/toplevel.html#gets%28*args,**options%29-class-method) メソッドはアプリケーションの実行を、ユーザーの入力が終了する (`Enter` が押される) まで**停止**させます。
ユーザーが`Enter`を押すと、実行が再開して`user_input`にユーザーの入力した値が入ります。

しかし、ここでユーザーが何も入力しなかったらどうなるのでしょう？　この場合は、空文字列 (ユーザーが `Enter`を押した場合) もしくは `Nil` 値 (`Ctrl+D`によって入力ストリームを閉じた場合) が返ります。
これがどういう問題なのか説明するために、入力された値を叫ばせて (大文字にして表示して) みましょう。

!!!example "let_it_cli.cr"
```crystal
puts "Welcome to The Beatles Sing Along version 1.0!"
puts "Enter a phrase you want The Beatles to sing"
print "> "
user_input = gets
puts "The Beatles are singing: 🎵#{user_input.upcase}🎶🎸🥁"
```

これを実行しようとしてみると、 Crystal はこんな風にしてコンパイルに失敗するでしょう。

```console
$ crystal run ./let_it_cli.cr
Showing last frame. Use --error-trace for full trace.

In let_it_cli.cr:5:46

 5 | puts "The Beatles are singing: 🎵#{user_input.upper_case}
                                                  ^---------
Error: undefined method 'upper_case' for Nil (compile-time type is (String | Nil))
```

つまり、こういうことです。ユーザーの入力した値の型は `String | Nil` という[ユニオン型](https://crystal-lang.org/reference/syntax_and_semantics/type_grammar.html)なのです。
というわけで、`Nil`もしくは`""` (空文字列) かをチェックして、自然に動作するようにしましょう。

!!!example "let_it_cli.cr"
```crystal
puts "Welcome to The Beatles Sing Along version 1.0!"
puts "Enter a phrase you want The Beatles to sing"
print "> "
user_input = gets

    exit if user_input.nil?# Ctrl+D

    default_lyrics = "Na, na, na, na-na-na na" \
                    " / " \
                    "Na-na-na na, hey Jude"

    lyrics = user_input.presence || default_lyrics

    puts "The Beatles are singing: 🎵#{lyrics.upcase}🎶🎸🥁"
    ```

## 出力

ここからは、アプリケーションの出力という、2つ目のトピックに取りかかっていきます。
はじめに、アプリケーションは現時点でも情報を表示してはいるけど、そこまで良い表示だとは言えません。せっかくなので出力を _色付け_ してみましょう。

これを達成するために [`Colorize`](https://crystal-lang.org/api/latest/Colorize.html) モジュールを使いたいと思います。

色付いた文字列を表示する、単純なアプリケーションを作ってみましょう。黒い背景に黄色の文字で表示します。

!!!example "yellow_cli.cr"
```crystal
require "colorize"

    puts "#{"The Beatles".colorize(:yellow).on(:black)} App"
    ```

いい感じですね。簡単でしょう。イマジン (想像) してみてください、All My CLI アプリケーションのバナーにこの文字列を使うことを。ほら、簡単でしょう？ (it's easy if you try?)

```crystal
  parser.banner = "#{"The Beatles".colorize(:yellow).on(:black)} App"
```

ユーザーの入力を受け取る方のアプリケーションに、今回は`blink` (点滅)という*テキストの装飾*を追加してみましょう。

!!!example "let_it_cli.cr"
```crystal
require "colorize"

    puts "Welcome to The Beatles Sing Along version 1.0!"
    puts "Enter a phrase you want The Beatles to sing"
    print "> "
    user_input = gets

    exit if user_input.nil?# Ctrl+D

    default_lyrics = "Na, na, na, na-na-na na" \
                    " / " \
                    "Na-na-na na, hey Jude"

    lyrics = user_input.presence || default_lyrics

    puts "The Beatles are singing: #{"🎵#{lyrics}🎶🎸🥁".colorize.mode(:blink)}"
    ```

生まれ変わったアプリケーションを試してみてください……そして、違いを_聴き取って_ください。
**今**、私たちは2つのファビュラスなアプリケーションを実装したのです。

**利用できる色**や**テキストの装飾**の一覧は [API ドキュメント](https://crystal-lang.org/api/latest/Colorize.html)で確認できます。

## テスト

他の多くのアプリケーションがそうしているように、異なる機能ごとに[テストを書きたい](../guides/testing.md)ものです。

現時点ではアプリケーションの各ロジックは`OptionParser`の内で実行されています。つまり、アプリケーション全体を実行することなしに、部分的にファイルを取り込むことができないのです。よって、まずはじめにオプションの解析部分と実際のロジックを分離するリファクタリングを行う必要があります。このリファクタリングが済めば、あるロジックのテストに必要なコードを含むファイルだけをテストのコードに取り込んで、ロジックのテストをはじめることができるでしょう。これを読者の課題とします。.

## `Readline`と`NCurses`の利用

よりリッチなCLI アプリケーションを構築しようと思ったとき、これらのライブラリが助けになります。`Readline`と`NCurses`という、2つのよく知られたライブラリです。

[GNU Readline Library](http://www.gnu.org/software/readline/) で述べられているように、`Readline` はユーザーに対してコマンドライン編集機能を提供します。
`Readline`は、ファイル名補完などの自動補完、キーバインディングのカスタマイズなど、様々な機能を持っています。それらの機能を使いたいのであれば [crystal-lang/crystal-readline](https://github.com/crystal-lang/crystal-readline) shard が `Readline` を簡単に扱うための API を提供しています。

続いて、`NCurses`(New Curses) の紹介です。このライブラリは端末で_グラフィカルな_ユーザーインターフェースを開発することを可能にします。その名前が暗に示すように、これは`Curses`というライブラリの改良版です。`Curses` は Rouge というテキストベースのダンジョン探索アドベンチャーゲームのために開発されました。
想像してみてください。`NCurses` Crystal で使うには[いくつもの shardls](https://crystalshards.org/shards/search?q=ncurses)がエコシステムには存在しています。

これでこの文章はおしまいです 😎🎶
