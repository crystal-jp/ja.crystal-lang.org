# ブロックのフォワーディング

捕捉したブロックをフォワーディングするには、式の先頭に `&` を付けたブロック引数を利用します。

```crystal
def capture(&block)
  block
end

def invoke(&block)
  block.call
end

proc = capture { puts "Hello" }
invoke(&proc) # prints "Hello"
```

上記の例で、`invoke` はブロックを受け取ります。このとき、`proc` をそのまま渡すことはできません。なぜなら `invoke` が受け取るのはブロック引数であり、通常の引数ではないからです。したがって、`proc` をブロック引数として渡すために、`&` を指定する必要があります。そうしなかった場合は以下のようになります。

```crystal
invoke(proc) # Error: wrong number of arguments for 'invoke' (1 for 0)
```

proc を yield するメソッドに渡すこともできます。

```crystal
def capture(&block)
  block
end

def twice
  yield
  yield
end

proc = capture { puts "Hello" }
twice &proc
```

上記は簡単に以下に書き換えることができます。

```crystal
proc = capture { puts "Hello" }
twice do
  proc.call
end
```

もしくは、`&` と `->` の構文を組み合わせることも可能です。

```crystal
twice &->{ puts "Hello" }
```

または

```crystal
def say_hello
  puts "Hello"
end

twice &->say_hello
```

## 捕捉されないブロックのフォワーディング

捕捉されないブロックをフォワーディングするには `yield` を使用します。

```crystal
def foo
  yield 1
end

def wrap_foo
  puts "Before foo"
  foo do |x|
    yield x
  end
  puts "After foo"
end

wrap_foo do |i|
  puts i
end

# Output:
# Before foo
# 1
# After foo
```

ブロックのフォワーディングに `&block` を利用することも可能ですが、その場合には最低でも入力する型を指定しておかなければいけません。また、生成されたコードがクロージャを伴うために、速度的にも遅くなってしまいます。

```crystal
def foo
  yield 1
end

def wrap_foo(&block : Int32 -> _)
  puts "Before foo"
  foo(&block)
  puts "After foo"
end

wrap_foo do |i|
  puts i
end

# Output:
# Before foo
# 1
# After foo
```

`yield` で十分な場合には、このようなブロックのフォワーディングが使わないようにしましょう。加えて、捕捉されたブロックでは `break` と `next` を使用することができない、という問題もあります。例えば、以下は `&block` でフォワーディングした場合には動作しません。

```crystal
foo_forward do |i|
  break # error
end
```

一言で言うと、`yield` を使う場合は `&block` のフォワーディングは避けるべき、ということです。
