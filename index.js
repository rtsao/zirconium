'use strict';

var globalDocument = require('global/document');
var assign = require('object-assign');
var map = require('map-obj');

module.exports = Zirconium;

function Zirconium(props, config) {
  if (!(this instanceof Zirconium)) {
    return new Zirconium(props, config);
  }

  if (!props.name) {
    throw new Error('`name` is required');
  }

  config = assign({document: globalDocument}, config);

  var registrationOptions = getRegistrationOptions(props)
  return config.document.registerElement(props.name, registrationOptions);
}

var LIFECYCLE_METHODS = {
  elementDidInit: {name: 'createdCallback', wrapper: wrapInitMethod},
  elementDidMount: {name: 'attachedCallback'},
  elementDidUnmount: {name: 'detachedCallback'},
  elementAttrDidChange: {name: 'attributeChangedCallback'}
};

function wrapInitMethod(cb) {
  return function elementDidInit() {
    var childNodes = Array.prototype.slice.call(this.childNodes);
    var nodes = cb.call(this, childNodes);

    if (nodes) {
      while (this.firstChild) {
        this.removeChild(this.firstChild);
      }
      this.appendChild(nodes);
    }
  }
}

function getElementProps(props) {
  return map(props, function(key, val) {
    var method = LIFECYCLE_METHODS[key];
    if (method) {
      key = method.name;
      val = method.wrapper ? method.wrapper(val) : val;
    }
    return [key, val];
  });
}

function getRegistrationOptions(props) {
  function getComponentPrototype(baseElement) {
    return assign(Object.create(baseElement.prototype), getElementProps(props));
  }

  return assign({
    prototype: getComponentPrototype(props.nativeElement || HTMLElement)
  }, props.nativeElement && {extends: props.nativeElement.tagName});
}
