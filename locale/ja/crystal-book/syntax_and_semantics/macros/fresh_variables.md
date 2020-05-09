# フレッシュ変数

マクロが生成したコードは通常の Crystal パーサーでパースされます。そのとき、マクロ呼び出しのコンテキスト内のローカル変数は定義されているものとして扱われます。

例を見てみるとわかりやすいでしょう。

```crystal
macro update_x
  x = 1
end

x = 0
update_x
x # => 1
```

これは、故意にローカル変数を読み書きするコードを繰り返し書くのを避けることに有効ですが、一方で誤ってローカル変数を上書きしてしまう可能性もあります。このような自体を避けるため、フレッシュ変数と呼ばれるものを `%name` で宣言できます。

```crystal
macro dont_update_x
  %x = 1
  puts %x
end

x = 0
dont_update_x # outputs 1
x             # => 0
```

上記の例では `%x` として変数を宣言しています。こうすることで、現在のスコープのローカル変数と名前が衝突しないことを保証できます。

また、`%var{key1, key2, ..., keyN}` を使うことで、他の AST ノードに結びついたフレッシュ変数を宣言することもできます。例をあげます。

```crystal
macro fresh_vars_sample(*names)
  # まず変数を宣言する
  {% for name, index in names %}
    print "Declaring: ", "%name{index}", '\n'
    %name{index} = {{index}}
  {% end %}

  # それから出力する
  {% for name, index in names %}
    print "%name{index}: ", %name{index}, '\n'
  {% end %}
end

fresh_vars_sample a, b, c

# 出力例:
# Declaring: __temp_255
# Declaring: __temp_256
# Declaring: __temp_257
# __temp_255: 0
# __temp_256: 1
# __temp_257: 2
```

上記の例では、3つのインデックスされた変数を宣言し、値を代入して、それから各インデックスについて対応する値を表示しています。
