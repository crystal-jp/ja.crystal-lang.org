# フック

ある状況において実行される特別なマクロがフックとして存在します。それらは、`inherited`、`included` そして `method_missing` です。
* `inherited` は、コンパイル時にサブクラスが定義されたときに実行されます。`@type` は継承されたサブクラスの型になります。
* `included` は、コンパイル時にモジュールがインクルードされたときに実行されます。`@type` はインクルードする側の型になります。
* `extended` は、コンパイル時にモジュールが extend されたときに実行されます。`@type` は extend する側の型になります。
* `inherited` は、コンパイル時にメソッドが見つからないときに実行されます。

`inherited` の例:

```ruby
class Parent
  macro inherited
    def {{@type.name.downcase.id}}
      1
    end
  end
end

class Child < Parent
end

Child.new.child #=> 1
```

`method_missing` の例:

```ruby
macro method_missing(name, args, block)
  print "Got ", {{name.id.stringify}}, " with ", {{args.length}}, " arguments", '\n'
end

foo          # 出力: Got foo with 0 arguments
bar 'a', 'b' # 出力: Got bar with 2 arguments
```
