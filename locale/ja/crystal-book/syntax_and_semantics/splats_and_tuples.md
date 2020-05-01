# スプラット展開とタプル

メソッドは *スプラット展開* (`*`) を使うことで複数の引数を一度に受け取ることができます。これは仮引数の中で1回だけしか指定できませんが、順序を問わずにどの場所にでも指定可能です。

```crystal
def sum(*elements)
  total = 0
  elements.each do |value|
    total += value
  end
  total
end

sum 1, 2, 3      # => 6
sum 1, 2, 3, 4.5 # => 10.5
```

渡された引数はメソッドの中で [タプル](http://crystal-lang.org/api/Tuple.html) として扱うことができます。

```crystal
# elements は Tuple(Int32, Int32, Int32) になる
sum 1, 2, 3

# elements は Tuple(Int32, Int32, Int32, Float64) になる
sum 1, 2, 3, 4.5
```

仮引数でスプラット指定された引数のあとの引数は、名前付き引数としてのみ渡すことができます。

```crystal
def sum(*elements, initial = 0)
  total = initial
  elements.each do |value|
    total += value
  end
  total
end

sum 1, 2, 3              # => 6
sum 1, 2, 3, initial: 10 # => 16
```

スプラット指定された引数のあとの引数でデフォルト値が無い場合は、名前付き引数として渡さなければいけない引数となります。

```crystal
def sum(*elements, initial)
  total = initial
  elements.each do |value|
    total += value
  end
  total
end

sum 1, 2, 3              # Error, missing argument: initial
sum 1, 2, 3, initial: 10 # => 16
```

2つの引数の名前のみが違うメソッドはおたがいにオーバーロードされています。

```crystal
def foo(*elements, x)
  1
end

def foo(*elements, y)
  2
end

foo x: "something" # => 1
foo y: "something" # => 2
```

splat 指定された引数は名前をつけないこともできて、その場合、以降の引数は「名前付き引数として渡さなければいけない」ということになります。

```crystal
def foo(x, y, *, z)
end

foo 1, 2, 3    # Error, wrong number of arguments (given 3, expected 2)
foo 1, 2       # Error, missing argument: z
foo 1, 2, z: 3 # OK
```

## タプルのスプラット展開

`タプル` はメソッド呼び出しで `*` を使うことで引数に展開されて渡されます。

```crystal
def foo(x, y)
  x + y
end

tuple = {1, 2}
foo *tuple # => 3
```

## 二重スプラット展開と名前付きタプル

二重スプラット展開 (`**`) はその他の引数にマッチしなかったすべての名前付き引数をキャプチャします。この引数の型は `NamedTuple` となります。

```crystal
def foo(x, **other)
  # NamedTuple としてキャプチャした名前付き引数を返す
  other
end

foo 1, y: 2, z: 3    # => {y: 2, z: 3}
foo y: 2, x: 1, z: 3 # => {y: 2, z: 3}
```

## 名前付きタプルの二重スプラット

`NamedTuple` はメソッド呼び出しで `**` を使うことで引数に展開されて渡されます。

```crystal
def foo(x, y)
  x - y
end

tuple = {y: 3, x: 10}
foo **tuple # => 7
```
