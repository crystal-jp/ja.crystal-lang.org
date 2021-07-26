# 代入

An assignment expression assigns a value to a named identifier (usually a variable).
The [assignment operator](operators.md#assignments) is the equals sign (`=`).

The target of an assignment can be:

* a [local variable](local_variables.md)
* an [instance variable](methods_and_instance_variables.md)
* a [class variable](class_variables.md)
* a [constant](constants.md)
* an assignment method

```crystal
# Assigns to a local variable
local = 1

# Assigns to an instance variable
@instance = 2

# Assigns to a class variable
@@class = 3

# Assigns to a constant
CONST = 4

# Assigns to a setter method
foo.method = 5
foo[0] = 6
```

### Method as assignment target

A method ending with an equals sign (`=`) is called a setter method. It can be used
as the target of an assignment. The semantics of the assignment operator apply as
a form of syntax sugar to the method call.

Calling setter methods requires an explicit receiver. The receiver-less syntax `x = y`
is always parsed as an assignment to a local variable, never a call to a method `x=`.
Even adding parentheses does not force a method call, as it would when reading from a local variable.

The following example shows two calls to a setter method in typical method notation and with assignment operator.
Both assignment expressions are equivalent.

```crystal
class Thing
  def name=(value); end
end

thing = Thing.new

thing.name=("John")
thing.name = "John"
```

The following example shows two calls to an indexed assignment method in typical method notation and with index assignment operator.
Both assignment expressions are equivalent.

```crystal
class List
  def []=(key, value); end
end

list = List.new

list.[]=(2, 3)
list[2] = 3
```

### 複合代入

[Combined assignments](operators.md#combined-assignments) are a combination of an
assignment operator and another operator.
This works with any target type except constants.

`=` を使った代入のためのシンタックスシュガーがいくつか用意されています。

```{.crystal nocheck}
local += 1  # same as: local = local + 1
```

This assumes that the corresponding target `local` is assignable, either as a variable or via the respective getter and setter methods.

The `=` operator syntax sugar is also available to setter and index assignment methods.
このとき `||` と `&&` は、 `[]?` メソッドをキーの存在のチェックに使うことに注意してください。

```crystal
person.age += 1 # person.age = person.age + 1 と同じ

person.name ||= "John" # person.name || (person.name = "John") と同じ
person.name &&= "John" # person.name && (person.name = "John") と同じ

objects[1] += 2 # objects[1] = objects[1] + 2 と同じ

objects[1] ||= 2 # objects[1]? || (objects[1] = 2) と同じ
objects[1] &&= 2 # objects[1]? && (objects[1] = 2) と同じ
```

## 連続した代入

The same value can be assigned to multiple targets using chained assignment.
This works with any target type except constants.

```crystal
a = b = c = 123

# このとき a, b, c は同じ値になる
a # => 123
b # => 123
c # => 123
```

## 多重代入

You can declare/assign multiple variables at the same time by separating expressions with a comma (`,`).
This works with any target type except constants.

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
