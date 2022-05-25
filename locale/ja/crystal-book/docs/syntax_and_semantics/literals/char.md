# 文字 (Char)

[Char](https://crystal-lang.org/api/Char.html)は32 bitの[Unicode](http://en.wikipedia.org/wiki/Unicode)[コードポイント](http://en.wikipedia.org/wiki/Code_point)を表現します。

通常、シングルクォートでUTF-8でエンコードされた文字を囲って文字リテラルを記述します。

```crystal
'a'
'z'
'0'
'_'
'あ'
```

バックスラッシュによる名前つきのエスケープスーケンスかコードポイントの数値表現で、特別な文字を記述できます。

次のエスケープシーケンスが有効です。

```crystal
'\''         # single quote
'\\'         # backslash
'\a'         # alert
'\b'         # backspace
'\e'         # escape
'\f'         # form feed
'\n'         # newline
'\r'         # carriage return
'\t'         # tab
'\v'         # vertical tab
'\0'         # null character
'\uFFFF'     # hexadecimal unicode character
'\u{10FFFF}' # hexadecimal unicode character
```

バックスラッシュに`u`を続けることでユニコードのコードポイントを記述できます。ユニコードの文字を表現するため、ちょうど4つの16進数の数値か (`\u0000` to `\uFFFF`) かひげ括弧で囲った6つまでの16進数の数値が利用できます (`\u{0}` to `\u{10FFFF}`

```crystal
'\u0041'    # => 'A'
'\u{41}'    # => 'A'
'\u{1F52E}' # => '🔮'
```
