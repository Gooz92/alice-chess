'use strict';

var langFns = require('../lang-fns'),
  assert = require('chai').assert;

describe('langFns', function () {
  describe('.noop()', function () {
    it('return undefined', function () {
      assert.isUndefined(langFns.noop());
    });
  });

  describe('.equal()', function () {
    var equal = langFns.equal;
    it('return true for equal primitives', function () {
      assert.isTrue(equal(1, 1));
    });

    it('return true for not strict equal argumnets', function () {
      assert.isTrue(equal('42', 42));
      assert.isTrue(equal('', false));
      assert.isTrue(equal(1, true));
    });

    it('return true for references to same object', function () {
      var point = {
        x: 1,
        y: 2
      };

      var samePoint = point;

      assert.isTrue(equal(point, samePoint));
    });

    it('return false for different primitives', function () {
      assert.isFalse(equal(1, 2));
    });

    it('return false for different references', function () {
      var box = {
        content: 'lamp'
      };

      var anotherBoxWithLamp = {
        content: 'lamp'
      };

      assert.isFalse(equal(box, anotherBoxWithLamp));
    });
  });

  describe('.strictEqual()', function () {
    var strictEqual = langFns.strictEqual;
    it('return true for equal primitives', function () {
      assert.isTrue(strictEqual('twin', 'twin'));
    });

    it('return false for not strict equal primitives', function () {
      assert.isFalse(strictEqual(1, '1'));
      assert.isFalse(strictEqual(1, true));
      assert.isFalse(strictEqual(false, 0));
    });

    it('return true for references to same object', function () {
      var refOne = 'twin',
        refTwo = refOne;

      assert.isTrue(strictEqual(refOne, refTwo));
    });

    it('return false for different references', function () {
      var refOne = [],
        refTwo = [];

      assert.isFalse(strictEqual(refOne, refTwo));
    });
  });

  describe('.greatThan()', function () {
    var greatThan = langFns.greatThan;
    it('return true if first argument is great than second', function () {
      assert.isTrue(greatThan(2, 1));
    });

    it('return false if first argument is less than second', function () {
      assert.isFalse(greatThan(4.9, 5));
    });

    it('return false if first argument equal to second', function () {
      assert.isFalse(greatThan(42, 42));
    });
  });

  describe('.lessThan()', function () {
    var lessThan = langFns.lessThan;
    it('return true if first argument is less than second', function () {
      assert.isTrue(lessThan(1, 2));
    });

    it('return false if first argument is great than second', function () {
      assert.isFalse(lessThan(-2, -3));
    });

    it('return false if first argument equal to second', function () {
      assert.isFalse(lessThan(-2, -2));
    });
  });

  describe('.greatOrEqualThan()', function () {
    var greatOrEqualThan = langFns.greatOrEqualThan;
    it('return true if first argument is great than second', function () {
      assert.isTrue(greatOrEqualThan(3, 2));
    });

    it('return false if first argument is less than second', function () {
      assert.isFalse(greatOrEqualThan(3, 3.1));
    });

    it('return true if first argument equal to second', function () {
      assert.isTrue(greatOrEqualThan(4.2, 4.2));
    });
  });

  describe('.lessOrEqualThan()', function () {
    var lessOrEqualThan = langFns.lessOrEqualThan;
    it('return true if first argument is less than second', function () {
      assert.isTrue(lessOrEqualThan(1, 2));
    });

    it('return false if first argument is great than second', function () {
      assert.isFalse(lessOrEqualThan(3, 2));
    });

    it('return true if first argument equal to second', function () {
      assert.isTrue(lessOrEqualThan(3, 3));
    });
  });
});
