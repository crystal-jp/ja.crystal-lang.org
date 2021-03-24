# コマンドリテラル

コマンドリテラルとは、バックティック `` ` `` で囲まれた文字列、もしくは `%x` パーセントリテラルのことです。
実行時に文字列の内容をコマンドとしてサブシェルで実行して、その出力の文字列が結果の値となります。

[エスケープシーケンス](./string.md#escaping)と[補間](./string.md#interpolation)は通常の文字列と同様に利用できます。

パーセントリテラルの形式の場合、他のパーセントリテラルと同様に`%x`では、括弧`()`、角括弧`[]`、ひげ括弧`{}`、三角括弧`<>`そしてパイプ`||`といった区切り文字が有効です。パイプ文字を除いて、すべての区切り文字はネストに応じて適切に処理されます。

特殊変数 `$?` はコマンドの実行結果の [`Process::Status`](https://crystal-lang.org/api/latest/Process/Status.html) オブジェクトになります。この特殊変数はコマンドリテラルと同じスコープに限り有効です。

```crystal
`echo foo`  # => "foo"
$?.success? # => true
```

内部的にはコマンドリテラルを [`` `()``](https://crystal-lang.org/api/latest/toplevel.html#%60(command):String-class-method) メソッドに文字列を渡すように書き換えています。つまり `` `echo #{argument}` `` と `%x(echo #{argument})` は `` `("echo #{argument}")`` のように書き換えられています。

## セキュリティ上の懸念

コマンドリテラルはスクリプトのような簡易的な利用時に便利ですが、補間を使う場合にはコマンドインジェクションが起こらないように注意する特別の注意を払う必要があります。

```crystal
user_input = "hello; rm -rf *"
`echo #{user_input}`
```

このコマンドは `hello` と出力したあとに現在のディレクトリのファイルとフォルダを全て削除します。

これを避けるには、コマンドリテラルの補間にユーザーの入力した値を用いないようにする必要があります。また、標準ライブラリにある [`Process`](https://crystal-lang.org/api/latest/Process.html) を使うとユーザーの入力を安全にコマンドの引数として渡すことができます。

```crystal
user_input = "hello; rm -rf *"
process = Process.new("echo", [user_input], output: Process::Redirect::Pipe)
process.output.gets_to_end # => "hello; rm -rf *"
process.wait.success?      # => true
```
