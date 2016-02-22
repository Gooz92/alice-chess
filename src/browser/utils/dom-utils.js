'use strict';

var objectUtils = require('../../utils/common-utils/object-utils');

var domUtils = module.exports = {
  createElement: function (tagName, properties) {
    var element = document.createElement(tagName);
    objectUtils.merge(element, properties);
    return element;
  }
};
