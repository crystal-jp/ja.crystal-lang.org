# コーディングスタイル

このコーディングスタイルは標準ライブラリで使われているものです。自分のプロジェクトでもこのスタイルを利用することで、他の開発者に親しみやすいものにすることができるでしょう。

## 命名

__Type names__ are PascalCased. 例をあげます。

```crystal
class ParseError < Exception
end

module HTTP
  class RequestHandler
  end
end

alias NumericValue = Float32 | Float64 | Int32 | Int64

lib LibYAML
end

struct TagDirective
end

enum Time::DayOfWeek
end
```

__Method names__ are snake_cased. 例をあげます。

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

__Variable names__ are snake_cased. 例をあげます。

```crystal
class Greeting
  @@default_greeting = "Hello world"

  def initialize(@custom_greeting = nil)
  end

  def print_greeting
    greeting = @custom_greeting || @@default_greeting
    puts greeting
  end
end
```

__Constants__ are SCREAMING_SNAKE_CASED. 例をあげます。

```crystal
LUCKY_NUMBERS     = [3, 7, 11]
DOCUMENTATION_URL = "http://crystal-lang.org/docs"
```

### 頭字語 (Acronyms)

クラス名では、頭字語は _すべて大文字_ とします。例えば、`HTTP` や `LibXML` などです。

メソッド名では、頭字語は _すべて小文字_ とします。 For example `#from_json`, `#to_io`.

### ライブラリ (Lib)

ライブラリ(`Lib`)の名前は先頭に `Lib` をつけます。例えば、`LibC` や `LibEvent2` などです。

### ディレクトリとファイル名

プロジェクト内では以下のようにします。

- `/` には README や、 (CI や editor config などの) プロジェクトの設定、そして (CHANGELOG や CONTRIBUTING ガイドなどの) プロジェクト全体のドキュメントを配置します。
- `src/` にはプロジェクトのソースコードを配置します。
- `spec/` には `crystal spec` によって実行できる、[プロジェクトの spec](../guides/testing.md) を配置します。
- `bin/`には実行可能ファイルを配置します。

ファイルパスは、そのファイルの内容の名前空間と一致するようにします。Files are named after the class or namespace they define, with *snake_case*.

例えば、`HTTP::WebSocket` は `src/http/web_socket.cr` で定義されています。

## Indentation

名前空間やメソッド、ブロックやその他のネストされた内容をインデントするには __スペース2つ__ を使用してください。例をあげます。

```crystal
module Scorecard
  class Parser
    def parse(score_text)
      begin
        score_text.scan(SCORE_PATTERN) do |match|
          handle_match(match)
        end
      rescue err : ParseError
        # エラーハンドリング…
      end
    end
  end
end
```

クラス内で、メソッド定義や定数、そして内部のクラス定義は __間を1行空ける__ ことで分割してください。例をあげます。

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
