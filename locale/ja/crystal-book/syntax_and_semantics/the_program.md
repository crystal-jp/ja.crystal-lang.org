# プログラム

プログラムはそれ自体がグローバルオブジェクトです。その中で、型やメソッド、そしてファイルローカルな変数の定義を行うことができます。

```crystal
# プログラムにメソッドを定義
def add(x, y)
  x + y
end

# プログラムでメソッドを呼び出す
add(1, 2) # => 3
```

メソッドでは、その最後の式の値がメソッドの値となります。したがって、明示的に`return`を書く必要はありません。ただ、明示的に`return`を書くことも可能です。

```crystal
def even?(num)
  if num % 2 == 0
    return true
  end

  return false
end
```

`add(1, 2)` のように、レシーバを指定せずにメソッドを呼び出したとき、そのメソッドが現在の型やその継承元に見つからなかった場合は、プログラムから探索されます。

```crystal
def add(x, y)
  x + y
end

class Foo
  def bar
    # プログラムの add メソッドを実行
    add(1, 2)

    # Foo の baz メソッドを実行
    baz(1, 2)
  end

  def baz(x, y)
    x * y
  end
end
```

プログラムに定義されたメソッドを呼び出したいけれど、現在の型にも同名のメソッドが定義されているときは、`::`をプレフィックスにして呼び出すことができます。

```crystal
def baz(x, y)
  x + y
end

class Foo
  def bar
    baz(4, 2)   # => 2
    ::baz(4, 2) # => 6
  end

  def baz(x, y)
    x - y
  end
end
```

プログラムに定義された変数に対して、メソッドの中からアクセスすることはできません。

```crystal
x = 1

def add(y)
  x + y # error: undefined local variable or method 'x'
end

add(2)
```

メソッド実行時のカッコは省略することができます。

```crystal
add 1, 2 # add(1, 2) と同じ
```

## メインとなるコード

コンパイルされたプログラムを実行する際に実行される部分のコードは、ソースコードに直接書きます。"main" メソッドのような特別なメソッドに含める必要はありません。

```crystal
# "Hello Crystal!" と表示するプログラム
puts "Hello Crystal!"
```

メインとなるコードは型定義の中に現れる場合もあります。

```crystal
# "Hello" と表示するプログラム
class Hello
  # ここでの 'self' は Hello クラス
  puts self
end
```
