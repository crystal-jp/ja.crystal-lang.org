# コールバック

C の宣言の中で関数型を利用することが可能です。

```crystal
lib X
  # C では:
  #
  #    void callback(int (*f)(int));
  fun callback(f : Int32 -> Int32)
end
```

それから、以下のように関数 ([Proc](http://crystal-lang.org/api/Proc.html)) を渡すことができます。

```crystal
f = ->(x : Int32) { x + 1 }
X.callback(f)
```

もし呼び出しと同時にインラインで関数を定義する場合は、引数の型を省略することが可能です。このとき、コンパイラが `fun` のシグネイチャに基づいて型を追加します。

```crystal
X.callback ->(x) { x + 1 }
```

ただ、C に渡される関数はクロージャにはなれません。もし、クロージャが渡されていることがコンパイル時に検出されるとエラーが発生します。

```crystal
y = 2
X.callback ->(x) { x + y } # エラー: クロージャは
                           # C の関数には渡せない
```

もしコンパイラがコンパイル時にこのことを検出できなかった場合、ランタイムに例外が発生します。

コールバックと Proc に使用可能な型の指定方法については[型文法](type_grammar.html)を参照してください。

もしコールバックの代わりに `NULL` を渡したい場合は、単純に `nil` を渡してください。

```crystal
# C の callback(NULL) と同じ
X.callback nil
```

## Raise 属性

例外を発生させる可能性のあるコールバックを C の関数が実行するときには、`@[Raises]` 属性を指定しておく必要があります。

コンパイラは、`@[Raises]` が指定されたメソッドを実行するメソッドや、例外を発生させるメソッドに対しても (再帰的に) この属性が指定されているものと推論します。

しかし、C の関数には、他の C 関数によって実行されるコールバックを受け取るものがあります。例えば、以下のようなライブラリがあるものと考えてください。

```crystal
lib LibFoo
  fun store_callback(callback : ->)
  fun execute_callback
end

LibFoo.store_callback ->{ raise "OH NO!" }
LibFoo.execute_callback
```

このとき、もし `store_callback` に渡されたコールバックが例外を発生させるものであるときには、`execute_callback` が例外を発生させるでしょう。しかし、`execute_callback` に `@[Raises]` が指定されていないため、コンパイラはそれが例外を発生させるものであることを知ることができません。こういったケースでは、それらの関数に手動で指示を与える必要があります。

```crystal
lib LibFoo
  fun store_callback(callback : ->)

  @[Raises]
  fun execute_callback
end
```

もし上記のように指定しなかった場合、この関数の呼び出しを囲む `begin/rescue` ブロックが期待通りに働いてくれません。
