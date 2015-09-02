# 代入

代入にはイコール記号 (`=`) を使います。

```ruby
# ローカル変数への代入
local = 1

# インスタンス変数への代入
@instance = 2

#  クラス変数への代入
@@class = 3

# グローバル変数への代入
$global = 4
```

上記のそれぞれの変数の種類については改めて説明します。

`=` を使った代入のためのシンタックスシュガーがいくつか用意されています。

```ruby
local += 1  # local = local + 1 と同じ

# 上記は以下の演算子でも有効
# +, -, *, /, %, |, &, ^, **, <<, >>

local ||= 1 # local || (local = 1) と同じ
local &&= 1 # local && (local = 1) と同じ
```

メソッド名が `=` で終わるメソッドの実行にもシンタックスシュガーがあります。

```ruby
# セッター
person.name=("John")

# 上記は以下のように書くことができる
person.name = "John"

# インデックスを指定した代入
objects.[]=(2, 3)

# 上記は以下のように書くことができる
objects[2] = 3

# 代入ではないが、以下のシンタックスシュガーも有効
objects.[](2, 3)

# 上記は以下のように書くことができる
objects[2, 3]
```

セッターやインデックス指定代入の場合にも、`=` 演算子のシンタックスシュガーを利用できます。このとき、`||` と `&&` は、キーの存在チェックのために `[]?` メソッドを使うことに注意してください。

```ruby
person.age += 1        # person.age = person.age + 1 と同じ

person.name ||= "John" # person.name || (person.name = "John") と同じ
person.name &&= "John" # person.name && (person.name = "John") と同じ

objects[1] += 2        # objects[1] = objects[1] + 2 と同じ

objects[1] ||= 2       # objects[1]? || (objects[1] = 2) と同じ
objects[1] &&= 2       # objects[1]? && (objects[1] = 2) と同じ
```
