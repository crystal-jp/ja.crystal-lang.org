# タプル (Tuple)

タプル ([Tuple](http://crystal-lang.org/api/Tuple.html)) を作るには、以下のタプルリテラルを使います。

```crystal
tuple = {1, "hello", 'x'} # Tuple(Int32, String, Char)
tuple[0]                  #=> 1       (Int32)
tuple[1]                  #=> "hello" (String)
tuple[2]                  #=> 'x'     (Char)
```

空のタプルを作りたい場合は、[Tuple.new](http://crystal-lang.org/api/Tuple.html#new%28%2Aargs%29-class-method) を使用してください。
