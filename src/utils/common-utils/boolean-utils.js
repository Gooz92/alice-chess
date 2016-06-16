'use strict';

var throwError = require('./throw-error');

var booleanUtils = module.exports = {
  isTrue: function (arg) {
    return arg === true;
  },

  isNotTrue: function (arg) {
    return arg !== true;
  },

  isFalse: function (arg) {
    return arg === false;
  },

  isNotFalse: function (arg) {
    return arg !== false;
  },

  isTruthy: function (arg) {
    return !!arg;
  },

  isFalsy: function (arg) {
    return !arg;
  },

  toInteger: function (arg) {
    return +booleanUtils.isTruthy(arg);
  },

  fromInteger: function (arg) {
    return booleanUtils.isTruthy(+arg);
  },

  fromString: function (arg) {
    if (arg === 'true') {
      return true;
    } else if (arg === 'false') {
      return false;
    }

    throwError("Invalid argument: '{0}'. It must be 'true' or 'false'!", arg);
  }
};
