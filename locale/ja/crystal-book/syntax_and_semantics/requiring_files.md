# Requiring files

小さなプログラムやベンチマーク用途のコードであれば1つのファイルに書いても OK ですが、大きなプログラムの場合は、複数のファイルに分けることでメンテナンスが楽になり、また理解もしやすくなります。

To make the compiler process other files you use `require "..."`. 引数には1つの文字列リテラルをとり、その書き方によって様々な形式で対象を指定することができます。

Once a file is required, the compiler remembers its absolute path and later `require`s of that same file will be ignored.

## require "filename"

このように記述した場合、require パスの中で「ファイル名」のファイルを探します。

By default the require path is the location of the standard library that comes with the compiler, and the "lib" directory relative to the current working directory (given by `pwd` in a Unix shell). 探索の対象となるディレクトリはこれらのみです。

ファイルの探索は以下の流れで処理されます。

* If a file named "filename.cr" is found in the require path, it is required.
* If a directory named "filename" is found and it contains a file named "filename.cr" directly underneath it, it is required.
* If a directory named "filename" is found with a directory "src" in it and it contains a file named "filename.cr" directly underneath it, it is required.
* If a directory named "filename" is found with a directory "src" in it and it contains a directory named "filename" directly underneath it with a "filename.cr" file inside it, it is required.
* Otherwise a compile-time error is issued.

The second rule means that in addition to having this:

```
- project
  - src
    - file
      - sub1.cr
      - sub2.cr
    - file.cr (requires "./file/*")
```

you can have it like this:

```
- project
  - src
    - file
      - file.cr (requires "./*")
      - sub1.cr
      - sub2.cr
```

which might be a bit cleaner depending on your taste.

The third rule is very convenient because of the typical directory structure of a project:

```
- project
  - lib
    - foo
      - src
        - foo.cr
    - bar
      - src
        - bar.cr
  - src
    - project.cr
  - spec
    - project_spec.cr
```

That is, inside "lib/{project}" each project's directory exists (`src`, `spec`, `README.md` and so on)

For example, if you put `require "foo"` in `project.cr` and run `crystal src/project.cr` in the project's root directory, it will find `foo` in `lib/foo/foo.cr`.

The fourth rule is the second rule applied to the third rule.

If you run the compiler from somewhere else, say the `src` folder, `lib` will not be in the path and `require "foo"` can't be resolved.

## require "./filename"

このように記述した場合、require を実行したファイルから相対的に「ファイル名」のファイルを探します。

ファイルの探索は以下の流れで処理されます。

* If a file named "filename.cr" is found relative to the current file, it is required.
* If a directory named "filename" is found and it contains a file named "filename.cr" directly underneath it, it is required.
* Otherwise a compile-time error is issued.

この相対パス参照はプロジェクトの中で他のファイルを参照するときによく使われます。It is also used to refer to code from [specs](../guides/testing.md):

```crystal
# in spec/project_spec.cr
require "../src/project"
```

## Other forms

上記したどちらのケースでも、ネストされた形式で名前を指定することが可能で、その場合にはネストされたデイレクトリを探索します。

* `require "foo/bar/baz"` will lookup "foo/bar/baz.cr", "foo/bar/baz/baz.cr", "foo/src/bar/baz.cr" or "foo/src/bar/baz/baz.cr" in the require path.
* `require "./foo/bar/baz"` will lookup "foo/bar/baz.cr" or "foo/bar/baz/baz.cr" relative to the current file.

You can also use "../" to access parent directories relative to the current file, so `require "../../foo/bar"` works as well.

In all of these cases you can use the special `*` and `**` suffixes:

* `require "foo/*"` will require all ".cr" files below the "foo" directory, but not below directories inside "foo".
* `require "foo/**"` will require all ".cr" files below the "foo" directory, and below directories inside "foo", recursively.
