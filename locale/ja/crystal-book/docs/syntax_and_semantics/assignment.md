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

### One-to-many assignment

代入式の右辺に1つしか式が無かった場合、次の例のように各変数に順にインデックスして代入していきます。

```crystal
name, age, source = "Crystal, 123, GitHub".split(", ")

# 上記は以下に同じ
temp = "Crystal, 123, GitHub".split(", ")
name = temp[0]
age = temp[1]
source = temp[2]
```

Additionally, if the [`strict_multi_assign` flag](compile_time_flags.md) is provided, the number of elements must match the number of targets, and the right-hand side must be an [`Indexable`](https://crystal-lang.org/api/Indexable.html):

```crystal
name, age, source = "Crystal, 123, GitHub".split(", ")

# The above is the same as this:
temp = "Crystal, 123, GitHub".split(", ")
if temp.size != 3 # number of targets
  raise IndexError.new("Multiple assignment count mismatch")
end
name = temp[0]
age = temp[1]
source = temp[2]

a, b = {0 => "x", 1 => "y"} # Error: right-hand side of one-to-many assignment must be an Indexable, not Hash(Int32, String)
```

### Splat assignment

The left-hand side of an assignment may contain one splat, which collects any values not assigned to the other targets. A [range](literals/range.md) index is used if the right-hand side has one expression:

```crystal
head, *rest = [1, 2, 3, 4, 5]

# Same as:
temp = [1, 2, 3, 4, 5]
head = temp[0]
rest = temp[1..]
```

Negative indices are used for targets after the splat:

```crystal
*rest, tail1, tail2 = [1, 2, 3, 4, 5]

# Same as:
temp = [1, 2, 3, 4, 5]
rest = temp[..-3]
tail1 = temp[-2]
tail2 = temp[-1]
```

If the expression does not have enough elements and the splat appears in the middle of the targets, [`IndexError`](https://crystal-lang.org/api/IndexError.html) is raised:

```crystal
a, b, *c, d, e, f = [1, 2, 3, 4]

# Same as:
temp = [1, 2, 3, 4]
if temp.size < 5 # number of non-splat assignment targets
  raise IndexError.new("Multiple assignment count mismatch")
end
# note that the following assignments would incorrectly not raise if the above check is absent
a = temp[0]
b = temp[1]
c = temp[2..-4]
d = temp[-3]
e = temp[-2]
f = temp[-1]
```

The right-hand side expression must be an [`Indexable`](https://crystal-lang.org/api/Indexable.html). Both the size check and the `Indexable` check occur even without the `strict_multi_assign` flag (see [One-to-many assignment](#one-to-many-assignment) above).

A [`Tuple`](https://crystal-lang.org/api/Tuple.html) is formed if there are multiple values:

```crystal
*a, b, c = 3, 4, 5, 6, 7

# Same as:
temp1 = {3, 4, 5}
temp2 = 6
temp3 = 7
a = temp1
b = temp2
c = temp3
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

Assignments to `*_` are dropped altogether, so multiple assignments can be used to extract the first and last elements in a value efficiently, without creating an intermediate object for the elements in the middle:

```crystal
first, *_, last = "127.0.0.1".split(".")

# Same as:
temp = "127.0.0.1".split(".")
if temp.size < 2
  raise IndexError.new("Multiple assignment count mismatch")
end
first = temp[0]
last = temp[-1]
```
