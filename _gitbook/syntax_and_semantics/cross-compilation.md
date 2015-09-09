# クロスコンパイル

Crystal は基本的な [クロスコンパイル](http://en.wikipedia.org/wiki/Cross_compiler) をサポートしています

これを実現するため、コンパイラは２つのフラグを用意しています：

* `--cross-compile`: [コンパイル時フラグ](compile_time_flags.html) を使う
* `--target`: [LLVM の Target Triple](http://llvm.org/docs/LangRef.html#target-triple) を使う

 `--cross-compile` 実行時は unix system で言う `uname -m -s` のフラグを使用できます。　例えばあなたが Mac を利用するのであれば、 `uname -m -s` コマンド結果は "Darwin x86_64" を示し、 linux 64 bits では "Linux x86_64" を示します。

 `--target` フラグを知るにはインストールされた LLVM 3.5 を使用して `llvm-config --host-target` を実行します。例えば Linux では "x86_64-unknown-linux-gnu" が得られます。

これらの２つのフラグを用いれば、私たちは Mac で以下のようにすれば、先ほどの Linux で実行可能なプログラムをコンパイルする事が出来ます。

```bash
crystal build your_program.cr --cross-compile "Linux x86_64" --target "x86_64-unknown-linux-gnu"
```

これで１つの `.o` ([オブジェクトファイル](http://en.wikipedia.org/wiki/Object_file)) を生成し、また我々がクロスコンパイルしようとしているシステムでコマンドがでどのように実行するとよいか１行で表示します。例:

```bash
cc your_program.o -o your_program -lpcre -lrt -lm -lgc -lunwind
```

あなたはこの `.o` ファイルをそのターゲットシステムにコピーし、これらのコマンドを実行します。これを一度行えばターゲットシステムで実行可能なファイルが使用可能になります。

この手順は通常コンパイラが自分自身を新しい未だコンパイラが使用可能でないプラットフォームに移植する時に行われます。 Crystal コンパイラをコンパイルするには古い Crystal コンパイラが必要です。未だコンパイラの存在しないシステムでコンパイラを生成するには２つの方法しかありません。

* Ruby で書かれた最新の コンパイラを完成させ、それを使って次のバージョンのコンパイラをコンパイルし、それを現在のバージョンまで繰り返す
* ターゲットシステム用の`.o` ファイルを生成し、そのファイルからコンパイラを生成する

最初の方法は、時間がかかり面倒です。２番目の方法はずっと楽です。

クロスコンンパイルはどんな実行可能ファイルも生成できます。しかし主な目的はコンパイラを生成することです。もしも或るシステムで Crystal コンパイラが利用できない場合、このクロスコンパイルをトライしてみてください

**注意:** 現在はこれ以上のコンパイル時フラグを追加する方策が無いこともあり、クロスコンパイルを一度に行うことはしていません。

