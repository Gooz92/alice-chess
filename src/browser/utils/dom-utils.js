'use strict';

var objectUtils = require('../../utils/common-utils/object-utils');

var domUtils = module.exports = {
  createElement: function (tagName, settings) {
    var element = document.createElement(tagName),
      options = settings || {},
      properties = objectUtils.omit(options, ['attributes', 'styles']),
      attributes = options.attributes || {},
      styles = options.styles || {};

    objectUtils.merge(element, properties);
    return element;
  }
};
