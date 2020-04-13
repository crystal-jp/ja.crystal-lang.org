The Crystal standard library includes some pre-defined annotations:

* [Link](#link)
* [Extern](#extern)
* [ThreadLocal](#threadlocal)
* [Packed](#packed)
* [AlwaysInline](#alwaysinline)
* [NoInline](#noinline)
* [ReturnsTwice](#returnstwice)
* [Raises](#raises)
* [CallConvention](#callconvention)
* [Flags](#flags)

## Link

C ライブラリのリンクをコンパイラに指示します。This is explained in the [lib](../c_bindings/lib.html) section.

## Extern

Marking a Crystal struct with this attribute makes it possible to use it in lib declarations:

```crystal
@[Extern]
struct MyStruct
end

lib MyLib
  fun my_func(s : MyStruct) # OK (gives an error without the Extern attribute)
end
```

You can also make a struct behave like a C union (this can be pretty unsafe):

```crystal
# A struct to easily convert between Int32 codepoints and Chars
@[Extern(union: true)]
struct Int32OrChar
  property int = 0
  property char = '\0'
end

s = Int32OrChar.new
s.char = 'A'
s.int # => 65

s.int = 66
s.char # => 'B'
```

## ThreadLocal

The `@[ThreadLocal]` attribute can be applied to class variables and C external variables. これによって、それらの変数がスレッドローカルになります。

```crystal
class DontUseThis
  # One for each thread
  @[ThreadLocal]
  @@values = [] of Int32
end
```

ThreadLocal is used in the standard library to implement the runtime and shouldn't be
needed or used outside it.

## Packed

Marks a [C struct](../c_bindings/struct.html) as packed, which prevents the automatic insertion of padding bytes between fields. This is typically only needed if the C library explicitly uses packed structs.

## AlwaysInline

常にメソッドをインラインにするようにコンパイラに指示します。

```crystal
@[AlwaysInline]
def foo
  1
end
```

## NoInline

メソッドを呼び出しをインラインにしないようにコンパイラに指示します。This has no effect if the method yields, since functions which yield are always inlined.

```crystal
@[NoInline]
def foo
  1
end
```

## ReturnsTwice

Marks a method or [lib fun](../c_bindings/fun.html) as returning twice. The C `setjmp` is an example of such a function.

## Raises

Marks a method or [lib fun](../c_bindings/fun.html) as potentially raising an exception. This is explained in the [callbacks](../c_bindings/callbacks.html) section.

## CallConvention

Indicates the call convention of a [lib fun](../c_bindings/fun.html). 例をあげます。

```crystal
lib LibFoo
  @[CallConvention("X86_StdCall")]
  fun foo : Int32
end
```

有効な呼出規約は以下のとおりです。

* C (the default)
* Fast
* Cold
* WebKit_JS
* AnyReg
* X86_StdCall
* X86_FastCall

They are explained [here](http://llvm.org/docs/LangRef.html#calling-conventions).

## Flags

Marks an [enum](../enum.html) as a "flags enum", which changes the behaviour of some of its methods, like `to_s`.
