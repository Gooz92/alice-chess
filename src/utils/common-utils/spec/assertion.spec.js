const { assert } = require('chai'),
  assertion = require('../assertion');

describe('assertion', () => {

  describe('createUnaryAssertion()', function () {
    it('return function', function () {
      var unaryAssertion = assertion.createUnaryAssertion(function () {});
      assert.isFunction(unaryAssertion);
    });
  });

  describe('.isTrue()', () => {

    it('throw error when argument is false', () => {
      assert.throws(() => assertion.isTrue(false));
    });

    it('throw error when argument is truthy', () => {
      assert.throws(() => assertion.isTrue('truthy'));
      assert.throws(() => assertion.isTrue(1));
      assert.throws(() => assertion.isTrue({}));
      assert.throws(() => assertion.isTrue([]));
    });

    it('do nothing if argument is true', () => {
      assertion.isTrue(true);
    });
  });

  describe('.isFalse()', () => {

    it('throw error when argument is true', () => {
      assert.throws(() => assertion.isFalse(true));
    });

    it('throw error when argument is falsy', () => {
      assert.throws(() => assertion.isFalse(0));
      assert.throws(() => assertion.isFalse(''));
      assert.throws(() => assertion.isFalse(null));
      assert.throws(() => assertion.isFalse(NaN));
      assert.throws(() => assertion.isFalse(void 0));
    });

    it('do nothing if argument is false', () => {
      assertion.isFalse(false);
    });
  });
});

