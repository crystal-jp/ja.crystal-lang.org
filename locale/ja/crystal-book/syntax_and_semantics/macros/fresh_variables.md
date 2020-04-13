# Fresh variables

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

This can sometimes be useful to avoid repetitive code by deliberately reading/writing local variables, but can also overwrite local variables by mistake. To avoid this, fresh variables can be declared with `%name`:

```crystal
macro dont_update_x
  %x = 1
  puts %x
end

x = 0
dont_update_x # outputs 1
x             # => 0
```

Using `%x` in the above example, we declare a variable whose name is guaranteed not to conflict with local variables in the current scope.

Additionally, fresh variables with respect to some other AST node can be declared with `%var{key1, key2, ..., keyN}`. 例をあげます。

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

# Sample output:
# Declaring: __temp_255
# Declaring: __temp_256
# Declaring: __temp_257
# __temp_255: 0
# __temp_256: 1
# __temp_257: 2
```

In the above example, three indexed variables are declared, assigned values, and then printed, displaying their corresponding indices.
