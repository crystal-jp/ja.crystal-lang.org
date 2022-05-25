---
subtitle: On Arch Linux
---

Arch Linux はコミュニティのリポジトリで Crystal コンパイラが提供されています。You should also install `shards`, Crystal's dependency manager (see [The Shards command](https://crystal-lang.org/reference/the_shards_command/)).
[Snapcraft](#snapcraft) も使えます。

## インストール

<div class="code_section">
{% highlight bash %}
sudo pacman -S crystal shards
{% endhighlight bash %}
</div>

{% include install_from_snapcraft.md distro='arch' %}
