# コンパイル時フラグ

タイプやメソドや一般的にコードのどの部分でもコンパイル時に利用できるフラグを基に条件定義が可能です。これらのフラグは、コンパイル時デフォールトで `uname -m -s` を実行した結果で示されます。空白で区切られた小文字のフラグです。

```bash
$ uname -m -s
Darwin x86_64

# この場合フラグは: darwin, x86_64 です
```

さらにプログラムが`--release`オプションでコンパイルされるときには `release` フラグはtrue になります。

フラグをテストするには `ifdef` を使用します:

```ruby
ifdef x86_64
  # x86_64 bits　プラットフォーム用のコード
else
  # non-64 bits プラットフォーム用のコード
end
```

 `&&` 、 `||` と `|`が使用できます:

```ruby
ifdef linux && x86_64
  # linux と x86_64 bits プラットフォーム用のコード
end
```

これらフラグは一般的にはＣコードをバインデイングする時に type や function を条件定義するときに使われます。例として、よく知られた `size_t` の type は Crystal ではこのように定義されます：

```ruby
lib C
  ifdef x86_64
    alias SizeT = UInt64
  else
    alias SizeT = UInt32
  end
end
```

**注意:** Ｃの構造体やユニオンのフィールドに関する条件定義は現在サポートされていません。全体の type 定義のためには別々に定義がされなければなりません

```ruby
lib C
  struct SomeStruct
    # エラー: the next line gives a parser error
    ifdef linux
      some_field : Int32
    else
      some_field : Int64
    end
  end

  # OK
  ifdef linux
    struct SomeStruct
      some_field : Int32
    end
  else
    struct SomeStruct
      some_field : Int64
    end
  end
end
```

この制約は将来取り除かれるかもしれません。
