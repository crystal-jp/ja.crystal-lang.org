# データベース

リレーショナルデータベースにアクセスするには、使用したいデータベースサーバー用に設計された Shard が必要です。[crystal-lang/crystal-db](https://github.com/crystal-lang/crystal-db) パッケージは異なるドライバーに対して統一された API を提供します。

次のパッケージ群は crystal-db に準拠しています。

* [crystal-lang/crystal-sqlite3](https://github.com/crystal-lang/crystal-sqlite3) sqlite用
* [crystal-lang/crystal-mysql](https://github.com/crystal-lang/crystal-mysql) mysql と mariadb 用
* [will/crystal-pg](https://github.com/will/crystal-pg) postgres 用

このガイドでは、crystal-db の API を紹介していますが、 postgres 、 mysql 、 sqlite の違いにより、具体的なドライバに合わせてsqlコマンドを変更する必要があるかもしれません。

また、いくつかのドライバーでは postgres の `LISTEN`/`NOTIFY`のように追加の機能を提供します。

## shard のインストール

上のリストから適切なドライバを選択し、アプリケーションの `shard.yml` に任意の shard を追加します。

`crystal-lang/crystal-db` を明示的に追加する必要はありません。

このガイドを通して `crystal-lang/crystal-mysql` を使用します。

```yaml
dependencies:
  mysql:
    github: crystal-lang/crystal-mysql
```

## データベースのオープン

`DB.open` はコネクション uri を用いて容易なデータベースへの接続を提供します。uri のスキーマは期待されるドライバーを決定します。次のサンプルでは、root ユーザーを空パスワードで、 test という名前のローカルの mysql データベースに接続しています。

```crystal
require "db"
require "mysql"

DB.open "mysql://root@localhost/test" do |db|
  # ... クエリを実行するために db を利用します
end
```

その他の接続 uri です。

* `sqlite3:///path/to/data.db`
* `mysql://user:password@server:port/database`
* `postgres://server:port/database`

あるいは、最後に `Database#close` が呼ばれるまで終了しない yield を用いない `DB.open` を使うこともできます。

```crystal
require "db"
require "mysql"

db = DB.open "mysql://root@localhost/test"
begin
  # ... クエリを実行するために db を利用します
ensure
  db.close
end
```

## 実行

sql 文を実行するには `Database#exec` を利用します。

```crystal
db.exec "create table contacts (name varchar(30), age int)"
```

[SQL インジェクション](https://owasp.org/www-community/attacks/SQL_Injection) を避けるため、クエリパラメータとして値を与えることが出来ます。
クエリパラメータを使用するための構文はデータベースドライバに依存します。なぜならそれらは通常データベースに渡されるだけだからです。MySQL ではパラメータの展開に `?` を使用し、代入は引数の順序に基づいて行われます。PostgreSQL では `$n` を使用し、 `n` は1から始まる引数の順序です。

```crystal
# MySQL
db.exec "insert into contacts values (?, ?)", "John", 30
# Postgres
db.exec "insert into contacts values ($1, $2)", "Sarah", 33
```

## クエリ

クエリを実行し結果セットを得るために `Database#query` を使用します。引数は `Database#exec` と同様です。

`Database#query` はクローズする必要のある `ResultSet` を返します。`Database#open` のように、 ブロックとともに呼び出した場合は、 `ResultSet` は暗黙のうちにクローズされます。

```crystal
db.query "select name, age from contacts order by age desc" do |rs|
  rs.each do
    # ... ResultSet の各行が実行される
  end
end
```

データベースから値を読み込む際には、コンパイル時に crystal が使用できる型情報がありません。データベースから取得するとされるタイプ `T` と共に `rs.read(T)` を呼び出す必要があります。

```crystal
db.query "select name, age from contacts order by age desc" do |rs|
  rs.each do
    name = rs.read(String)
    age = rs.read(Int32)
    puts "#{name} (#{age})"
    # => Sarah (33)
    # => John Doe (30)
  end
end
```

最上位の `#query` には、多くの便利なクエリメソッドが構築されています。

一度に複数の列を読み取ることが出来ます:

```crystal
name, age = rs.read(String, Int32)
```

１行で読み取ることもできます:

```crystal
name, age = db.query_one "select name, age from contacts order by age desc limit 1", as: {String, Int32}
```

また、ResultSet を明示的に取り扱わずにスカラ値を読み取ることもできます:

```crystal
max_age = db.scalar "select max(age) from contacts"
```

データベース内で文を実行するためのすべての利用可能なメソッドは `DB::QueryMethods` で定義されています。
