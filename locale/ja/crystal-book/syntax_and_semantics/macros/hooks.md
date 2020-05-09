# フック

ある状況においてコンパイル時に呼び出される、フックという特別なマクロがあります。
* `inherited` はサブクラスが定義された際に呼び出されます。`@type` は継承されたサブクラスの型となります。
* `included` はモジュールがインクルードされたときに呼び出されます。`@type` はインクルードする側の型となります。
* `extended` はモジュールが extend されたときに呼び出されます。`@type` は extend する側の型になります。
* `method_missing` はメソッドが見つからないときに呼び出されます。
* `method_added` は現在のスコープに新しいメソッドが定義されたときに呼び出されます。
* `finished` はすべてのクラスのインスタンス変数が判明したあとのタイミングで呼び出されます。

`inherited` の例です。

```crystal
class Parent
  macro inherited
    def lineage
      "{{@type.name.id}} < Parent"
    end
  end
end

class Child < Parent
end

Child.new.lineage # => "Child < Parent"
```

`method_missing` の例です。

```crystal
macro method_missing(call)
  print "Got ", {{call.name.id.stringify}}, " with ", {{call.args.size}}, " arguments", '\n'
end

foo          # Prints: Got foo with 0 arguments
bar 'a', 'b' # Prints: Got bar with 2 arguments
```

`method_added` の例です。

```crystal
macro method_added(method)
  {% puts "Method added:", method.name.stringify %}
end

def generate_random_number
  4
end
# => Method added: generate_random_number
```

`method_missing` と `method_added` はマクロの定義されたクラスと同じクラスに対する呼び出し、もしくは定義に対して適用されます。あるいは、このマクロがクラスの外側で定義されていた場合は、トップレベルのものに適用されます。例をあげます。

```crystal
macro method_missing(call)
  puts "In outer scope, got call: ", {{ call.name.stringify }}
end

class SomeClass
  macro method_missing(call)
    puts "Inside SomeClass, got call: ", {{ call.name.stringify }}
  end
end

class OtherClass
end

# この呼び出しはトップレベルの `method_missing` によって処理される
foo # => In outer scope, got call: foo

obj = SomeClass.new
# この呼び出しは SomeClass によって処理される
obj.bar # => Inside SomeClass, got call: bar

other = OtherClass.new
# 一方、OtherClass には `method_missing` マクロを持たないので、
other.baz # => Error: Undefined method 'baz' for OtherClass
```

`finished` は型が完全に定義されたときに、つまりその型の拡張をすべて含めて、ちょうど一度呼び出されます。次のプログラムを考えてみてください。

```crystal
macro print_methods
  {% puts @type.methods.map &.name %}
end

class Foo
  macro finished
    {% puts @type.methods.map &.name %}
  end

  print_methods
end

class Foo
  def bar
    puts "I'm a method!"
  end
end

Foo.new.bar
```

`print_methods` マクロは現れたところですぐさま実行され、空の配列を表示します。つまり、この時点ではメソッドは何も定義されていないということです。2番目の `Foo` の宣言が処理されたのち、`finished` マクロが呼び出され、今度は `[bar]` を表示します。
