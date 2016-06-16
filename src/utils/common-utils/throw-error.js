'use strict';

var template = require('./template'),
  arrayUtils = require('./array-utils'),
  isUtils = require('./is-utils');

throwError.defaultMessage = 'Unspecified error';

function throwError(pattern /* ,param1, param2, ...paramN */) {
  var parameters = arrayUtils.toArray(arguments).splice(1),
    message;

  if (isUtils.isString(pattern)) {
    message = template(pattern, parameters);
  } else if (arguments.length > 0) {
    message = arguments[0];
  } else {
    message = throwError.defaultMessage;
  }

  throw new Error(message);
}

module.exports = throwError;
