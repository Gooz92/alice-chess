'use strict';

function getType(arg) {
  var type = typeof arg;

  if (type !== 'object') {
    return type;
  } else if (arg === null) {
    return 'null';
  } else if (Array.isArray(arg)) {
    return 'array';
  }

  return 'object';
}

module.exports = getType;
