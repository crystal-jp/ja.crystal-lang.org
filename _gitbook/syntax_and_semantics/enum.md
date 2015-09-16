# Enum

Enum はひと組になった整数を表すもので、そのそれぞれの値が名前を持っています。例をあげます。

```ruby
enum Color
  Red
  Green
  Blue
end
```

Enum を定義するには `enum` キーワードに続けてその名前を書きます。Enum はその本体に値を持ちます。値は最初が `0` で始まって1ずつ増えていきます。それらのデフォルト値を上書きすることも可能です。

```ruby
enum Color
  Red         # 0
  Green       # 1
  Blue   = 5  # 5に上書きされる
  Yellow      # 6 (5 + 1)
end
```

Enum のそれぞれの定数は Enum の型を持ちます。

```ruby
Color::Red #:: Color
```

その値を参照するには `value` を実行してください。

```ruby
Color::Green.value #=> 1
```

デフォルトでは値は `Int32` 型ですが、変更することも可能です。

```ruby
enum Color : UInt8
  Red
  Green
  Blue
end

Color::Red.value #:: UInt8
```

ただし、整数型のみしか指定することができません。

すべての Enum は [Enum](http://crystal-lang.org/api/Enum.html) を継承しています。

## Flags Enum

Enum には `@[Flags]` という属性を指定することができます。これを指定するとデフォルトの値が変わります。

```ruby
@[Flags]
enum IOMode
  Read # 1
  Write  # 2
  Async # 4
end
```

`@[Flags]` 属性を指定すると、最初の定数の値が `1` になり、以降はそれぞれ前の値を2倍したものになります。

また、このとき Enum には、`None` と `All` が暗黙的に追加されます。`None` の値は `0` で、`All` はすべての定数の「OR」をとったときの値となります。

```ruby
IOMode::None.value #=> 0
IOMode::All.value  #=> 7
```

さらに、`Enum` のメソッドには、`@[Flags]` によって振る舞いを変えるものがいくつかあります。例をあげます。

```ruby
puts(Color::Red)                    # "Red" を出力
puts(IOMode::Write | IOMode::Async) # "Write, Async" を出力
```

## 整数から Enum を作る

整数から Enum を作ることができます。

```ruby
puts Color.new(1) #=> prints "Green"
```

Enum の定数にない値を指定することも可能です。その場合、あくまでも型は `Color` となりますが、出力したときにはその値がそのまま出力されます。

```ruby
puts Color.new(10) #=> prints "10"
```

これは主に C の整数を Crystal の Enum に変換する用途で利用します。

## メソッド

クラスや構造体と同様に、Enum にもメソッドを定義することが可能です。

```ruby
enum Color
  Red
  Green
  Blue

  def red?
    self == Color::Red
  end
end

Color::Red.red?  #=> true
Color::Blue.red? #=> false
```

また、クラス変数は定義可能ですが、インスタンス変数を定義することはできません。

## 用途

Enum は、型安全な[シンボル](http://crystal-lang.org/api/Symbol.html)の代替物として利用できます。例えば、Enum 型を利用して API のメソッド[型制約](type_restrictions.html)を設定することが可能です。

```ruby
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

```ruby
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

ただ、この場合はもしプログラマーが `:reed` とタイポしてしまったとすると、ランタイムにエラーが発生することになります。一方、`Color::Reed` であればコンパイルエラーになります。

したがって、Enum を利用できるときには常に Enum を利用することを推奨します。シンボルを使うのは API の内部的な実装に留めて、公開する API ではシンボルを使わないようにしましょう。ただし、最終的には各自が自由に判断できることなので、必ずそうしなければならないというわけではありません。
