{% highlight yaml %}
name: my-project
version: 0.1
license: MIT

crystal: {{ latest_release.version }}

dependencies:
  mysql:
    github: crystal-lang/crystal-mysql
{% endhighlight %}
