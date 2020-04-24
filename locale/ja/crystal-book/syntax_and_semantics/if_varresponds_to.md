# if var.responds_to?(...)

If an `if`'s condition is a `responds_to?` test, in the `then` branch the type of a variable is guaranteed to be restricted to the types that respond to that method:

```crystal
if a.responds_to?(:abs)
  # here a's type will be reduced to those responding to the 'abs' method
end
```

Additionally, in the `else` branch the type of the variable is guaranteed to be restricted to the types that don’t respond to that method:

```crystal
a = some_condition ?1 : "hello"
# a : Int32 | String

if a.responds_to?(:abs)
  # Int32#abs は存在するが String#abs は存在しないので、ここでは Int32 となる
else
  # here a will be String
end
```

そしてこれはインスタンス変数やクラス変数では**機能しません**。それらの場合には、まず変数への代入を行ってください。

```crystal
if @a.responds_to?(:abs)
  # here @a is not guaranteed to respond to `abs`
end

a = @a
if a.responds_to?(:abs)
  # here a is guaranteed to respond to `abs`
end

# A bit shorter:
if (a = @a).responds_to?(:abs)
  # ここでは a が `abs` に応答することが保証される
end
```

