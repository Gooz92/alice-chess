'use strict';

var arrayUtils = require('./array-utils');

function template(pattern /* arg1, arg2 */) {
  var parameters;

  if (Array.isArray(arguments[1])) {
    parameters = arguments[1];
  } else {
    parameters = arrayUtils.toArray(arguments).splice(1);
  }

  return pattern.replace(/\\?\{(\d+)\}/g, function (placeholder, number) {
    var index;

    if (placeholder.charAt(0) === '\\') {
      return placeholder;
    }

    index = parseInt(number);

    return parameters[index];
  });
}

module.exports = template;
