# ブロックのフォワーディング

捕捉したブロックをフォワーディングするには、先頭文字が `&` のブロック引数を利用します。

```ruby
def capture(&block)
  block
end

def invoke(&block)
  block.call
end

proc = capture { puts "Hello" }
invoke(&proc) # "Hello" を表示
```

上記の例で、`invoke` はブロックを受け取ります。このとき、`proc` をそのまま渡すことはできません。なぜなら `invoke` が受け取るのはブロック引数であり、通常の引数ではないからです。したがって、`proc` をブロック引数として渡すために `&` を指定する必要があります。そうしなかった場合は以下のようになります。

```ruby
invoke(proc) # Error: wrong number of arguments for 'invoke' (1 for 0)
```

proc を yield するメソッドに渡すこともできます。

```ruby
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

上記は単純に以下に書き換えることができます。

```ruby
proc = capture { puts "Hello" }
twice do
  proc.call
end
```

`&` と `->` のシンタックスを組み合わせることも可能です。

```ruby
twice &->{ puts "Hello" }
```

または

```ruby
def say_hello
  puts "Hello"
end

twice &->say_hello
```

## 捕捉されないブロックのフォワーディング

捕捉されないブロックをフォワーディングするには `yield` を使用します。

```ruby
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

# 出力:
# Before foo
# 1
# After foo
```

ブロックのフォワーディングに `&block` を利用することも可能ですが、その場合には最低でも入力する型を指定しておかなければいけません。また、生成されたコードがクロージャを伴うため、速度的にも遅くなってしまいます。

```ruby
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

# 出力:
# Before foo
# 1
# After foo
```

もし `yield` で十分な場合には、このようなブロックのフォワーディングは使わないようにしましょう。加えて、捕捉されたブロックでは `break` と `next` を使用することができないという問題もあります。例えば、以下は `&block` でフォワーディングした場合には動作しません。

```ruby
foo_forward do |i|
  break # error
end
```

一言で言うと、`yield` を伴うときには `&block` のフォワーディングは避けるべき、ということです。
