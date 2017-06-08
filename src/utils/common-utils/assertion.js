const throwError = require('./throw-error'),
  { isTrue, isFalse } = require('./boolean-utils.js'),
  { equal } = require('./lang-fns.js');

const DEFAULT_MESSAGE = 'Assertion error';

function createUnaryAssertion(fn, message = DEFAULT_MESSAGE) {
  return (arg, customMessage = message) => {
    if (!fn(arg)) {
       throwError(customMessage, arg);
    }
  };
}

function createBinaryAssertion(fn, message = DEFAULT_MESSAGE) {
  return (arg1, arg2, customMessage = message) => {
    if (!fn(arg1, arg2)) {
      throwError(message, arg1, arg2);
    }
  };
}

module.exports = {
  createUnaryAssertion,
  createBinaryAssertion,

  isTrue: createUnaryAssertion(isTrue),

  isFalse: createUnaryAssertion(isFalse),

  equal: createBinaryAssertion(equal)
};
