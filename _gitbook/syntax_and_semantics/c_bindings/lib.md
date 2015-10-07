# lib

`lib` の宣言によって、C ライブラリの関数群や型をグループ化します。

```ruby
@[Link("pcre")]
lib LibPCRE
end
```

なお、これはコンパイラが強制するものではありませんが、通常、`lib` の名前は `Lib` から始まるものにします。

また、属性はリンカにフラグを渡すために利用され、リンカはそれにしたがって外部のライブラリを探します。

* `@[Link("pcre")]` は `-lpcre` をリンカに渡します。ただ、コンパイラはまず最初に [pkg-config](http://en.wikipedia.org/wiki/Pkg-config) の利用を試みます。
* `@[Link(ldflags: "...")]` は指定したフラグをそのまま直接リンカに渡します。例: `@[Link(ldflags: "-lpcre")]`. よく使われるテクニックとして、バックティック (バッククォート) を活用してコマンドを実行するものがあります。``@[Link(ldflags: "`pkg-config libpcre --libs`")]``.
* `@[Link(framework: "Cocoa")]` は `-framework Cocoa` をリンカに渡します (Mac OS X の場合のみ有効) 。

属性は、例えば libc のように、暗黙的にリンクされるライブラリの場合には不要です。
