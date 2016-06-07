'use strict';

var positionUtils = require('../position-utils'),
  assert = require('chai').assert;

describe('positionUtils', function () {
  describe('.isValidSyntax', function () {
    var isValidSyntax = positionUtils.isValidSyntax;

    it('return true for empty object', function () {
      var truth = isValidSyntax({});
      assert.isTrue(truth);
    });

    it('return false for postion with invalid square name', function () {
      var lie = isValidSyntax({
        '2a': 'p'
      });

      assert.isFalse(lie);
    });

    it('return false for position with invalid piece token', function () {
      var invalidPieceToken = 'i',
        lie = isValidSyntax({
          a1: invalidPieceToken
        });

      assert.isFalse(lie);
    });
  });

  describe('.validateSyntax', function () {
    var validateSyntax = positionUtils.validateSynax;
    it('return empty object for empty object', function () {
      var nothingness = validateSyntax({});
      assert.deepEqual(nothingness, {});
    });
  });
});
