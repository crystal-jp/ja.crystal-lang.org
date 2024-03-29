# クロスコンパイル

Crystal は基本的な[クロスコンパイル](http://en.wikipedia.org/wiki/Cross_compiler)をサポートしています。

そのために、コンパイラに以下の2つのフラグを用意しています。

* `--cross-compile`: クロスコンパイルモードを有効にする
* `--target`: ビルドに利用する[LLVM ターゲットトリプル](http://llvm.org/docs/LangRef.html#target-triple)を指定して、デフォルトの[コンパイル時のフラグ](compile_time_flags.md)を設定する

`--target` フラグを得るには、インストールされたLLVM 3.5を使って `llvm-config --host-target` を実行します。例えば、Linux であれば "x86_64-unknown-linux-gnu" となるでしょう。

`--target` 経由で暗黙的にセットされているものでないコンパイル時のフラグをセットする必要がある場合は、`-D` コマンドライン引数が使えます。

これらの2つのフラグを使うことで、Linux で動作するプログラムを Mac 上でコンパイルすることが可能です。

```bash
crystal build your_program.cr --cross-compile --target "x86_64-unknown-linux-gnu"
```

これで、`.o` ([オブジェクトファイル](http://en.wikipedia.org/wiki/Object_file)) が生成され、クロスコンパイルの対象システム上で実行すべきコマンドが表示されます。例をあげます。

```bash
cc your_program.o -o your_program -lpcre -lrt -lm -lgc -lunwind
```

`.o` ファイルを対象のシステム上にコピーし、上記のコマンドを実行してください。そうすると、対象のシステム上に実行ファイルが作られます。

通常、まだコンパイラを入手できない新しいプラットフォームにコンパイラ自体を移植する際にこの手順を利用します。Crystal のコンパイラをコンパイルするためには以前のバージョンの Crystal コンパイラが必要です。したがって、まだコンパイラが入手できないシステムでコンパイラを生成するには以下の2つの方法があります。

* Ruby で書かれた最新のコンパイラを入手しコンパイラをコンパイルし、それを現在のバージョンまで繰り返す
* 対象システム用の `.o` ファイルを生成し、それを使ってコンパイラを生成する

最初の方法は非常に時間がかかり面倒ですが、それに比べて2番目の方法ずっとは簡単です。

クロスコンパイルは他の実行ファイルに対しても利用することが可能ですが、主な目的はコンパイラの生成です。もし、あるシステムでコンパイラが利用できない場合は、このクロスコンパイルを試してみてください。
