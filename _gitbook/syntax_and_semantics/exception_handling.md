# 例外処理 (Exception handling)

Crystal のエラーハンドリングは exception の raise と rescue で処理する方法です

## exception の raise 

例外を発生させるには、トップレベルの `raise` メソッドを呼び出します。ほかのキーワードと違って `raise` は通常二つのオーバーロードを使います： [一つは String を受け取る方法](http://crystal-lang.org/api/toplevel.html#raise%28message%20%3A%20String%29-class-method) そしてもう一つは [Exception インスタンスを受け取る方法](http://crystal-lang.org/api/toplevel.html#raise%28ex%20%3A%20Exception%29-class-method) です：

```ruby
raise "OH NO!"
raise Exception.new("Some error")
```

String の場合は、単にそのメッセージを持った新しい [Exception](http://crystal-lang.org/api/Exception.html) インスタンスを生成します

`Exception` インスタンスまたはサブクラスだけが raise　出来ます

## 固有の exception の定義

固有の exception タイプを定義するには [Exception](http://crystal-lang.org/api/Exception.html) からサブクラスを作ります：

```ruby
class MyException < Exception
end

class MyOtherException < Exception
end
```

常にあなたの exception のコンストラクタを定義したり、デフォールトの exception を使用できます

## exception の Rescue

例外を救済 (rescue) するには `begin ... rescue ... end` 表現を使ってください：

```ruby
begin
  raise "OH NO!"
rescue
  puts "Rescued!"
end

# 出力: Rescued!
```

救済された例外にアクセスするには、 `rescue` 節に変数を規定できます：

```ruby
begin
  raise "OH NO!"
rescue ex
  puts ex.message
end

# 出力: OH NO!
```

例外の一つのタイプ（或いはそのサブクラス）を救済 (rescue) したい場合の表現：

```ruby
begin
  raise MyException.new("OH NO!")
rescue MyException
  puts "Rescued MyException"
end

# 出力: Rescued MyException
```

そして、それにアクセスしたい場合、タイプ宣言と同様な文法を使用します：

```ruby
begin
  raise MyException.new("OH NO!")
rescue ex : MyException
  puts "Rescued MyException: #{ex.message}"
end

# 出力: Rescued MyException: OH NO!
```

複数の `rescue` クラスも規定できます：

```ruby
begin
  # ...
rescue ex1 : MyException
  # MyException の時のみ
rescue ex2 : MyOtherException
  # MyOtherException の時のみ
rescue
  # 上記以外の exception
end
```

union type を規定することで、複数の exception タイプもまた rescue 出来ます：

```ruby
begin
  # ...
rescue ex : MyException | MyOtherException
  # MyException 或いは MyOtherException の時のみ
rescue
  # 上記以外の exception
end
```

## ensure

`ensure` 節は exception が raised されたか如何に関わらず `begin ... end` 或いは `begin ... rescue ... end` の後に実行されます：

```ruby
begin
  something_dangerous
ensure
  puts "Cleanup..."
end

# something_dangerous が発生した後 "Cleanup..." とprint
# raise　の如何に関わらず実行
```

或いは:

```ruby
begin
  something_dangerous
rescue
  # ...
ensure
  # ここは常に実行
end
```

`ensure` 節は一般にクリーンナップつまり、リソースの開放などの時に使われます

## else

`else` 節はexception が rescue されなかった時だけ実行されます：

```ruby
begin
  something_dangerous
rescue
  # 例外が発生したとき実
else
  # 例外が発生しなかったとき実行
end
```

`else` 節は少なくとも一つの `rescue` 節が規定された時のみ規定できます

## Short syntax form

例外処理 (Exception handling) は short syntax form があります：メソッドの定義が `begin ... end`が暗黙であると仮定して、 `rescue`, `ensure` と `else` 節を規定します：

```ruby
def some_method
  something_dangerous
rescue
  # 例外が発生したとき実行
end

# 上記と同じ例：
def some_method
  begin
    something_dangerous
  rescue
    # 例外が発生したとき実行
  end
end
```

`ensure` の例：

```ruby
def some_method
  something_dangerous
ensure
  # ここは常に実行される
end

# 上記と同じ例：
def some_method
  begin
    something_dangerous
  ensure
    # ここは常に実行される
  end
end
```

## 型推定

exception ハンドラーの`begin` の内側で宣言された変数は `rescue` 或いは `ensure` ボデーの内部変数と推定されれば `Nil` タイプになります　例:

```ruby
begin
  a = something_dangerous_that_returns_Int32
ensure
  puts a + 1 # コンパイルエラー：error, undefined method '+' for Nil
end
```

上記例ではたとえ `something_dangerous_that_returns_Int32` が raise されなくても、また  `a` に値が代入され、raise メソッドが実行された場合もエラーが発生します：

```ruby
begin
  a = 1
  something_dangerous
ensure
  puts a + 1 # コンパイルエラー：error, undefined method '+' for Nil
end
```

`a` に値が代入されても、コンパイラは変数が初期化されるべきでないと考えます。　この論理は将来改定されるかもしれませんが、現時点コードの趣旨を明瞭に示すために、書く人に例外ハンドラーで最小限必要な記述を要求します：

```ruby
# 上記より `a` が必要ないことが明瞭
# 例外処理ハンドリングコード
a = 1
begin
  something_dangerous
ensure
  puts a + 1 # コンパイルエラーになりません
end
```

## 例外処理のもう一つの方法　Alternative ways to do error handling

exception はエラーハンドリングのメカニズムの一つで有効ですが、ほかにも方法はあります。例外の発生はメモリー配置を含みますので一般的に処理が遅い点があります。

標準ライブラリは通常 raise を使う方法と、`nil` を返す方法を提供しています　例:

```ruby
array = [1, 2, 3]
array[4]  # インデックス領域外なので raise する
array[4]? # インデックス領域外なので nil を返す
```

一般的には raise の代わりにメソッドに `nil` を返す二者択一の質問方策を提供していて、ユーザが例外か `nil` を使うかを選べるようにしています。しかしすべてのメソッドで利用できるという訳ではなく、例外処理はエラーハンドリングロジッを汚くしないためには好ましい方法です
