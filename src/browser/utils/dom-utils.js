'use strict';

var domUtils = module.exports = {
  createElement: function (tagName) {
    var element = document.createElement(tagName);
    return element;
  }
};
