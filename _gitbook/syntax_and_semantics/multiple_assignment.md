# 多重代入

複数の式をカンマ記号 (`,`) で区切って代入すると、複数の変数に対して同時に宣言/代入を行うことができます (多重代入) 。

```ruby
name, age = "Crystal", 1

# 上記は以下と同じ
temp1 = "Crystal"
temp2 = 1
name  = temp1
age   = temp2
```

また、式は一時的な変数に代入される仕組みになっているため、次のように1行で変数の値を交換することも可能です。

```ruby
a = 1
b = 2
a, b = b, a
a #=> 2
b #=> 1
```

もし代入文の右辺に1つの式しかないときにはどうなるのでしょうか。その場合には、インデックスを持つ型だと解釈され、以下のシンタックスシュガーが適用されます。

```
name, age, source = "Crystal,1,github".split(",")

# 上記は以下と同じ
temp = "Crystal,1,github".split(",")
name   = temp[0]
age    = temp[1]
source = temp[2]
```

それでは、もし左辺に1つの変数しかないときはどうでしょうか。その場合には、右辺が配列であると解釈されます。

```ruby
names = "John", "Peter", "Jack"

# 上記は以下と同じ
names = ["John", "Peter", "Jack"]
```

多重代入は、メソッド名が `=` で終わるメソッドに対しても有効です。

```ruby
person.name, person.age = "John", 32

# 上記は以下と同じ
temp1 = "John"
temp2 = 32
person.name = temp1
person.age = temp2
```

インデックス指定の代入 (`[]=`) の場合にも同様に有効です。

```ruby
objects[1], objects[2] = 3, 4

# 上記は以下と同じ
temp1 = 3
temp2 = 4
objects[1] = temp1
objects[2] = temp2
```
