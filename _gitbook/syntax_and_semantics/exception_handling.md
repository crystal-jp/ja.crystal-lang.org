# 例外処理

Crystal では、例外を発生 (raise) させ、それを捕捉 (rescue) することによってエラーハンドリングを行います。

## 例外を発生させる

例外を発生させるにはトップレベルの `raise` メソッドを使います。他のキーワードとは異なり、`raise` は通常のメソッドであり、2つのオーバーロードがあります。その1つは [String を受け取るもの](http://crystal-lang.org/api/toplevel.html#raise%28message%20%3A%20String%29-class-method)で、もう1つは[例外 (Exception) クラスを受け取るもの](http://crystal-lang.org/api/toplevel.html#raise%28ex%20%3A%20Exception%29-class-method)です。

```ruby
raise "OH NO!"
raise Exception.new("Some error")
```

String の場合は、単純にそのメッセージを含んだ [Exception](http://crystal-lang.org/api/Exception.html) のインスタンスを生成します。

そして、`raise` の対象に指定することができるのは `Exception` のインスタンス、もしくはそのサブクラスのみに限られます。

## 独自の例外を定義する

独自の例外型を定義したい場合には、[Exception](http://crystal-lang.org/api/Exception.html) からサブクラスを作成します。

```ruby
class MyException < Exception
end

class MyOtherException < Exception
end
```

通常のクラスのように、自分でコンストラクタを定義することもできますし、デフォルトのコンストラクタを利用することも可能です。

## 例外の捕捉

例外を捕捉するには、`begin ... rescue ... end` の構文を使用します。

```ruby
begin
  raise "OH NO!"
rescue
  puts "Rescued!"
end

# 出力: Rescued!
```

捕捉された例外にアクセスしたいときは、`rescue` 節に変数を指定することが可能です。

```ruby
begin
  raise "OH NO!"
rescue ex
  puts ex.message
end

# 出力: OH NO!
```

ある型の例外 (そのサブクラスも含む) のみ捕捉したい場合には以下のようにします。

```ruby
begin
  raise MyException.new("OH NO!")
rescue MyException
  puts "Rescued MyException"
end

# 出力: Rescued MyException
```

型を指定して、かつその例外にアクセスしたいときは、型制約の場合と同じように書きます。

```ruby
begin
  raise MyException.new("OH NO!")
rescue ex : MyException
  puts "Rescued MyException: #{ex.message}"
end

# 出力: Rescued MyException: OH NO!
```

複数の `rescue` 節を設定することも可能です。

```ruby
begin
  # ...
rescue ex1 : MyException
  # MyException のみ
rescue ex2 : MyOtherException
  # MyOtherException のみ
rescue
  # その他の例外
end
```

また、型の組み合わせを指定すれば、複数の例外を同時に補足することが可能です。

```ruby
begin
  # ...
rescue ex : MyException | MyOtherException
  # MyException/MyOtherException のみ
rescue
  # その他の例外
end
```

## ensure

`ensure` 節は、例外が発生したかどうかに関係なく、`begin ... end` または `begin ... rescue ... end` の後で必ず実行されます。

```ruby
begin
  something_dangerous
ensure
  puts "Cleanup..."
end

# 例外が発生したかどうかに関わらず、
# something_dangerous が実行された後に「Cleanup...」が出力される 

```

または

```ruby
begin
  something_dangerous
rescue
  # ...
ensure
  # ここは必ず実行される
end
```

通常、`ensure` 節は処理の後始末やリソースの開放などに利用します。

## else

`else` 節は、例外が発生しなかった場合にのみ実行されます。

```ruby
begin
  something_dangerous
rescue
  # 例外が発生するとここが実行される
else
  # 例外が発生しなかった場合のみここが実行される
end
```

`else` 節を設定するためには、少なくとも1つの `rescue` 節が設定されている必要があります。

## 短縮記法

例外処理には短縮記法が用意されています。それは、メソッドの定義は暗黙的に `begin ... end` 構文であるとして `rescue`/`ensure`/`else` を使用できるというものです。

```ruby
def some_method
  something_dangerous
rescue
  # 例外が発生するとここが実行される
end

# 上記は以下と同じ
def some_method
  begin
    something_dangerous
  rescue
    # 例外が発生するとここが実行される
  end
end
```

`ensure` の例:

```ruby
def some_method
  something_dangerous
ensure
  # ここは必ず実行される
end

# 上記は以下と同じ
def some_method
  begin
    something_dangerous
  ensure
    # ここは必ず実行される
  end
end
```

## 型推論

例外処理において、`begin` 節の中で宣言された変数は、`rescue` または `ensure` 内においては `Nil` 型を持っているとして解釈されます。例:

```ruby
begin
  a = something_dangerous_that_returns_Int32
ensure
  puts a + 1 # error, undefined method '+' for Nil
end
```

このとき、もし `something_dangerous_that_returns_Int32`が例外を発生させない場合であってもエラーが発生します。さらに、`a` に先に値が代入されて、それから例外を発生させる可能性があるメソッドが実行された場合であったとしてもエラーとなります。

```ruby
begin
  a = 1
  something_dangerous
ensure
  puts a + 1 # error, undefined method '+' for Nil
end
```

この場合、`a` に常に値が代入されていることは明白なのですが、それでもコンパイラは `a` が初期化されていない可能性があると解釈します。このロジックは将来的には改定されるかもしれません。ただ、現時点では例外処理の中で行うことは必要最小限に留め、コードの意図を明確にして書くことが求められます。

```ruby
# 例外処理のコードの内部で `a` 宣言する必要はないため、
# こう書くことでより意図が明確になる
a = 1
begin
  something_dangerous
ensure
  puts a + 1 # エラーにならない
end
```

## 例外処理の他の方法

例外はエラーハンドリング機構の1つですが、必ずしも例外処理でしかエラーを扱うことができないわけではありません。例外を発生させることはメモリの割り当てを伴うので、一般的に例外処理は遅くなる傾向があります。

そこで、標準ライブラリでは、例外を発生する方法に加えて、`nil` を返す方法も用意しています。例:

```ruby
array = [1, 2, 3]
array[4]  # IndexOutOfBounds の例外が発生
array[4]? # インデックス範囲外のため nil が返る
```

慣習として、メソッドが例外を発生させる代わりに `nil` を返すことができる場合は、それを’示すために「? (クエスチョン)」メソッドとして提供することになっています。こうすることで、ユーザーが例外を利用するか `nil` を利用するかを選択することが可能です。ただ、すべてのメソッドにこの方法が用意されているわけではありません。また、エラーハンドリングのロジックが混ざることよってコードが汚れてしまうのを避けるという意味でも、例外処理というのは好ましい方法であるでしょう。
