# ユニオン型

変数や式の型は複数の式から構成されることがあります。これをユニオン型と呼びます。例えば、異なる[if](if.html)の分岐節で同じ変数に代入したときを考えます。

```crystal
if 1 + 2 == 3
  a = 1
else
  a = "hello"
end

a # : Int32 | String
```

if 式の終わりでは、`a` は `Int32 | String` という型になります。この型は「Int32 と String のユニオン型」を表します。ユニオン型はコンパイラによって自動的に作られます。実行時には `a` はただ1つの型の値になります。この型は `class` メソッドを呼び出すことで確認できます。

```crystal
# 実行時の型
a.class # => Int32
```

コンパイル時の型は [typeof](typeof.html) を使うことで確認できます。

```crystal
# コンパイル時の型
typeof(a) # => Int32 | String
```

ユニオン型はいくらでもたくさんの型から構成することができます。ユニオン型の式に対してメソッドを呼び出すとき、ユニオン型の中のすべての型でそのメソッドが飛び出せる必要があります。そうでなければコンパイル時にエラーとなります。また、その呼び出しの型は、すべての型での呼び出し結果の型のユニオン型になります。

```crystal
# to_s は Int32 と String で定義されていて、どちらも String を返す
a.to_s # => String

a + 1 # String#+(Int32) は存在しないのでエラーになる
```

コンパイル時に、変数をユニオン型として定義するには次のようにします。

```crystal
# コンパイル時の型を設定する
a = 0.as(Int32 | Nil | String)
typeof(a) # => Int32 | Nil | String
```

## ユニオン型に関する規則

一般的に、`T1` と `T2` からユニオン型を構成するとき、その結果のユニオン型は `T1 | T2` となります。ですが、いくつかの場合にそれとは異なる型になることがあります。

### 継承元の同じクラス/構造体のユニオン型

`T1` と `T2` が継承元を共有していて、共通する祖先の型 `Parent` が `Reference`、`Struct`、`Int`、`Float` もしくは `Value` ではないとき、2つからユニオン型を構成しようとしたときの結果の型は `Parent+` となります。この型はバーチャル型と呼ばれるものです。コンパイラはこれを、`Parent` もしくはそのサブクラスを表すものと見なします。

例をあげます。

```crystal
class Foo
end

class Bar < Foo
end

class Baz < Foo
end

bar = Bar.new
baz = Baz.new

# ここで foo の型は Bar | Baz となりそうだが、
# Bar も Baz も Foo を継承しているので、
# 結果的に型は Foo+ となる。
foo = rand < 0.5 ? bar : baz
typeof(foo) # => Foo+
```

### 同じ大きさのタプルのユニオン型

同じ大きさのタプル同士のユニオン型は、タプルの各型のユニオン型を取ったものになります。

例をあげます。

```crystal
t1 = {1, "hi"}   # Tuple(Int32, String)
t2 = {true, nil} # Tuple(Bool, Nil)

t3 = rand < 0.5 ? t1 : t2
typeof(t3) # Tuple(Int32 | Bool, String | Nil)
```

### キーの同じ名前付きタプルのユニオン型

キーの同じ(順序は考慮しない)名前付きタプル同士のユニオン型は、名前付きタプルの対応するキーの型同士のユニオン型となります。キーの順序は左辺の型の順序のものとなります。

例をあげます。

```crystal
t1 = {x: 1, y: "hi"}   # Tuple(x: Int32, y: String)
t2 = {y: true, x: nil} # Tuple(y: Bool, x: Nil)

t3 = rand < 0.5 ? t1 : t2
typeof(t3) # NamedTuple(x: Int32 | Nil, y: String | Bool)
```
