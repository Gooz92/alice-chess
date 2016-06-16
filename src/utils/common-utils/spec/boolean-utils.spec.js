'use strict';

var booleanUtils = require('../boolean-utils'),
  assert = require('chai').assert;

describe('booleanUtils', function () {
  describe('.isTrue()', function () {
    var isTrue = booleanUtils.isTrue;
    it('return true for true', function () {
      assert.isTrue(isTrue(true));
    });

    it('return false for false', function () {
      assert.isFalse(isTrue(false));
    });

    it('return false for truthy value', function () {
      var truthy = 1;
      assert.isFalse(isTrue(truthy));
    });

    it('return false for falsy value', function () {
      var falsy = null;
      assert.isFalse(isTrue(falsy));
    });
  });

  describe('.isNotTrue()', function () {
    var isNotTrue = booleanUtils.isNotTrue;
    it('return true for false', function () {
      assert.isTrue(isNotTrue(false));
    });

    it('return true for falsy value', function () {
      var falsy = void 0;
      assert.isTrue(isNotTrue(falsy));
    });

    it('return true for truthy value', function () {
      var truthy = 'truth';
      assert.isTrue(isNotTrue(truthy));
    });

    it('return false for true', function () {
       assert.isFalse(isNotTrue(true));
    });
  });

  describe('.isFalse()', function () {
    var isFalse = booleanUtils.isFalse;
    it('return true for false', function () {
      assert.isTrue(isFalse(false));
    });

    it('return false for true', function () {
      assert.isFalse(isFalse(true));
    });

    it('return false for falsy value', function () {
      var falsy = 0;
      assert.isFalse(isFalse(falsy));
    });

    it('return false for truthy value', function () {
      var truthy = [];
      assert.isFalse(isFalse(truthy));
    });
  });

  describe('.isNotFalse()', function () {
    var isNotFalse = booleanUtils.isNotFalse;
    it('return true for true', function () {
      assert.isTrue(isNotFalse(true));
    });

    it('return true for truthy value', function () {
      var truthy = 42;
      assert.isTrue(isNotFalse(truthy));
    });

    it('return true for falsy value', function () {
      var falsy = '';
      assert.isTrue(isNotFalse(falsy));
    });

    it('return false for false', function () {
      assert.isFalse(isNotFalse(false));
    });
  });

  describe('.isTruthy()', function () {
    var isTruthy = booleanUtils.isTruthy;
    it('return true for true', function () {
      assert.isTrue(isTruthy(true));
    });

    it('return true for truthy value', function () {
      var truthy = {};
      assert.isTrue(isTruthy(truthy));
    });

    it('return false for false', function () {
      assert.isFalse(isTruthy(false));
    });

    it('return false for falsy value', function () {
      var falsy = ['just one element'][1];
       assert.isFalse(isTruthy(false));
    });

  });

  describe('.isFalsy()', function () {
    var isFalsy = booleanUtils.isFalsy;
    it('return true for falsy value', function () {
      var falsy = 0;
      assert.isTrue(isFalsy(falsy));
    });

    it('return true for false', function () {
      assert.isTrue(isFalsy(false));
    });

    it('return false for true', function () {
      assert.isFalse(isFalsy(true));
    });

    it('return false for truthy value', function () {
      var truthy = ['true'];
      assert.isFalse(isFalsy(truthy));
    });

  });

  describe('.toInteger()', function () {
    var toInteger = booleanUtils.toInteger;
    it('return 1 for true', function () {
      assert.strictEqual(toInteger(true), 1);
    });

    it('return 1 for truthy value', function () {
      var truthy = 'truthy';
      assert.strictEqual(toInteger(truthy), 1);
    });

    it('return 0 for false', function () {
      assert.strictEqual(toInteger(false), 0);
    });

    it('return 0 for falsy value', function () {
      var falsy = null;
      assert.strictEqual(toInteger(falsy), 0);
    });
  });

  describe('.fromInteger()', function () {
    var fromInteger = booleanUtils.fromInteger;
    it('return true for 1', function () {
      assert.isTrue(fromInteger(1));
    });

    it('return false for 0', function () {
      assert.isFalse(fromInteger(0));
    });

    it('return true for negative numbers', function () {
      var negative = -1;
      assert.isTrue(fromInteger(negative));
    });

    it('return true for positive numbers', function () {
      var positive = 42;
      assert.isTrue(fromInteger(positive));
    });
  });

  describe('.fromString()', function () {
    var fromString = booleanUtils.fromString;
    it("return true for 'true", function () {
      assert.isTrue(fromString('true'));
    });

    it("return false for 'false'", function () {
      assert.isFalse(fromString('false'));
    });

    it("throw error if arguments is not 'true' or 'false'", function () {
      var invalidString = 'lie';

      assert.throws(function () {
        fromString(invalidString);
      }, invalidString);
    });
  });
});
