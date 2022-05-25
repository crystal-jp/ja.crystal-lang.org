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

そうすると、以下のように関数 ([Proc](https://crystal-lang.org/api/Proc.html)) を渡せます。

```crystal
f = ->(x : Int32) { x + 1 }
X.callback(f)
```

呼び出しと同時にインラインで関数を定義する場合は、引数の型を省略できます。このとき、コンパイラが `fun` のシグネチャに基づいて型を追加します。

```crystal
X.callback ->(x) { x + 1 }
```

ただ、C に渡される関数はクロージャにはなれません。もし、クロージャが渡されていることがコンパイル時に検出されるとエラーが発生します。

```crystal
y = 2
X.callback ->(x) { x + y } # Error: can't send closure to C function
```

もしコンパイラがコンパイル時にこのことを検出できなかった場合、ランタイムに例外が発生します。

コールバックと Proc に使用する型の指定方法については[型の文法](../type_grammar.md)を参照してください。

コールバックではなく `NULL` を渡したい場合は、単純に `nil` を渡してください。

```crystal
# C での callback(NULL) と同じ
X.callback nil
```

## C の関数にクロージャを渡す

ほとんどの C 関数はコールバックに独自のデータのための引数が用意されています。その独自のデータは引数としてコールバックに渡されます。例として、一定の周期でコールバックを呼び出すような C の関数を考えてみましょう。

```crystal
lib LibTicker
  fun on_tick(callback : (Int32, Void* ->), data : Void*)
end
```

この関数のまっとうなラッパーを定義するために、 Proc をコールバックのデータとして渡し、コールバック中で元の Proc に戻し、それを呼び出す、というようにする必要があります。

```crystal
module Ticker
  # ユーザーのコールバックは Void* を持ちません
  @@box : Pointer(Void)?

  def self.on_tick(&callback : Int32 ->)
    # Proc は内部的には {Void*, Void*} なので Void* にすることはできません。
    # そこで、メモリを確保して Proc をそこに保存する「ボックス化」をします。
    boxed_data = Box.box(callback)

    # 勝手に GC されるのを防ぐため、Crystal 上に保持しておく必要があります (*)
    @@box = boxed_data

    # クロージャではない形になるようにコールバックを渡し、boxed_data をコールバック
    # のデータとして渡します
    LibTicker.on_tick(->(tick, data) {
      # ここで Box.unbox を使い data を Proc に戻します
      data_as_callback = Box(typeof(callback)).unbox(data)
      # そして、最終的にユーザーのコールバックを呼び出します
      data_as_callback.call(tick)
    }, boxed_data)
  end
end

Ticker.on_tick do |tick|
  puts tick
end
```

ボックス化したコールバックを `@@box` に保持したことに注意してください。この理由は、そうしなければどこからも参照していると見なされず、GC がそれを回収してしまうからです。C のライブラリも当然コールバックを保存しているでしょう。しかし Crystal の GC がそれを知る術はないのです。

## Raises アノテーション

例外を発生させる可能性のあるコールバックを C の関数が実行するときには `@[Raises]` アノテーションを指定しておく必要があります。

コンパイラは `@[Raises]` が指定されたメソッドを実行するメソッドや、例外を発生させるメソッドに対しても (再帰的に) このアノテーションが指定されているものとして扱います。

しかし、C の関数には、他の C 関数によって実行されるコールバックを受け取るものがあります。例えば、以下のようなライブラリを考えてください。

```crystal
lib LibFoo
  fun store_callback(callback : ->)
  fun execute_callback
end

LibFoo.store_callback ->{ raise "OH NO!" }
LibFoo.execute_callback
```

このとき、もし `store_callback` に渡されたコールバックが例外を発生させるものであるときには、 `execute_callback` が例外を発生させるでしょう。しかし、 `execute_callback` に `@[Raises]` が指定されていないため、コンパイラはそれが例外を発生させるものであることを知ることができません。こういったケースでは、それらの関数に手動で指示を与える必要があります。

```crystal
lib LibFoo
  fun store_callback(callback : ->)

  @[Raises]
  fun execute_callback
end
```

もし上記のように指定しなかった場合、この関数呼び出しを囲む `begin/rescue` ブロックは期待通りに動いてくれません。
