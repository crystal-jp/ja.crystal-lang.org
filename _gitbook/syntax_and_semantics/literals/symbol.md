# シンボル (Symbol)

シンボル ([Symbol](http://crystal-lang.org/api/Symbol.html)) というのは、数値を与えることなく、その名前で識別することが可能な定数です。

```ruby
:hello
:good_bye

# 名前にスペースを含むシンボル
:"symbol with spaces"

# 名前が ? や ! で終わるシンボル
:question?
:exclamation!

# 演算子
:+
:-
:*
:/
:==
:<
:<=
:>
:>=
:!
:!=
:=~
:!~
:&
:|
:^
:~
:**
:>>
:<<
:%
:[]
:[]?
:[]=
:<=>
:===
```

内部的には、シンボルは `Int32` で表現されます。
