---
subtitle: Gentoo Linux への
---

Gentoo Linux は main オーバレイに Crystal のコンパイラを含んでいます。

## 設定

まずはじめに次の設定フラグを有効にする必要があるでしょう。

<div class="code_section">
{% highlight bash %}
# equery u dev-lang/crystal
[ Legend : U - final flag setting for installation]
[        : I - package is installed with flag     ]
[ Colors : set, unset                             ]
 * Found these USE flags for dev-lang/crystal-0.18.7:
 U I
 - - doc      : Add extra documentation (API, Javadoc, etc). It is recommended to enable per package instead of globally
 - - examples : Install examples, usually source code
 + + xml      : Use the dev-libs/libxml2 library to enable Crystal xml module
 + - yaml     : Use the dev-libs/libyaml library to enable Crystal yaml module
{% endhighlight bash %}
</div>

## インストール

<div class="code_section">
{% highlight bash %}
su -
emerge -a dev-lang/crystal
{% endhighlight bash %}
</div>
