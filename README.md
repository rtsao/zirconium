
# zirconium
A picoframework for Web Components

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
