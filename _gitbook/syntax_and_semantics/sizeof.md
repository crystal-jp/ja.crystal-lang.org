# sizeof

`sizeof` は与えられたタイプのバイトサイズを `Int32` で返します。 

例:

```ruby
sizeof(Int32)  #=> 4
sizeof(Int64)  #=> 8
```

[Reference](http://crystal-lang.org/api/Reference.html) type については, ポインターの size と同じです：

```ruby
# On a 64 bits machine
sizeof(Pointer(Int32)) #=> 8
sizeof(String)         #=> 8
```

この理由は Reference のメモリはヒープエリアに配置され、それを示すポインターを引き渡すためです。　実際のクラスのサイズを得るには [instance_sizeof](instance_sizeof.html) を使用してください。

sizeof への引数は [type](type_grammar.html) で、使用する時は、しばしば [typeof](typeof.html) と併用します:

```ruby
a = 1
sizeof(typeof(a)) #=> 4
```
