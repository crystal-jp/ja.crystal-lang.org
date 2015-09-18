# Proc リテラル

捕捉されたブロック (captured block) は、[Proc リテラル](literals/proc.html) を宣言してメソッドに[渡す](block_forwarding.html)ことと等しいです。

```ruby
def some_proc(&block : Int32 -> Int32)
  block
end

x = 0
proc = ->(i : Int32) { x += i }
proc = some_proc(&proc)
proc.call(1)  #=> 1
proc.call(10) #=> 11
x #=> 11
```

[Proc リテラル](literals/proc.html)のセクションで説明したように、既存のメソッドから Proc を作ることも可能です。

```ruby
def add(x, y)
  x + y
end

adder = ->add(Int32, Int32)
adder.call(1, 2) #=> 3
```
