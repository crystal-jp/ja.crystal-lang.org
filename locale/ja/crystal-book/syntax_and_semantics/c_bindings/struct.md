# struct

A `struct` declaration inside a `lib` declares a C struct.

```crystal
lib C
  # C では:
  #
  #  struct TimeZone {
  #    int minutes_west;
  #    int dst_time;
  #  };
  struct TimeZone
    minutes_west : Int32
    dst_time : Int32
  end
end
```

同じ型のフィールドは複数指定することも可能です。

```crystal
lib C
  struct TimeZone
    minutes_west, dst_time : Int32
  end
end
```

Recursive structs work just like you expect them to:

```crystal
lib C
  struct LinkedListNode
    prev, _next : LinkedListNode*
  end

  struct LinkedList
    head : LinkedListNode*
  end
end
```

To create an instance of a struct use `new`:

```crystal
tz = C::TimeZone.new
```

これによって、スタックに構造体が割り当てられます。

C の構造体は、初期状態として、すべての値が「ゼロ」の状態になります。つまり、整数と浮動小数点数はゼロで、ポインタはゼロのアドレスを指している、などの状態です。

To avoid this initialization you can use `uninitialized`:

```crystal
tz = uninitialized C::TimeZone
tz.minutes_west # => some garbage value
```

プロパティの設定、および参照が可能です。

```crystal
tz = C::TimeZone.new
tz.minutes_west = 1
tz.minutes_west # => 1
```

If the assigned value is not exactly the same as the property's type, [to_unsafe](to_unsafe.html) will be tried.

You can also initialize some fields with a syntax similar to [named arguments](../default_and_named_arguments.html):

```crystal
tz = C::TimeZone.new minutes_west: 1, dst_time: 2
tz.minutes_west # => 1
tz.dst_time     # => 2
```

C の構造体は関数やメソッドに (コピーとして) 値渡しされます。また、メソッドから返るときも値で渡されます。

```crystal
def change_it(tz)
  tz.minutes_west = 1
end

tz = C::TimeZone.new
change_it tz
tz.minutes_west # => 0
```

Refer to the [type grammar](../type_grammar.html) for the notation used in struct field types.
