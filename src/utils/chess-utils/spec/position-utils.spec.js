'use strict';

let positionUtils = require('../position-utils'),
  assert = require('chai').assert;

describe('positionUtils', function () {
  describe('.isValidSyntax', function () {
    let isValidSyntax = positionUtils.isValidSyntax;

    it('return true for empty object', function () {
      let truth = isValidSyntax({});
      assert.isTrue(truth);
    });

    it('return false for postion with invalid square name', function () {
      let invalidSquareName = '2a',
        lie = isValidSyntax({
          [invalidSquareName]: 'p'
        });

      assert.isFalse(lie);
    });

    it('return false for position with invalid piece token', function () {
      let invalidPieceToken = 'i',
        lie = isValidSyntax({
          a1: invalidPieceToken
        });

      assert.isFalse(lie);
    });
  });

  describe('.validateSyntax', function () {
    let validateSyntax = positionUtils.validateSynax;
    it('return empty array for empty object', function () {
      let nothingness = validateSyntax({});
      assert.deepEqual(nothingness, []);
    });
  });
});
