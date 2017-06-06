const { noop, equal } = require('../lang-fns'),
  { assert: { isTrue, isFalse, isUndefined } } = require('chai');

describe('langFns', () => {

  describe('.noop()', () => {
    it('return undefined', () => {
      isUndefined(noop());
    });
  });

  describe('.equal()', () => {

    it('return true for equal primitives', () => {
      isTrue(equal('twin', 'twin'));
    });

    it('return false for not strict equal primitives', () => {
      isFalse(equal(1, '1'));
      isFalse(equal(1, true));
      isFalse(equal(false, 0));
    });

    it('return true for references to same object', () => {
      const refOne = 'twin';
      const refTwo = refOne;

      isTrue(equal(refOne, refTwo));
    });

    it('return false for different references', () => {
      const refOne = [];
      const refTwo = [];

      isFalse(equal(refOne, refTwo));
    });
  });
});
