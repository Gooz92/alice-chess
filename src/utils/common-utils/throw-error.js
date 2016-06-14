'use strict';

var template = require('./template'),
  arrayUtils = require('./array-utils');

function throwError(pattern /* ,param1, param2, ...paramN */) {
  var parameters = arrayUtils.toArray(arguments).splice(1),
    message = template(pattern, parameters);

  throw new Error(message);
}

module.exports = throwError;
