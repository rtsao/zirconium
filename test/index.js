'use strict';

var document = require('global/document');
var test = require('tape');

var Zr = require('../')

test('name is required', function (assert) {
  assert.throws(function() {
    return Zr({});
  }, /`name` is required/, 'error thrown');
  assert.end();
});

test('constructs custom element with new operator', function (assert) {
  var MyWidget = Zr({
    name: 'my-widget-1',
  });
  var widget = new MyWidget();
  assert.equal(widget.nodeName, 'my-widget-1'.toUpperCase(), 'node name matches');
  assert.end();
});

test('constructs custom element with document.createElement', function (assert) {
  var MyWidget = Zr({
    name: 'my-widget-2'
  });
  var widget = document.createElement('my-widget-2');
  assert.equal(widget.nodeName, 'my-widget-2'.toUpperCase(), 'node name matches');
  assert.end();
});

test('calls elementDidInit', function (assert) {
  var MyWidget = Zr({
    name: 'my-widget-3',
    elementDidInit: function() {
      assert.ok(true, 'elementDidInit called');
      assert.end();
    }
  });

  var widget = document.createElement('my-widget-3');
});

test('calls elementDidMount', function (assert) {
  var MyWidget = Zr({
    name: 'my-widget-4',
    elementDidMount: function() {
      assert.ok(true, 'elementDidMount called');
      assert.end();
    }
  });

  var widget = document.createElement('my-widget-4');
  document.body.appendChild(widget);
});

test('calls elementDidUnmount', function (assert) {
  var MyWidget = Zr({
    name: 'my-widget-5',
    elementDidUnmount: function() {
      assert.ok(true, 'elementDidUnmount called');
      assert.end();
    }
  });

  var widget = document.createElement('my-widget-5');
  document.body.appendChild(widget);
  document.body.removeChild(widget);
});

test('passes children', function (assert) {

  var widget = document.createElement('my-widget-6');
  widget.appendChild(document.createElement('p'));
  widget.appendChild(document.createElement('span'));
  document.body.appendChild(widget);

  var MyWidget = Zr({
    name: 'my-widget-6',
    elementDidInit: function(children) {
      assert.equal(children.length, 2, 'both children passed');
      assert.end();
    }
  });
});

test('renders returned markup', function (assert) {
  var div = document.createElement('div');
  div.id = 'foo';

  var widget = document.createElement('my-widget-7');
  var p = document.createElement('p');
  p.id = 'bar';
  widget.appendChild(p);
  document.body.appendChild(widget);

  var MyWidget = Zr({
    name: 'my-widget-7',
    elementDidInit: function() {
      return div;
    }
  });

  var foo = document.getElementById('foo');
  assert.notOk(document.getElementById('bar'), 'p not rendered');
  assert.equal(foo, div, 'returned markup rendered');
  assert.end();
});

test('extends native element', function (assert) {
  var MyWidget = Zr({
    name: 'my-widget-8',
    nativeElement: {
      tagName: 'div',
      prototype: HTMLDivElement.prototype
    },
    elementDidInit: function() {
      assert.ok(true, 'elementDidInit called');
      assert.end();
    }
  });

  var widget = document.createElement('div', 'my-widget-8');
});
