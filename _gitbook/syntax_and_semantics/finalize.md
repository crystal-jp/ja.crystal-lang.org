# finalize

もしクラスに `finalize` メソッドが定義されていた場合、そのクラスのインスタンスがガベージコレクトされるときにそのメソッドが実行されます。

```crystal
class Foo
  def finalize
    # Foo がガベージコレクトされるときに実行される
    puts "Bye bye from #{self}!"
  end
end

# Prints "Bye bye ...!" for ever
loop do
  Foo.new
end
```

**注意:** `finalize` が実行されるのは、オブジェクトが `initialize` メソッドによって完全に初期化されていた場合に限ります。もし `initialize` メソッドで例外が発生したとき、`finalize` は実行されません。もしクラスに `finalize` を定義する場合は、必ず `initialize` メソッドで発生し得る例外を捕捉して、リソースの開放をするようにしてください。
