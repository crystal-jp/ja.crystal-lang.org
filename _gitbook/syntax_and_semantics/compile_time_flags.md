# コンパイル時のフラグ

型やメソッドなど、基本的にはコードのどの部分であっても、コンパイル時に指定可能なフラグによる条件に応じて定義することが可能です。デフォルトでは、`uname -m -s` を実行した結果を空白で分割し、すべてを小文字にしたものがフラグとなります。

```bash
$ uname -m -s
Darwin x86_64

# この場合のフラグは darwin と x86_64
```

また、`--release` オプションをつけてプログラムをコンパイルした場合には、`release` フラグが true になります。

フラグのチェックには `ifdef` を使います。

```ruby
ifdef x86_64
  # 64ビットプラットフォームに固有のコード
else
  # 64ビットではないプラットフォームに固有のコード
end
```

`&&`/`||`/`|` を使うこともできます。

```ruby
ifdef linux && x86_64
  # Linux の64ビットに固有のコード
end
```

これらのフラグは、一般的に C 言語のバインディングにおいて、型や関数を条件に応じて定義するときに利用します。例えば、`size_t` というよく知られた型は、Crystal では以下のように定義されています。

```ruby
lib C
  ifdef x86_64
    alias SizeT = UInt64
  else
    alias SizeT = UInt32
  end
end
```

**注意:** 現在のところ、C 言語の構造体や共用体のフィールドを条件に応じて定義することはできません。そのため、その全体を定義するためにはそれぞれ個別に定義する必要があります。

```ruby
lib C
  struct SomeStruct
    # 次の行はパースエラーとなる
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

ただし、将来はこの制限が撤廃される可能性もあります。
