# lib

A `lib` declaration groups C functions and types that belong to a library.

```crystal
@[Link("pcre")]
lib LibPCRE
end
```

Although not enforced by the compiler, a `lib`'s name usually starts with `Lib`.

また、属性はリンカにフラグを渡すために利用され、リンカはそれにしたがって外部のライブラリを探します。

* `@[Link("pcre")]` will pass `-lpcre` to the linker, but the compiler will first try to use [pkg-config](http://en.wikipedia.org/wiki/Pkg-config).
* `@[Link(ldflags: "...")]` will pass those flags directly to the linker, without modification. For example: `@[Link(ldflags: "-lpcre")]`. A common technique is to use backticks to execute commands: ``@[Link(ldflags: "`pkg-config libpcre --libs`")]``.
* `@[Link(framework: "Cocoa")]` will pass `-framework Cocoa` to the linker (only useful in macOS).

属性は、例えば libc のように、暗黙的にリンクされるライブラリの場合には不要です。
