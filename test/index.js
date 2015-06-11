'use strict';

var document = require('global/document');
var test = require('tape');

var Zr = require('../')

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
