# 戻り値の型

メソッドの戻り値の型は、コンパイラの型推論によって決まります。しかし、以下の2つの理由から、戻り値の型を指定したい場合があるでしょう。

1. メソッドが返す戻り値の型を明確にする
2. ドキュメンテーションコメントに表示する

例をあげます。

```crystal
def some_method : String
  "hello"
end
```

戻り値の型は[型の文法](type_grammar.md)の記法に従います。

## Nil

戻り値の型に `Nil` を指定すると、明示的に `nil` を返さなくても `nil` が返るようになります。

```crystal
def some_method : Nil
  1 + 2
end

some_method # => nil
```

これは次の2つの点で有用です。

1. 追加で末尾に `nil` を置いて戻り値を設定しなくても、明確に `nil` を返せる
2. 戻り値に意味がないということをドキュメントに表示できる

このようなにすることは通常、メソッドに副作用があることを仄めかしています

`Void` を使っても同様の結果を得られますが、`Void` は C バインディング向けの型のため、`Nil` を使う方が自然です。

## NoReturn

いくつかのメソッドは実行元に戻って来ず、戻り値の型を持たない場合があります。そのようなものは `NoReturn` という特別な型によって表現れます。

`return` や `exit`、`raise`、`next`、そして `break` といったキーワードがこの型になります。

これはユニオン型を分解する際に便利なことがあります。

```crystal
string = STDIN.gets
typeof(string)                        # => String?
typeof(raise "Empty input")           # => NoReturn
typeof(string || raise "Empty input") # => String
```

`string` が `Nil` のときは `string || raise` の右辺を評価するものというようにコンパイラは解釈します。`typeof(raise "Empty input")` は実行されたとすると返ってこないため、 `NoReturn` 型となります。そのため最終的に `String` のみが式の結果の型として残ります。

どのように分岐しても `NoReturn` になる場合は、結果の型も `NoReturn` になります。`NoReturn` は他の全ての型に含まれるため、ユニオン型の中には現れません。実行元に戻ってこない場合だけにこの型は利用されます。

`NoReturn` を明示的にメソッドもしくは関数の戻り値の型制約として指定することもできますが、通常はコンパイラによって推論されるでしょう。
