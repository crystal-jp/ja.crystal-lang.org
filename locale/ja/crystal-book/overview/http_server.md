# HTTP Server

もう少し興味深いプログラムを見てみましょう。こちらは HTTP サーバーの例になります。

```crystal
require "http/server"

server = HTTP::Server.new do |context|
  context.response.content_type = "text/plain"
  context.response.print "Hello world!The time is #{Time.local}"
end

address = server.bind_tcp 8080
puts "Listening on http://#{address}"
server.listen
```

上記のコードをすべて理解するためにはこの言語リファレンス全体を読む必要がありますが、ここでいくつかの点について説明しておきます。

* [require](../syntax_and_semantics/requiring_files.html)で、他のファイルで定義されたコードを読み込むことができます

```crystal
require "http/server"
```

* 型を指定することなく[ローカル変数](../syntax_and_semantics/local_variables.html)を定義することができます

```crystal
server = HTTP::Server.new ...
```

* HTTP サーバーのポート番号は HTTP::Server オブジェクトの bind_tcp メソッドによってセットされます (ポート番号を 8080 にセット)

```crystal
address = server.bind_tcp 8080
```

* オブジェクトに対して[メソッド](../syntax_and_semantics/classes_and_methods.html)を実行 (またはメッセージを送信) することでプログラムを構築します

```crystal
HTTP::Server.new ...
...
Time.local
...
address = server.bind_tcp 8080
...
puts "Listening on http://#{address}"
...
server.listen
```

* [ブロック](../syntax_and_semantics/blocks_and_procs.html)を使うと簡単にコードを再利用することができ、また、関数型の世界にあるいくつかの機能を利用することが可能になります

```crystal
HTTP::Server.new do |context|
    ...
end
```

* 文字列埋め込み (string interpolation) を使うと、簡単に文字列に式を埋め込むことができます。Crystalはその他にも多くの[シンタックス](../syntax_and_semantics/literals.html)があります。例えば配列やハッシュ、そして範囲やタプルなどです

```crystal
"Hello world!The time is #{Time.local}"
```
