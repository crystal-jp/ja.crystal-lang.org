# Proc リテラル

捕捉されたブロックは [Proc リテラル](literals/proc.md)を宣言してメソッドに[渡す](block_forwarding.md)ことと等しいです。

```crystal
def some_proc(&block : Int32 -> Int32)
  block
end

x = 0
proc = ->(i : Int32) { x += i }
proc = some_proc(&proc)
proc.call(1)  # => 1
proc.call(10) # => 11
x             # => 11
```

[Proc リテラル](literals/proc.md)のセクションで説明したように、既存のメソッドから Proc を作ることも可能です。

```crystal
def add(x, y)
  x + y
end

adder = ->add(Int32, Int32)
adder.call(1, 2) # => 3
```
