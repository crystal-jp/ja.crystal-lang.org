---
subtitle: Arch Linux への
---

Arch Linux はコミュニティのリポジトリで Crystal コンパイラが提供されています。くわえて `shards` もインストールしてください。これは Crystal の依存関係マネージャです ([shards コマンド](https://ja.crystal-lang.org/reference/the_shards_command/)参照)。
[Snapcraft](#snapcraft) も使えます。

## インストール

<div class="code_section">
{% highlight bash %}
sudo pacman -S crystal shards
{% endhighlight bash %}
</div>

{% include install_from_snapcraft.md distro='arch' %}
