# アノテーション

アノテーションを使うとソースコードに特定の機能に関するメタデータを追加することができます。型、メソッド、そしてインスタンス変数にアノテーションを与えることができます。標準ライブラリの [JSON::Field](https://crystal-lang.org/api/latest/JSON/Field.html) のようなユーザ定義のアノテーションは `annotation` キーワードで定義されます。いくつかの[組み込みアノテーション](built_in_annotations.md)はコンパイラによって提供されます。

ユーザーは `class` や `struct` を定義するのと同じように、独自のアノテーションを `annotation` キーワードを使って定義できます。

```crystal
annotation MyAnnotation
end
```

アノテーションは次のものに与えることができます。

* インスタンスメソッドとクラスメソッド
* インスタンス変数
* クラス、構造体、列挙型、そしてモジュール

```crystal
annotation MyAnnotation
end

@[MyAnnotation]
def foo
  "foo"
end

@[MyAnnotation]
class Klass
end

@[MyAnnotation]
module MyModule
end
```

## 応用

アノテーションはインスタンス変数や型、メソッドにメタデータを与えるのに最適な機能です。そして、そうして与えたメタデータはコンパイル時にマクロを使って読み出すことができます。アノテーションの主な利点の一つはインスタンス変数やメソッドに直接適用できるということです。これによって、プロパティやメソッドを作るために標準のマクロを使う必要がなく、クラスがより自然に見えるようになります。

アノテーションのいくつかの応用例:

### オブジェクトのシリアライズ

インスタンス変数がどのように、どんなキーとしてシリアライズされるかを決めるために、アノテーションを使うことができます。Crystal の [`JSON::Serializable`](https://crystal-lang.org/api/latest/JSON/Serializable.html) と [`YAML::Serializable`](https://crystal-lang.org/api/latest/YAML/Serializable.html) はそのようなアノテーションの例です。

### ORM

アノテーションを、プロパティをORMのカラムに指定するために使うことができます。インスタンス変数の型と名前は `TypeNode` から読み出すことができます。これによってORMに固有のマクロを無くすことができます。また、nilを許容することや、カラムの名前、主キーかどうかなどのカラムに関するメタデータをアノテーション自身に格納することもできます。

## フィールド

アノテーションにデータを格納することができます。

```crystal
annotation MyAnnotaion
end

# フィールドはキー/値のペアにできる
@[MyAnnotation(key: "value", value: 123)]

# 位置指定でもよい
@[MyAnnotation("foo", 123, false)]
```

### キー/値

アノテーションの格納したキー/値のペアはコンパイル時に [`[]`](https://crystal-lang.org/api/latest/Crystal/Macros/Annotation.html#%5B%5D%28name%3ASymbolLiteral%7CStringLiteral%7CMacroId%29%3AASTNode-instance-method) メソッド経由でアクセスできます。

```crystal
annotation MyAnnotation
end

@[MyAnnotation(value: 2)]
def annotation_value
  # キー名は `String`、`Symbol` もしくは `MacroId` の必要があります
  {{ @def.annotation(MyAnnotation)[:value] }}
end

annotation_value # => 2
```

`named_args` メソッドを使うと、アノテーションのすべてのキー/値のペアを `NamedTupleLiteral` として取得できます。このメソッドはデフォルトですべてのアノテーションに定義されていて、その結果は各アノテーションごとに一意です。

```crystal
annotation MyAnnotation
end

@[MyAnnotation(value: 2, name: "Jim")]
def annotation_named_args
  {{ @def.annotation(MyAnnotation).named_args }}
end

annotation_named_args # => {value: 2, name: "Jim"}
```

このメソッドは `NamedTupleLiteral` を返すので、この型の持つすべての[メソッド](https://crystal-lang.org/api/latest/Crystal/Macros/NamedTupleLiteral.html)が使えます。特に `#double_splat` を使うと、アノテーションの引数をメソッドに渡すのは容易になるでしょう。

```crystal
annotation MyAnnotation
end

class SomeClass
  def initialize(@value : Int32, @name : String); end
end

@[MyAnnotation(value: 2, name: "Jim")]
def new_test
  {% begin %}
    SomeClass.new {{ @def.annotation(MyAnnotation).named_args.double_splat }}
  {% end %}
end

new_test # => #<SomeClass:0x5621a19ddf00 @name="Jim", @value=2>
```

### 位置指定

位置指定の値もコンパイル時に [`[]`](<https://crystal-lang.org/api/latest/Crystal/Macros/Annotation.html#%5B%5D%28index%3ANumberLiteral%29%3AASTNode-instance-method>) メソッドによってアクセスできます。しかし、一度に1つのインデックスにアクセスすることしかできません。

```crystal
annotation MyAnnotation
end

@[MyAnnotation(1, 2, 3, 4)]
def annotation_read
  {% for idx in [0, 1, 2, 3, 4] %}
    {% value = @def.annotation(MyAnnotation)[idx] %}
    pp "{{ idx }} = {{ value }}"
  {% end %}
end

annotation_read

# このように表示されます
"0 = 1"
"1 = 2"
"2 = 3"
"3 = 4"
"4 = nil"
```

`args` メソッドを使うと、アノテーションのすべての位置指定の引数を `TupleLiteral` として取得できます。このメソッドはデフォルトですべてのアノテーションに定義されていて、その結果は各アノテーションごとに一意です。

```crystal
annotation MyAnnotation
end

@[MyAnnotation(1, 2, 3, 4)]
def annotation_args
  {{ @def.annotation(MyAnnotation).args }}
end

annotation_args # => {1, 2, 3, 4}
```

戻り値の型の `TupleLiteral` はイテレート可能なので、以前の例をより良い方法で書き直すことができます。By extension, all of the [methods](https://crystal-lang.org/api/latest/Crystal/Macros/TupleLiteral.html) on `TupleLiteral` are available for use as well.

```crystal
annotation MyAnnotation
end

@[MyAnnotation(1, "foo", true, 17.0)]
def annotation_read
  {% for value, idx in @def.annotation(MyAnnotation).args %}
    pp "{{ idx }} = #{{{ value }}}"
  {% end %}
end

annotation_read

# このように表示されます
"0 = 1"
"1 = foo"
"2 = true"
"3 = 17.0"
```

## 読み出し方法

アノテーションは [`TypeNode`](https://crystal-lang.org/api/latest/Crystal/Macros/TypeNode.html)、[`Def`](https://crystal-lang.org/api/latest/Crystal/Macros/Def.html)、そして [`MetaVar`](https://crystal-lang.org/api/latest/Crystal/Macros/MetaVar.html) から `.annotation(type : TypeNode)` メソッドを使うことで読み出せます。このメソッドは与えられた型の適用されたアノテーションを表す [`Annotation`](https://crystal-lang.org/api/master/Crystal/Macros/Annotation.html) オブジェクトを返します。

!!! note
    もし複数の同じ型のアノテーションが適用されていた場合、 `.annotation` メソッドは_最後_のものを返します。

[`@type`](../macros/#type-information) と [`@def`](../macros/#method-information) という変数は `TypeNode` あるいは `Def` オブジェクトなので `.annotation` メソッドを使ってアノテーションを取得できます。もちろん、`TypeNode` のその他のメソッドから取得した `TypeNode` もしくは `Def` 型のオブジェクトから取得することもできます。例えば `TypeNode.all_subclasses` もしくは `TypeNode.methods` といったメソッドがあります。

`TypeNode.instance_vars` を使うとインスタンス変数を表す `MetaVar` の配列が取得できます。そして、これらのオブジェクトからそのインスタンス変数に与えられたアノテーションを取得することができます。

!!! note
     `TypeNode.instance_vars` は今のところ、インスタンス/クラスメソッドのコンテキストでのみ動作します。

```crystal
annotation MyClass
end

annotation MyMethod
end

annotation MyIvar
end

@[MyClass]
class Foo
  pp {{ @type.annotation(MyClass).stringify }}

  @[MyIvar]
  @num : Int32 = 1

  @[MyIvar]
  property name : String = "jim"

  def properties
    {% for ivar in @type.instance_vars %}
      pp {{ ivar.annotation(MyIvar).stringify }}
    {% end %}
  end
end

@[MyMethod]
def my_method
  pp {{ @def.annotation(MyMethod).stringify }}
end

Foo.new.properties
my_method
pp {{ Foo.annotation(MyClass).stringify }}

# このように表示されます
"@[MyClass]"
"@[MyIvar]"
"@[MyIvar]"
"@[MyMethod]"
"@[MyClass]"
```

### 複数のアノテーションを読み出す

同じ型のアノテーションが1つのインスタンス変数、メソッド、型に適用されていたとき、`.annotations(type : TypeNode)` メソッドが使えます。これは `.annotation(type : TypeNode)` がするように動作しますが、`ArrayLiteral(Annotation)` を返します。

```crystal
annotation MyAnnotation
end

@[MyAnnotation("foo")]
@[MyAnnotation(123)]
@[MyAnnotation(123)]
def annotation_read
  {% for ann, idx in @def.annotations(MyAnnotation) %}
    pp "Annotation {{ idx }} = {{ ann[0].id }}"
  {% end %}
end

annotation_read

# このように表示されます
"Annotation 0 = foo"
"Annotation 1 = 123"
"Annotation 2 = 123"
```
