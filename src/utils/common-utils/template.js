'use strict';

function template(pattern /* arg1, arg2 */) {
  var parameters = arguments;

  return pattern.replace(/\\?\{(\d+)\}/g, function (placeholder, number) {
    var index;

    if (placeholder.charAt(0) === '\\') {
      return placeholder;
    }

    index = parseInt(number) + 1;

    return parameters[index];
  });
}

module.exports = template;
