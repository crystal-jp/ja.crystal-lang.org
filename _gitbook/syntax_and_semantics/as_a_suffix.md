# 後置 if

`if` は式に後置して使うことができます。

```crystal
a = 2 if some_condition

# 上記は以下と同じ
if some_condition
  a = 2
end
```

この方がコードが読みやすくなる場合もあるでしょう。
