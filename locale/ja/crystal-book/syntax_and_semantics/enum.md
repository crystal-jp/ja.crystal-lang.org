# Enums

Enum はひと組になった整数を表すもので、そのそれぞれの値が名前を持っています。例をあげます。

```crystal
enum Color
  Red
  Green
  Blue
end
```

An enum is defined with the `enum` keyword, followed by its name. Enum はその本体に値を持ちます。Values start with the value `0` and are incremented by one. それらのデフォルト値を上書きすることも可能です。

```crystal
enum Color
  Red        # 0
  Green      # 1
  Blue   = 5 # overwritten to 5
  Yellow     # 6 (5 + 1)
end
```

Enum のそれぞれの定数は Enum の型を持ちます。

```crystal
Color::Red # :: Color
```

To get the underlying value you invoke `value` on it:

```crystal
Color::Green.value # => 1
```

The type of the value is `Int32` by default but can be changed:

```crystal
enum Color : UInt8
  Red
  Green
  Blue
end

Color::Red.value # :: UInt8
```

ただし、整数型のみしか指定することができません。

All enums inherit from [Enum](http://crystal-lang.org/api/Enum.html).

## Flags enums

An enum can be marked with the `@[Flags]` attribute. これを指定するとデフォルトの値が変わります。

```crystal
@[Flags]
enum IOMode
  Read  # 1
  Write # 2
  Async # 4
end
```

The `@[Flags]` attribute makes the first constant's value be `1`, and successive constants are multiplied by `2`.

Implicit constants, `None` and `All`, are automatically added to these enums, where `None` has the value `0` and `All` has the "or"ed value of all constants.

```crystal
IOMode::None.value # => 0
IOMode::All.value  # => 7
```

Additionally, some `Enum` methods check the `@[Flags]` attribute. 例をあげます。

```crystal
puts(Color::Red)                    # prints "Red"
puts(IOMode::Write | IOMode::Async) # prints "Write, Async"
```

## Enums from integers

整数から Enum を作ることができます。

```crystal
puts Color.new(1) # => prints "Green"
```

Values that don't correspond to an enum's constants are allowed: the value will still be of type `Color`, but when printed you will get the underlying value:

```crystal
puts Color.new(10) # => prints "10"
```

これは主に C の整数を Crystal の Enum に変換する用途で利用します。

## Methods

クラスや構造体と同様に、Enum にもメソッドを定義することが可能です。

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

Class variables are allowed, but instance variables are not.

## 使い方

Enums are a type-safe alternative to [Symbol](http://crystal-lang.org/api/Symbol.html). For example, an API's method can specify a [type restriction](type_restrictions.html) using an enum type:

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

However, if the programmer makes a typo, say `:reed`, the error will only be caught at runtime, while attempting to use `Color::Reed` will result in a compile-time error.

したがって、Enum を利用できるときには常に Enum を利用することを推奨します。シンボルを使うのは API の内部的な実装に留めて、公開する API ではシンボルを使わないようにしましょう。ただし、最終的には各自が自由に判断できることなので、必ずそうしなければならないというわけではありません。
