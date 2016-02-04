# if 変数.responds_to?(...)

`if` の条件で `responds_to?` によるチェックを行うと、`then` 節での変数の型に対して、そのメソッドに応答するものであることを制限し保証することができます。

```crystal
if a.responds_to?(:abs)
  # ここでは、a の型は必ず 'abs' メソッドに応答するものに制限される
end
```

一方このとき、`else` 節の中ではそのメソッドに応答「しない」型であることが保証されます。

```crystal
a = some_condition ? 1 : "hello"
# a : Int32 | String

if a.responds_to?(:abs)
  # Int32#abs は存在するが String#abs は存在しないので、ここでは Int32 となる
else
  # ここでは String となる
end
```

ただ、インスタンス変数、クラス変数、そしてグローバル変数の場合には、上記が **当てはまらない** ことに注意してください。それらの場合には、まず変数への代入を行ってください。

```crystal
if @a.responds_to?(:abs)
  # ここでは @a が `abs` に応答することが保証「されない」
end

a = @a
if a.responds_to?(:abs)
  # ここでは a が `abs` に応答することが保証される
end

# より簡潔な書き方
if (a = @a).responds_to?(:abs)
  # ここでは a が `abs` に応答することが保証される
end
```

