# Variables

Variables exposed by a C library can be declared inside a `lib` declaration using a global-variable-like declaration:

```crystal
lib C
  $errno : Int32
end
```

そして、以下のように参照と設定ができます。

```crystal
C.errno # => some value
C.errno = 0
C.errno # => 0
```

変数は属性を付与することでスレッドローカルにすることが可能です。

```crystal
lib C
  @[ThreadLocal]
  $errno : Int32
end
```

Refer to the [type grammar](../type_grammar.html) for the notation used in external variables types.
