# 正規表現

正規表現は [Regex](http://crystal-lang.org/api/Regex.html) クラスで表わされます。

正規表現には [PCRE](http://pcre.org/pcre.txt) の構文を使います。It consists of a string of UTF-8 characters enclosed in forward slashes (`/`):

```crystal
/foo|bar/
/h(e+)llo/
/\d+/
/あ/
```

## エスケープ文字

正規表現では[文字列リテラルと同様のエスケープシーケンス](./string.md)をサポートしています。

```crystal
/\//         # slash
/\\/         # backslash
/\b/         # backspace
/\e/         # escape
/\f/         # form feed
/\n/         # newline
/\r/         # carriage return
/\t/         # tab
/\v/         # vertical tab
/\NNN/       # octal ASCII character
/\xNN/       # hexadecimal ASCII character
/\x{FFFF}/   # hexadecimal unicode character
/\x{10FFFF}/ # hexadecimal unicode character
```

区切り文字である `/` は正規表現中ではエスケープされる必要があります。
PCRE の構文上意味のある文字を通常の文字として扱いたい場合もエスケープが必要です。

## 文字列の補間

文字列の補間は正規表現リテラル中でも[文字列リテラル](./string.md)の場合と同様に機能します。この方法で正規表現を生成した場合、構文エラーなどはコンパイル時に検出できず実行時に起こる例外になるということに注意してください。

## 修飾子
区切り文字を閉じたあとに、いくつかの修飾子を続けることで、正規表現のマッチの挙動を変更できます。

* `i`: 大文字と小文字を区別しないマッチを行う (`PCRE_CASELESS`) 。ユニコード文字の大文字と小文字も区別しないようになります。
* `m`: 複数行マッチを行う (`PCRE_MULTILINE`)。*行の開始* (`^`) と *行の終わり* (`$`) を表すメタ文字が、文字列の冒頭や末尾に加えて、改行の直前や直後にもマッチするようになります。
* `x`: 空白文字を無視するようにします (`PCRE_EXTENDED`)。文字クラスの内部を除くパターン中の空白文字を飛ばしてマッチを行います。また、エスケープされていないハッシュ `#` は行コメントの始まりと見なされ、次の改行文字まで飛ばしてマッチを行います。

```crystal
/foo/i.match("FOO")         # => #<Regex::MatchData "FOO">
/foo/m.match("bar\nfoo")    # => #<Regex::MatchData "foo">
/foo /x.match("foo")        # => #<Regex::MatchData "foo">
/foo /imx.match("bar\nFOO") # => #<Regex::MatchData "FOO">
```

## パーセント正規表現リテラル

スラッシュ区切りのリテラルの他に、正規表現リテラルは`%r`と区切り文字の組からなるパーセントリテラルを使って表現することもできます。有効な区切り文字は、括弧`()`、角括弧`[]`、ひげ括弧`{}`、三角括弧`<>`そしてパイプ文字`||`です。パイプ文字を除いて、すべての区切り文字はネストに応じて適切に処理されます。

スラッシュを含むような正規表現を書くのにこれらのリテラルは便利です。

```crystal
%r((/)) # => /(\/)/
%r[[/]] # => /[\/]/
%r{{/}} # => /{\/}/
%r<</>> # => /<\/>/
%r|/|   # => /\//
```
