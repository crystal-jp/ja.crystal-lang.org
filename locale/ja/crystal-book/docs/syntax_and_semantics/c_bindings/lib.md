# lib

`lib` 宣言によって、C ライブラリの関数群や型をグループ化します。

```crystal
@[Link("pcre")]
lib LibPCRE
end
```

なお、これはコンパイラが強制するものではありませんが、通常は `lib` の名前は `Lib` から始まるものにします。

また、属性はリンカにフラグを渡すために利用され、リンカはそれにしたがって外部のライブラリを探します。

* `@[Link("pcre")]` は `-lpcre` をリンカに渡します。ただし、コンパイラはまず最初に [pkg-config](http://en.wikipedia.org/wiki/Pkg-config) の利用を試みます。
* `@[Link(ldflags: "...")]` は指定したフラグをそのまま直接リンカに渡します。例: `@[Link(ldflags: "-lpcre")]`よく使われるテクニックとしてバックティック (バッククォート) を活用してコマンドを実行するものがあります。 ``@[Link(ldflags: "`pkg-config libpcre --libs`")]``
* `@[Link(framework: "Cocoa")]` は `-framework Cocoa` をリンカに渡します (macOS でのみ用途があるでしょう)。

属性は、例えば libc のように、暗黙的にリンクされるライブラリの場合には不要です。
