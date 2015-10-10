# HTTP サーバー

もう少し興味深いプログラムを見てみましょう。こちらは HTTP サーバーの例になります。

```crystal
require "http/server"

server = HTTP::Server.new(8080) do |request|
  HTTP::Response.ok "text/plain", "Hello world! The time is #{Time.now}"
end

puts "Listening on http://0.0.0.0:8080"
server.listen
```

上記のコードをすべて理解するためにはこのドキュメント全体を読む必要がありますが、ここでいくつかの点について説明しておきます。

* [require](../syntax_and_semantics/requiring_files.html) で、他のファイルで定義されたコードを読み込むことができます

    ```crystal
    require "http/server"
    ```
* 型を指定することなく[ローカル変数](../syntax_and_semantics/local_variables.html)を定義することができます

    ```crystal
    server = HTTP::Server.new ...
    ```

* オブジェクトに対して[メソッド](../syntax_and_semantics/classes_and_methods.html)を実行 (またはメッセージを送信) することでプログラムを構築します

    ```crystal
    HTTP::Server.new(8000) ...
    ...
    Time.now
    ...
    puts "Listening on http://0.0.0.0:8080"
    ...
    server.listen
    ```

* [ブロック](../syntax_and_semantics/blocks_and_procs.html)を使うと簡単にコードを再利用することができ、また、関数型の世界にあるいくつかの機能を利用することが可能になります

    ```crystal
    HTTP::Server.new(8080) do |request|
      ...
    end
    ```

* 文字列埋め込み (string interpolation) を使うと、簡単に文字列に式を埋め込むことができます。Crystal にはその他にも多くの[シンタックス](../syntax_and_semantics/literals.html)があります。例えば、array や hash、そして range や tuple などです

    ```crystal
    "Hello world! The time is #{Time.now}"
    ```


