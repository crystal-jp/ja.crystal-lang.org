# enum

An `enum` declaration inside a `lib` declares a C enum:

```crystal
lib X
  # C では:
  #
  #  enum SomeEnum {
  #    Zero,
  #    One,
  #    Two,
  #    Three,
  #  };
  enum SomeEnum
    Zero
    One
    Two
    Three
  end
end
```

C と同じく、enum の最初の要素はゼロで、以降の要素はそれぞれ1ずつ増加した値となります。

値は以下のように利用します。

```crystal
X::SomeEnum::One # => One
```

要素の値を指定することも可能です。

```crystal
lib X
  enum SomeEnum
    Ten       = 10
    Twenty    = 10 * 2
    ThirtyTwo = 1 << 5
  end
end
```

As you can see, some basic math is allowed for a member value: `+`, `-`, `*`, `/`, `&`, `|`, `<<`, `>>` and `%`.

The type of an enum member is `Int32` by default, even if you specify a different type in a constant value:

```crystal
lib X
  enum SomeEnum
    A = 1_u32
  end
end

X::SomeEnum # => 1_i32
```

デフォルトの型は以下のように変更することも可能です。

```crystal
lib X
  enum SomeEnum : Int8
    Zero
    Two  = 2
  end
end

X::SomeEnum::Zero # => 0_i8
X::SomeEnum::Two  # => 2_i8
```

You can use an enum as a type in a `fun` argument or `struct` or `union` members:

```crystal
lib X
  enum SomeEnum
    One
    Two
  end

  fun some_fun(value : SomeEnum)
end
```
