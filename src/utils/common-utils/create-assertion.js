'use strict';

var arrayUtils = require('./array-utils');

function createUnaryAssertion(fn, message) {
  var defaultMessage = message || 'Assertion error';

  return function (arg, customMessage) {
    var message = customMessage || defaultMessage;

    if (!fn(arg)) {
       throwError(message, arg);
    }
  };
}

function createBinaryAssertion(fn, message) {
  var defaultMessage = message || 'Assertion error';

  return function (arg1, arg2, customMessage) {
    var message = customMessage || defaultMessage;

    if (!fn(arg1, arg2)) {
      throwError(message, arg1, arg2)
    }
  };
}

var assertion = module.exports = {
  createUnaryAssertion: createUnaryAssertion,
  createBinaryAssertion: createBinaryAssertion,

  isTrue: createUnaryAssertion(function (arg) {
    return arg === true;
  }),

  isFalse: createUnaryAssertion(function (arg) {
      return arg === false;
  }),

  equal: createBinaryAssertion(function (arg1, arg2) {
    return arg1 == arg2;
  }),

  strictEqual:
};
