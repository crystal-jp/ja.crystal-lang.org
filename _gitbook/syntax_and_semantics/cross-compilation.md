# クロスコンパイル

Crystal は基本的な[クロスコンパイル](http://en.wikipedia.org/wiki/Cross_compiler)をサポートしています。

そのために、コンパイラに以下の2つのフラグを用意しています。

* `--cross-compile`: the [compile-time flags](compile_time_flags.html)
* `--target`: the [LLVM Target Triple](http://llvm.org/docs/LangRef.html#target-triple)

`--cross-compile` フラグは、UNIX システムでは `uname -m -s` を実行した結果から知ることができます。例えば Mac の場合であれば、`uname -m -s` コマンドの実行結果は "Darwin x86_64" です。64ビットの Linux であればその結果は "Linux x86_64" となります。

一方、`--target` フラグを得るには、LLVM 3.5 を使って `llvm-config --host-target` を実行します。例えば、Linux であれば "x86_64-unknown-linux-gnu" となるでしょう。

これらの2つのフラグを使うことで、Linux で動作するプログラムを Mac 上でコンパイルすることが可能です。

```bash
crystal build your_program.cr --cross-compile "Linux x86_64" --target "x86_64-unknown-linux-gnu"
```

これで、`.o` ([オブジェクトファイル](http://en.wikipedia.org/wiki/Object_file)) が生成され、クロスコンパイルの対象システム上で実行すべきコマンドが表示されます。例をあげます。

```bash
cc your_program.o -o your_program -lpcre -lrt -lm -lgc -lunwind
```

`.o` ファイルを対象のシステム上にコピーし、上記のコマンドを実行してください。そうすると、対象のシステム上に実行ファイルが作られます。

通常、まだコンパイラを入手できない新しいプラットフォームにコンパイラ自体を移植する際にこの手順を利用します。Crystal のコンパイラをコンパイルするためには、古い Crystal コンパイラが必要です。したがって、まだコンパイラが入手できないシステムでコンパイラを生成するには以下の2つの方法しかありません。

* Ruby で書かれた最新のコンパイラを入手してコンパイラをコンパイルし、それを現在のバージョンまで繰り返す
* 対象システム用の `.o` ファイルを生成し、それを使ってコンパイラを作成する

最初の方法は非常に時間がかかり面倒ですが、それに比べて2番目の方法ずっとは簡単です。

クロスコンパイルは他の実行ファイルに対しても利用することが可能ですが、主な目的はコンパイラの生成です。もし、あるシステムでコンパイラが利用できない場合は、このクロスコンパイルを試してみてください。

**注意:** 現在のところ、他のコンパイル時のフラグを追加することができず、クロスコンパイル時に同時に指定することはできません。
