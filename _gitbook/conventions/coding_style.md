# コーディングスタイル

このコーディングスタイルは標準ライブラリで使われているものです。自分のプロジェクトでもこのスタイルを利用することで、他の開発者に親しみやすいものにすることができるでしょう。

## 命名

__型の名前__はキャメルケースとします。例をあげます。

```crystal
class ParseError < Exception
end

module HTTP
  class RequestHandler
  end
end

alias NumericValue = Int32 | Int64 | Float32 | Float64

lib LibYAML
end

struct TagDirective
end

enum Time::DayOfWeek
end
```

__メソッド名__はアンダースコア区切りとします。例をあげます。

```crystal
class Person
  def first_name
  end

  def date_of_birth
  end

  def homepage_url
  end
end
```

__変数名__はアンダースコア区切りとします。例をあげます。

```crystal
$global_greeting = "Hello world"

class Greeting
  @@default_greeting = "Hello world"

  def initialize(@custom_greeting=nil)
  end

  def print_greeting
    greeting = @custom_greeting || @@default_greeting
    puts greeting
  end
end
```

__定数__はすべて大文字とします。例をあげます。

```crystal
LUCKY_NUMBERS = [3, 7, 11]
DOCUMENTATION_URL = "http://crystal-lang.org/docs"
```

### 頭字語 (Acronym)

クラス名では、頭字語は「すべて大文字」とします。例えば、`HTTP` や `LibXML` などです。

メソッド名では、頭字語は「すべて小文字」とします。例えば、`#from_json` や `#to_io` などです。

### ライブラリ (Lib)

ライブラリ (`Lib`) の名前は先頭に `Lib` をつけます。例えば、`LibC` や `LibEvent2` などです。

### ディレクトリとファイル名

プロジェクト内では以下のようにします。

- `/` には、README、 (CI や editor config などの) プロジェクトの設定、そして、(changelog や contributing guide などの) プロジェクト全体のドキュメントを配置します。
- `src/` にはプロジェクトのソースコードを配置します。
- `spec/` には、`crystal spec` によって起動するプロジェクトの spec を配置します。
- `bin/` には実行ファイルを配置します。

ファイルパスは、そのファイルの内容の名前空間と一致するようにします。ファイル名は、そこで定義されるクラスや名前空間にしたがって、「アンダースコア区切り」で命名します。

例えば、`HTTP::WebSocket` は `src/http/web_socket.cr` で定義されています。

## 空白 (whitespace)

名前空間やメソッド、そしてブロックやその他のネストされた内容をインデントするには、「スペース2つ」を使用してください。例をあげます。

```crystal
module Scorecard
  class Parser
    def parse(score_text)
      begin
        score_text.scan(SCORE_PATTERN) do |match|
          handle_match(match)
        end
      rescue err : ParseError
        # ハラーハンドリング…
      end
    end
  end
end
```

クラス内で、メソッド定義や定数、そして内部のクラス定義は「間を1行空ける」ことで分割してください。例をあげます。

```crystal
module Money
  CURRENCIES = {
    "EUR" => 1.0,
    "ARS" => 10.55,
    "USD" => 1.12,
    "JPY" => 134.15,
  }

  class Amount
    getter :currency, :value

    def initialize(@currency, @value)
    end
  end

  class CurrencyConversion
    def initialize(@amount, @target_currency)
    end

    def amount
      # 変換の実装…
    end
  end
end
```
