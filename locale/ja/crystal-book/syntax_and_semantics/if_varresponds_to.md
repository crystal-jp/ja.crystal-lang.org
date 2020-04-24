# if var.responds_to?(...)

 `if`の条件で`responds_to?`によるチェックを行なうと、`then`節ではその変数がそのメソッドを持つ型に制限されていることが保証されます。

```crystal
if a.responds_to?(:abs)
  # ここで a の型は 'abs' メソッドを持つ型のみに縮小されている
end
```

くわえて、`else`節では変数がそのメソッドを持たないような型であることが保証されます。

```crystal
a = some_condition ? 1 : "hello"
# a : Int32 | String

if a.responds_to?(:abs)
  # Int32#abs は存在するが String#abs は存在しないので、ここでは Int32 となり、
else
  # ここでは a は String となる
end
```

そしてこれはインスタンス変数やクラス変数では**機能しません**。それらの場合には、まず変数への代入を行ってください。

```crystal
if @a.responds_to?(:abs)
  # ここでも @a は `abs` メソッドを持つことが保証されない
end

a = @a
if a.responds_to?(:abs)
  # ここでは a が `abs` メソッドを持つことが保証されます
end

# より簡潔な書き方:
if (a = @a).responds_to?(:abs)
  # ここでは a が `abs` に応答することが保証される
end
```

