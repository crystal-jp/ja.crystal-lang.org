# コンパイラを使用する

[インストール](../installation/README.md)が済んでいれば、`crystal` というバイナリを利用することができます。

なお、以降ではドル記号 (`$`) でコマンドラインを示します。

## コンパイルと同時に実行する

ファイル名を1つ指定して `crystal` コマンドを実行することで、プログラムのコンパイルと実行を一発で行うことができます。

```
$ crystal some_program.cr
```

Crystal のファイルには `.cr` という拡張子がつきます。

また、`run` コマンドを使っても同様のことが可能です。

```
$ crystal run some_program.cr
```

## 実行ファイルの作成

実行ファイルを作成するには `build` コマンドを使用します。

```
$ crystal build some_program.cr
```

上記では、`some_program` という実行ファイルが作成され、以下のようにして実行することができます。

```
$ ./some_program
```

**注意:** デフォルトでは生成された実行ファイルは**完全に最適化**された状態ではありません。最適化を有効にしたければ、`--release` フラグを与える必要があります。

```
$ crystal build some_program.cr --release
```

したがって、プロダクションでの利用やベンチマークを測定するような場合には、必ず `--release` をつけるようにしてください。

このような動作となっている理由は、完全最適化をしない場合にも、ある程度十分なパフォーマンスを維持したままで高速なコンパイルが可能であるため、まるでインタープリタのように `crystal` コマンドを使用することができるからです。

## プロジェクトやライブラリの作成

`init` コマンドを使用すると、標準的なディレクトリ構成を持った Crystal プロジェクトを作成おすることができます。

```
$ crystal init lib MyCoolLib
      create  MyCoolLib/.gitignore
      create  MyCoolLib/LICENSE
      create  MyCoolLib/README.md
      create  MyCoolLib/.travis.yml
      create  MyCoolLib/Projectfile
      create  MyCoolLib/src/MyCoolLib.cr
      create  MyCoolLib/src/MyCoolLib/version.cr
      create  MyCoolLib/spec/spec_helper.cr
      create  MyCoolLib/spec/MyCoolLib_spec.cr
Initialized empty Git repository in ~/MyCoolLib/.git/
```

## その他のコマンドやオプション

すべてのコマンドを確認するには、`crystal` コマンドを引数なしで実行してください。

```
$ crystal
Usage: crystal [command] [switches] [program file] [--] [arguments]

Command:
    init                     generate new crystal project
    build                    compile program file
    browser                  open an http server to browse program file
    deps                     install project dependencies
    docs                     generate documentation
    eval                     eval code
    hierarchy                show type hierarchy
    run (default)            compile and run program file
    spec                     compile and run specs (in spec directory)
    types                    show type of main variables
    --help                   show this help
    --version                show version
```

あるコマンドに対して有効なオプションを確認するには、コマンドに続けて `--help` を入力してください。

```
$ crystal build --help
Usage: crystal build [options] [programfile] [--] [arguments]

Options:
    --cross-compile flags            cross-compile
    -d, --debug                      Add symbolic debug info
    -D FLAG, --define FLAG           Define a compile-time flag
    --emit [asm|llvm-bc|llvm-ir|obj] Comma separated list of types of output for the compiler to emit
    -h, --help                       Show this message
    --ll                             Dump ll to .crystal directory
    --link-flags FLAGS               Additional flags to pass to the linker
    --mcpu CPU                       Target specific cpu type
    --no-color                       Disable colored output
    --no-build                       Disable build output
    -o                               Output filename
    --prelude                        Use given file as prelude
    --release                        Compile in release mode
    -s, --stats                      Enable statistics output
    --single-module                  Generate a single LLVM module
    --threads                        Maximum number of threads to use
    --target TRIPLE                  Target triple
    --verbose                        Display executed commands
```
