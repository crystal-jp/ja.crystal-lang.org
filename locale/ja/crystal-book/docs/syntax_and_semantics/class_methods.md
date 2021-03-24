# クラスメソッド

クラスメソッドは、特定のインスタンスではなくクラスやモジュール自身に紐付いたメソッドです。

```crystal
module CaesarCipher
  def self.encrypt(string : String)
    string.chars.map { |char| ((char.upcase.ord - 52) % 26 + 65).chr }.join
  end
end

CaesarCipher.encrypt("HELLO") # => "URYYB"
```

クラスメソッドは型名とドットのあとに名前を続ける形式でも定義できます。

```crystal
def CaesarCipher.decrypt(string : String)
  encrypt(string)
end
```

クラスもしくはモジュールのスコープではより簡潔に、クラス名の代わりに`self`を使う形式でも定義できます。

また、クラスメソッドは[`Module`を拡張 (extend)](modules.md#extend-self)することでも定義できます。

クラスメソッドは定義したときと同じ形で呼び出すことができます (`CaesarCipher.decrypt("HELLO")`)。
同じスコープのクラスメソッドを呼び出す場合は、レシーバとして `self` を指定する、もしくは暗黙のものとすることができます (`encrypt(string)` のように)。

## コンストラクタ

コンストラクタは[クラスのインスタンスを作成する](new,_initialize_and_allocate.md)通常のクラスメソッドです。
デフォルトではCrystalのすべてのクラスは `new` というコンストラクタを少なくとも1つは持ちます。しかし、異なる名前の異なるコンストラクタを定義することも可能です。
