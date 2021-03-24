# enum

`lib` の中で `enum` を宣言することで C の列挙型を宣言できます。

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

C と同じく、列挙型の最初の要素はゼロで、以降の要素はそれぞれ1ずつ増加した値となります。

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

上記のように、要素の値には `+`、`-`、`*`、`/`、`&`、 `|`、`<<`、`>>`、`%`といった基本的な計算を行うこともできます。

列挙型の要素の型はデフォルトで `Int32` です。これは、定数の値に別の型を指定した場合であっても同様です。

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

`fun` の引数や、 `struct` や `union` のメンバとしても列挙型が利用できます。

```crystal
lib X
  enum SomeEnum
    One
    Two
  end

  fun some_fun(value : SomeEnum)
end
```
