# 定数

定数はトップレベル、もしくはある型の内部で宣言することができます。定数の先頭は大文字である必要があります。

```crystal
PI = 3.14

module Earth
  RADIUS = 6_371_000
end

PI            # => 3.14
Earth::RADIUS # => 6_371_000
```

また、これはコンパイラに強制されることではありませんが、一般的に定数名はすべて大文字とし、単語はアンダースコアで区切ります。

定数を定義する際にメソッドを実行したり、複雑なロジックを使って定義することもできます。

```crystal
TEN = begin
  a = 0
  while a < 10
    a += 1
  end
  a
end

TEN # => 10
```

## 疑似定数

Crystal にはいくつかの疑似定数があり、ソースコードの位置に関する情報を取得することができます。

`__LINE__` は現在処理しているソースコードの現在の行番号になります。When `__LINE__` がメソッドの引数のデフォルト値として利用された場合、メソッドの呼び出された位置の行番号になります。

`__END_LINE__` は呼び出しのブロックの `end` のある行番号となります。これはメソッドの引数のデフォルト値でのみ利用できます。

`__FILE__` は現在処理しているソースコードのファイル名の完全なパスを参照します。

`__DIR__` は現在処理しているソースコードのあるディレクトリの完全なパスを参照します。

```crystal
# このコードは /crystal_code/pseudo_constants.cr に保存されているとします。
#
def pseudo_constants(caller_line = __LINE__, end_of_caller = __END_LINE__)
  puts "呼び出された行番号: #{caller_line}"
  puts "ここの行番号: #{__LINE__}"
  puts "呼び出し元のブロックの終わりの行: #{end_of_caller}"
  puts "ファイル名: #{__FILE__}"
  puts "ディレクトリ名: #{__DIR__}"
end

begin
  pseudo_constants
end

# Program prints:
# 呼び出された行番号: 13
# ここの行番号r: 5
# 呼び出し元のブロックの終わりの行: 14
# ファイル名: /crystal_code/pseudo_constants.cr
# ディレクトリ名: /crystal_code
```

## 動的な代入

[連続した代入](assignment.md#chained-assignment)や[多重代入](assignment.md#multiple-assignment)は定数に対してはサポートされておらず、構文エラーとなります。

```{.crystal nocheck}
ONE, TWO, THREE = 1, 2, 3 # Syntax error: Multiple assignment is not allowed for constants
```
