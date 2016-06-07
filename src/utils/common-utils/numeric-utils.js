'use strict';

var POSITIVE_INTEGER_PATTERN = /^\d+$/;

module.exports = {
  isNonNegativeInteger: function (arg) {
    return POSITIVE_INTEGER_PATTERN.test(arg);
  }
};
