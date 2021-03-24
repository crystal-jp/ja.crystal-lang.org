# 代入

代入にはイコール記号 (`=`) を使います。

```crystal
# ローカル変数への代入
local = 1

# インスタンス変数への代入
@instance = 2

# クラス変数への代入
@@class = 3
```

上記のそれぞれの変数の種類については改めて説明します。

`=` を使った代入のためのシンタックスシュガーがいくつか用意されています。

```crystal
local += 1  # local = local + 1 と同じ

# 上記は以下の演算子でも有効
# +, -, *, /, %, |, &, ^, **, <<, >>

local ||= 1 # local || (local = 1) と同じ
local &&= 1 # local && (local = 1) と同じ
```

メソッド名が `=` で終わるメソッドの実行にもシンタックスシュガーがあります。

```crystal
# セッターメソッドの呼び出し
person.name=("John")

# 上記は次ように書ける
person.name = "John"

# インデックスに対する代入
objects.[]=(2, 3)

# 上記は次のように書ける
objects[2] = 3

# 代入とは関係ないけれど、こういうシンタックスシュガーも
objects.[](2, 3)

# 上記は次のように書ける
objects[2, 3]
```

`=` のシンタックスシュガーはセッターやインデックス代入に対しても有効です。このとき `||` と `&&` は、 `[]?` メソッドをキーの存在のチェックに使うことに注意してください。

```crystal
person.age += 1 # person.age = person.age + 1 と同じ

person.name ||= "John" # person.name || (person.name = "John") と同じ
person.name &&= "John" # person.name && (person.name = "John") と同じ

objects[1] += 2 # objects[1] = objects[1] + 2 と同じ

objects[1] ||= 2 # objects[1]? || (objects[1] = 2) と同じ
objects[1] &&= 2 # objects[1]? && (objects[1] = 2) と同じ
```

## 連続した代入

連続した代入を用いることで、同じ値を複数の変数に一度に代入することができます。

```crystal
a = b = c = 123

# このとき a, b, c は同じ値になる
a # => 123
b # => 123
c # => 123
```

連続した代入は[ローカル変数](local_variables.md)に限らず[インスタンス変数](methods_and_instance_variables.md)や[クラス変数](class_variables.md)、セッターメソッド (名前が `=` で終わるメソッド) に対して利用できます。

## 多重代入

複数の式をカンマ記号 (`,`) で区切って代入すると、複数の変数に対して同時に宣言/代入を行うことができます。

```crystal
name, age = "Crystal", 1

# 上記は以下と同じ
temp1 = "Crystal"
temp2 = 1
name = temp1
age = temp2
```

また、式は一時的な変数に代入される仕組みになっているため、次のように1行で変数の値を交換することも可能です。

```crystal
a = 1
b = 2
a, b = b, a
a # => 2
b # => 1
```

代入式の右辺に1つしか式が無かった場合、次の例のように各変数に順にインデックスして代入していきます。

```crystal
name, age, source = "Crystal, 123, GitHub".split(", ")

# 上記は以下に同じ
temp = "Crystal, 123, GitHub".split(", ")
name = temp[0]
age = temp[1]
source = temp[2]
```

多重代入は名前が`=`で終わるメソッドに対しても有効です。

```crystal
person.name, person.age = "John", 32

# 以下に同じ
temp1 = "John"
temp2 = 32
person.name = temp1
person.age = temp2
```

そして、[インデックス指定の代入](operators.md#assignments) (`[]=`) の場合にも同様に有効です。

```crystal
objects[1], objects[2] = 3, 4

#以下に同じ
temp1 = 3
temp2 = 4
objects[1] = temp1
objects[2] = temp2
```

## アンダースコア

アンダースコアを任意の代入の左辺に置くことができます。この代入には副作用がなく、代入した値を読み出すこともできません。

```crystal
_ = 1     # 副作用なし
_ = "123" # 副作用なし
puts _    # Error: can't read from _
```

これは多重代入で、右辺のいくつかの値は重要ではないようなときに役に立ちます。

```crystal
before, _, after = "main.cr".partition(".")

# 上記は以下と同じ
temp = "main.cr".partition(".")
before = temp[0]
_ = temp[1] # この行は副作用がない
after = temp[2]
```
