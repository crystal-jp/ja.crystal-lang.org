# 正規表現 (Regex)

正規表現 (Regular Expression) を表すのは [Regex](http://crystal-lang.org/api/Regex.html) クラスです。そして、通常それは以下の正規表現リテラルによって作られます。

```ruby
foo_or_bar = /foo|bar/
heeello    = /h(e+)llo/
integer    = /\d+/
```

正規表現リテラルは `/` で区切られ、[PCRE](http://pcre.org/pcre.txt) の記法を使うことができます。

また、正規表現リテラルにはオプションを追加することも可能です。

* i: 大小文字を区別しない (PCRE_CASELESS)
* m: 複数行のマッチング (PCRE_MULTILINE)
* x: 拡張 (PCRE_EXTENDED)

例をあげます。

```ruby
r = /foo/imx
```

スラッシュはエスケープする必要があります。

```ruby
slash = /\//
```

また、以下の記法を利用して書くことも可能です。

```ruby
r = %r(regex with slash: /)
```
