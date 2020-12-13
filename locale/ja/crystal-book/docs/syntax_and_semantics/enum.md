# 列挙型 (Enum)

列挙型 (Enum) は整数の集合で、そのそれぞれの値が名前を持っています。例をあげます。

```crystal
enum Color
  Red
  Green
  Blue
end
```

`enum` キーワードに続けてその名前を書くことで、列挙型を定義できます。列挙型はその本体に値を持ちます。値は最初に `0` から始まって、1ずつ増えていきます。それらのデフォルト値を上書きすることも可能です。

```crystal
enum Color
  Red        # 0
  Green      # 1
  Blue   = 5 # 5に上書きする
  Yellow     # 6 (5 + 1)
end
```

列挙型のそれぞれの定数はその列挙型を型として持ちます。

```crystal
Color::Red # :: Color
```

紐付いている値を参照するには `value` を呼び出してください。

```crystal
Color::Green.value # => 1
```

この値の型は `Int32` ですが、変更することができます。

```crystal
enum Color : UInt8
  Red
  Green
  Blue
end

Color::Red.value # :: UInt8
```

ただし、整数型しか指定することはできません。

すべての列挙型は [Enum](http://crystal-lang.org/api/Enum.html) を継承しています。

## フラグ列挙型

列挙型に `@[Flags]` という属性を指定することができます。これを指定するとデフォルトの値が変わります。

```crystal
@[Flags]
enum IOMode
  Read  # 1
  Write # 2
  Async # 4
end
```

`@[Flags]` 属性を指定することで、最初の定数の値は `1` になり、以降は前の値を `2` 倍したものになります。

また、暗黙の定数として `None` と `All` が自動的に列挙型に追加されます。ここで `None` の値は `0` で、`All` はすべての定数のビット ORを取ったものになります。

```crystal
IOMode::None.value # => 0
IOMode::All.value  # => 7
```

さらに、`Enum` のメソッドには `@[Flags]` 属性によって振る舞いを換えるものがいくつかあります。例をあげます。

```crystal
puts(Color::Red)                    # prints "Red"
puts(IOMode::Write | IOMode::Async) # prints "Write, Async"
```

## 整数から列挙型を作る

整数から列挙型を作ることができます。

```crystal
puts Color.new(1) # => "Green" と出力
```

列挙型の定数にない値を指定することも可能です。その場合は、あくまでも型は `Color` となりますが、出力してときにはその値がそのまま出力されます。

```crystal
puts Color.new(10) # => "10" と出力
```

これは主に C の整数を Crystal の列挙型に変換する用途で利用します。

## メソッド

クラスや構造体と同様に、列挙型にもメソッドを定義することが可能です。

```crystal
enum Color
  Red
  Green
  Blue

  def red?
    self == Color::Red
  end
end

Color::Red.red?# => true
Color::Blue.red?# => false
```

クラス変数を使うこともできますが、インスタンス変数を使うことはできません。

## 使い方

列挙型は [Symbol](http://crystal-lang.org/api/Symbol.html) の型安全な代替物として利用できます。例えば、列挙型を API のメソッドの[型制約](type_restrictions.md)に指定することができます。

```crystal
def paint(color : Color)
  case color
  when Color::Red
    # ...
  else
    # あまり考えられないが、絶対にないとは言えない
    raise "unknown color: #{color}"
  end
end

paint Color::Red
```

上記と同等のコードを、シンボルを使って実装することもできます。

```crystal
def paint(color : Symbol)
  case color
  when :red
    # ...
  else
    raise "unknown color: #{color}"
  end
end

paint :red
```

ただ、この場合はもしプログラマが `:reed` とタイポしてしまったとすると、実行時にエラーが発生することになります。一方、`Color::Reed` であればコンパイルエラーとなります。

したがって、列挙型を利用できるときには常に列挙型を利用することを推奨します。シンボルを使うのは API の内部的な実装に留めて、公開する API ではシンボルを使わないようにしましょう。ただし、最終的には各自が自由に判断できることなので、必ずそうしなければならないというわけではありません。
