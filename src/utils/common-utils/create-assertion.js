'use strict';

var template = require('./template'),
  arrayUtils = require('./array-utils');

function createAssertion(fn, message) {
  var defaultMessage = message || 'Assertion error';

  return function (arg, customMessage) {
    var message = customMessage || defaultMessage;

    message = template(message, arg);

    if (!fn(arg)) {
      throw new Error(message);
    }
  };
}

module.exports = createAssertion;
