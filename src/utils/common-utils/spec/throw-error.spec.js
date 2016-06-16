'use strict';

var throwError = require('../throw-error'),
  throws = require('chai').assert.throws;

describe('throwError()', function () {
  it('throw error with default message if no arguments passed', function () {
    throws(throwError, new RegExp('^' + throwError.defaultMessage + '$'));
  });

  it('throw error with custom message', function () {
    var customMessage = 'Custom error',
      pattern = new RegExp('^' + customMessage + '$');

    throws(function () {
      throwError(customMessage);
    }, pattern);
  });

  it('replace placeholders in error message', function () {
    var messagePattern = 'Invalid values {0}, {1}',
      expectedPattern = /^Invalid values one, two$/;

    throws(function () {
      throwError(messagePattern, 'one', 'two');
    }, expectedPattern);
  });
});
