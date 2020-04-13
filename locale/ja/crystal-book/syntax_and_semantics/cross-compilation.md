# Cross-compilation

Crystal supports a basic form of [cross compilation](http://en.wikipedia.org/wiki/Cross_compiler).

そのために、コンパイラに以下の2つのフラグを用意しています。

* `--cross-compile`: When given enables cross compilation mode
* `--target`: the [LLVM Target Triple](http://llvm.org/docs/LangRef.html#target-triple) to use and set the default [compile-time flags](compile_time_flags.html) from

To get the `--target` flags you can execute `llvm-config --host-target` using an installed LLVM 3.5. 例えば、Linux であれば "x86_64-unknown-linux-gnu" となるでしょう。

If you need to set any compile-time flags not set implicitly through `--target`, you can use the `-D` command line flag.

これらの2つのフラグを使うことで、Linux で動作するプログラムを Mac 上でコンパイルすることが可能です。

```bash
crystal build your_program.cr --cross-compile --target "x86_64-unknown-linux-gnu"
```

This will generate a `.o` ([Object file](http://en.wikipedia.org/wiki/Object_file)) and will print a line with a command to execute on the system we are trying to cross-compile to. 例をあげます。

```bash
cc your_program.o -o your_program -lpcre -lrt -lm -lgc -lunwind
```

You must copy this `.o` file to that system and execute those commands. そうすると、対象のシステム上に実行ファイルが作られます。

通常、まだコンパイラを入手できない新しいプラットフォームにコンパイラ自体を移植する際にこの手順を利用します。Because in order to compile a Crystal compiler we need an older Crystal compiler, the only two ways to generate a compiler for a system where there isn't a compiler yet are:
* We checkout the latest version of the compiler written in Ruby, and from that compiler we compile the next versions until the current one.
* We create a `.o` file in the target system and from that file we create a compiler.

最初の方法は非常に時間がかかり面倒ですが、それに比べて2番目の方法ずっとは簡単です。

クロスコンパイルは他の実行ファイルに対しても利用することが可能ですが、主な目的はコンパイラの生成です。もし、あるシステムでコンパイラが利用できない場合は、このクロスコンパイルを試してみてください。
