
# zirconium

[![build status][travis]][travis-uri]
[![coverage status][coveralls]][coveralls-uri]
[![coverage status][deps]][deps-uri]

A picoframework for Web Components

* Eliminates unnecessary ceremony when defining custom elements
* Provides a more functional interface versus vanilla custom element syntax
* Tiny (<700 bytes gzipped)

# usage
Your javascript:

```javascript
var Zr = require('zirconium');
var h = require('hyperscript');

var myWidget = Zr({
  name: 'my-widget',
  elementDidInit: function(children) {
    return h('div', [
      h('div', {style: {color: 'red'}, 'hello world'),
      h('div', children)
    ]);
  }
});
```

Your markup:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Hello World</title>
    <script src="main.js"></script>
  </head>
  <body>
    <my-widget>
      <div>foo</div>
    </my-widget>
  </body>
</html>
```

[travis]: https://travis-ci.org/rtsao/zirconium.svg?branch=master
[travis-uri]: https://travis-ci.org/rtsao/zirconium

[coveralls]: https://coveralls.io/repos/rtsao/zirconium/badge.svg?branch=master
[coveralls-uri]: https://coveralls.io/r/rtsao/zirconium

[deps]: https://david-dm.org/rtsao/zirconium.svg
[deps-uri]: https://david-dm.org/rtsao/zirconium
