# コンパイル時のフラグ

型やメソッドなど、基本的にはコードのどの部分であっても、コンパイル時に指定可能なフラグによる条件に応じて定義することが可能です。デフォルトではホストの [LLVM ターゲットトリプル](http://llvm.org/docs/LangRef.html#target-triple) を `-` で区切ったものがフラグとなります。実際のターゲットを得るには `llvm-config --host-target` を実行します。

```console
$ llvm-config --host-target
x86_64-unknown-linux-gnu

# よって、フラグは x86_64, unknown, linux, gnu となります
```

フラグを定義するには、`--define` もしくは `-D` オプションを使います。

```bash
crystal some_program.cr -Dflag
```

また、`--release` オプションをつけてプログラムをコンパイルqした場合には `release` フラグが有効になります。

フラグが定義されているかどうかは `flag?` マクロメソッドを使うことで確認できます。

```crystal
{% if flag?(:x86_64) %}
  # 64ビットプラットフォーム固有のコード
{% else %}
  # 64ビットでないプラットフォームに固有のコード
{% end %}
```

`flag?` は真偽値を返すので、`&&` や`||` を使うこともできます。

```crystal
{% if flag?(:linux) && flag?(:x86_64) %}
  # Linux で64ビットの場合に固有のコード
{% end %}
```

これらのフラグは、一般的に C 言語のバインディングにおいて、型や関数を条件に応じて定義するときに利用します。例えば、`size_t` というよく知られた型は、Crystal では以下のように定義されています。

```crystal
lib C
  {% if flag?(:x86_64) %}
    alias SizeT = UInt64
  {% else %}
    alias SizeT = UInt32
  {% end %}
end
```
