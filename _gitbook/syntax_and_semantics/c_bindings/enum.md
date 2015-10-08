# enum

`lib` の内部で `enum` を宣言することで C の enum (列挙型) を宣言できます。

```ruby
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

```ruby
X::SomeEnum::One #=> One
```

要素の値を指定することも可能です。

```ruby
lib X
  enum SomeEnum
    Ten = 10
    Twenty = 10 * 2
    ThirtyTwo = 1 << 5
  end
end
```

上記のように、要素の値には `+`/`-`/`*`/`/`/`&`/`|`/`<<`/`>>`/`%` といった基本的な計算を使うこともできます。

enum の要素の型はデフォルトで `Int32` です。これは、定数の値に別の型を指定した場合であっても同様です。

```ruby
lib X
  enum SomeEnum
    A = 1_u32
  end
end

X::SomeEnum #=> 1_i32
```

デフォルトの型は以下のように変更することも可能です。

```ruby
lib X
  enum SomeEnum : Int8
    Zero,
    Two = 2
  end
end

X::SomeEnum::Zero #=> 0_i8
X::SomeEnum::Two  #=> 2_i8
```

`fun` の引数や、`struct` と `union` のメンバーとしても enum を利用できます。

```ruby
lib X
  enum SomeEnum
    One
    Two
  end

  fun some_fun(value : SomeEnum)
end
```
