# 構造体 (struct)

`lib` の内部で `struct` を宣言することで C の構造体を宣言できます。

```ruby
lib C
  # C では:
  #
  #  struct TimeZone {
  #    int minutes_west;
  #    int dst_time;
  #  };
  struct TimeZone
    minutes_west : Int32
    dst_time     : Int32
  end
end
```

同じ型のフィールドは複数指定することも可能です。

```ruby
lib C
  struct TimeZone
    minutes_west, dst_time : Int32
  end
end
```

再帰的な構造体は、宣言フォワーディング (forward-declare) によって宣言します。

```ruby
lib C
  # 以下が宣言フォーワーディング
  struct Node
  end

  struct Node
    node : Node*
  end
end
```

構造体のインスタンスを生成するには `new` を利用します。

```ruby
tz = C::TimeZone.new
```

これによって、スタックに構造体が割り当てられます。

C の構造体は、初期状態として、すべての値が「ゼロ」の状態になります。つまり、整数と浮動小数点数はゼロで、ポインタはゼロのアドレスを指している、などの状態です。

このように初期化されることを避けたい場合は、`::` を利用します。

```ruby
tz :: C::TimeZone
tz.minutes_west #=> 何かゴミの値
```

プロパティの設定、および参照が可能です。

```ruby
tz = C::TimeZone.new
tz.minutes_west = 1
tz.minutes_west #=> 1
```

フィールドは[名前付き引数](../default_and_named_arguments.html)と同様のシンタックスを使って初期化することもできます。

```ruby
tz = C::TimeZone.new minutes_west: 1, dst_time: 2
tz.minutes_west #=> 1
tz.dst_time     #=> 2
```

C の構造体は関数やメソッドに (コピーとして) 値渡しされます。また、メソッドから返るときも値で渡されます。

```ruby
def change_it(tz)
  tz.minutes_west = 1
end

tz = C::TimeZone.new
change_it tz
tz.minutes_west #=> 0
```

構造体のフィールドに使用可能な型の指定方法については[型文法](type_grammar.html)を参照してください。
