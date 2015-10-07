# フレッシュな変数

マクロが生成したコードは通常の Crystal パーサーでパースされます。そのとき、マクロ呼び出しのコンテキスト内のローカル変数は定義されているものとして扱われます。

例を見てみるとわかりやすいでしょう。

```ruby
macro update_x
  x = 1
end

x = 0
update_x
x #=> 1
```

これは、ローカル変数にアクセスし読み書きする際にコードを繰り返し書くのを避けることに有効ですが、一方で誤ってローカル変数を上書きしてしまう可能性もあります。そこで、`%name` でフレッシュな変数を利用することができるようになっています。

```ruby
macro dont_update_x
  %x = 1
  puts %x
end

x = 0
dont_update_x # 1を出力
x #=> 0
```

上記の例では `%x` として変数を宣言しています。こうすることで、現在のスコープのローカル変数と名前が衝突しないことを保証できます。

また、`%var{key1, key2, ..., keyN}` を使うことで、他の AST ノードに結びついたフレッシュな変数を宣言することが可能です。例をあげます。

```ruby
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

上記の例では、3つの変数を宣言しインデックスに紐付けています。それから出力をしていますが、そのときに同じインデックスで変数を参照しています。
