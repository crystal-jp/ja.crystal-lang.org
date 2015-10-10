# プログラム

プログラムはそれ自体がグローバルオブジェクトです。その中で、型やメソッド、そしてファイルローカルな変数の定義を行うことができます。

```crystal
# プログラムにメソッドを定義
def add(x, y)
  x + y
end

# プログラムで add メソッドを実行
add(1, 2) #=> 3
```

メソッドでは、その最後の式の値がメソッドの値となります。したがって、明示的に `return` を書く必要はありません。ただ、明示的に `return` を書くことも可能です。

```crystal
def even?(num)
  if num % 2 == 0
    return true
  end

  return false
end
```

例えば `add(1, 2)` など、レシーバを指定せずにメソッドを実行したとき、もしそのメソッドが自身の型とその継承元に見つからなかった場合は、プログラム内を探索します。

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

プログラムに定義されたメソッドを実行したいけれど、自身の型にも同名のメソッドが定義されている場合には、`::` をプレフィックスに与えることで実行できます。

```crystal
def baz(x, y)
  x + y
end

class Foo
  def bar
    baz(4, 2) #=> 2
    ::baz(4, 2) #=> 6
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
