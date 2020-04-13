# Constants

定数はトップレベル、もしくはある型の内部で宣言することができます。定数の先頭は大文字である必要があります。

```crystal
PI = 3.14

module Earth
  RADIUS = 6_371_000
end

PI            # => 3.14
Earth::RADIUS # => 6_371_000
```

また、これはコンパイラに強制されることではありませんが、一般的に定数名はすべて大文字とし、単語はアンダースコアで区切ります。

定数を定義する際にメソッドを実行したり、複雑なロジックを使って定義することもできます。

```crystal
TEN = begin
  a = 0
  while a < 10
    a += 1
  end
  a
end

TEN # => 10
```

# Pseudo Constants

Crystal provides a few pseudo-constants which provide reflective data about the source code being executed.

`__LINE__` is the current line number in the currently executing crystal file. When `__LINE__` is declared as the default value to a method parameter, it represents the line number at the location of the method call.

`__END_LINE__` is the line number of the `end` of the calling block. Can only be used as a default value to a method parameter.

`__FILE__` references the full path to the currently executing crystal file.

`__DIR__` references the full path to the directory where the currently executing crystal file is located.

```crystal
# Assuming this example code is saved at: /crystal_code/pseudo_constants.cr
#
def pseudo_constants(caller_line = __LINE__, end_of_caller = __END_LINE__)
  puts "Called from line number: #{caller_line}"
  puts "Currently at line number: #{__LINE__}"
  puts "End of caller block is at: #{end_of_caller}"
  puts "File path is: #{__FILE__}"
  puts "Directory file is in: #{__DIR__}"
end

begin
  pseudo_constants
end

# Program prints:
# Called from line number: 13
# Currently at line number: 5
# End of caller block is at: 14
# File path is: /crystal_code/pseudo_constants.cr
# Directory file is in: /crystal_code
```

# Dynamic assignment

Dynamically assigning values to constants using the [chained assignment](assignment.md#chained-assignment) or the [multiple assignment](assignment.md#multiple-assignment) is not supported and results in a syntax error.

```crystal
ONE, TWO, THREE = 1, 2, 3 # Syntax error: Multiple assignment is not allowed for constants
```
