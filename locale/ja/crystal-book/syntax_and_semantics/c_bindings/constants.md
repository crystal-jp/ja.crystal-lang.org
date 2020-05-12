# 定数

`lib` 宣言の内部で定数を宣言することもできます。

```crystal
@[Link("pcre")]
lib PCRE
  INFO_CAPTURECOUNT = 2
end

PCRE::INFO_CAPTURECOUNT # => 2
```
