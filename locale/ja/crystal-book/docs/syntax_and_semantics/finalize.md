# finalize

もしクラスに `finalize` メソッドが定義されていた場合、そのクラスのインスタンスがガベージコレクトされるときにそのメソッドが呼び出されます。

```crystal
class Foo
  def finalize
    # Foo がガベージコレクトされるときに呼び出される
    # 管理されていないリソースを解放するのに使う (例:C ライブラリ、構造体)
  end
end
```

外部ライブラリによって確保された、Crystalのガベージコレクタによって直接管理されていないリソースを解放するためにこのメソッドは使ってください。

例えば [`IO::FileDescriptor#finalize`](https://crystal-lang.org/api/IO/FileDescriptor.html#finalize-instance-method) や [`OpenSSL::Digest#finalize`](https://crystal-lang.org/api/OpenSSL/Digest.html#finalize-instance-method) で実際に利用されています。

**注意**:

- `finalize` メソッドが呼び出さされるのは、オブジェクトが `initialize` メソッド経由で完全に初期化されていた場合に限ります。もし例外が `initialize` メソッド中で発生したとき、`finalize` は呼び出されません。もしクラスに `finalize` メソッドを定義する場合は、必ず `initialize` メソッドで発生し得る例外を捕捉して、リソースの解放をするようにしてください。

- ガベージコレクション中に新規に確保されたオブジェクトに対する挙動は未定義で、恐らくその場合プログラムはクラッシュします。
