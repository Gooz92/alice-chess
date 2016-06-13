'use strict';

var castlingRightsUtils = require('../castling-rights-utils'),
  assert = require('chai').assert;

describe('castlingRightsUtils', function () {

  describe('.isWhiteShortCastlingPossible()', function () {
    var isCastlingPossible = castlingRightsUtils.isWhiteShortCastlingPossible;

    it('return false for 0 (=0b0000) (-)', function () {
      var noCastling = 0;
      assert.isFalse(isCastlingPossible(noCastling));
    });

    it('return false for 6 (=0b0110) (Qk)', function () {
      var Qk = parseInt('0110', 2);
      assert.isFalse(isCastlingPossible(Qk));
    });

    it('return true for 8 (=0b1000) (K)', function () {
      var K = parseInt('1000', 2); // 8
      assert.isTrue(isCastlingPossible(K));
    });

    it('return true for 10 (0b1010) (Kk)', function () {
      var Kk = parseInt('1010', 2);
      assert.isTrue(isCastlingPossible(Kk));
    });
  });

  describe('.isWhiteLongCastlingPossible()', function () {
    var isCastlingPossible = castlingRightsUtils.isWhiteLongCastlingPossible;

    it('return false for 0 (=0b0000) (-)', function () {
      var noCastling = 0;
      assert.isFalse(isCastlingPossible(noCastling));
    });

    it('return false for 3 (0b0011) (kq)', function () {
      var kq = parseInt('0011', 2);
      assert.isFalse(isCastlingPossible(kq));
    });

    it('return true for 4 (=0b0100) (Q)', function () {
      var Q = parseInt('0100', 2);
      assert.isTrue(isCastlingPossible(Q));
    });

    it('return true for 5 (=0b0101) (Qq)', function () {
      var Qq = parseInt('0101', 2);
      assert.isTrue(isCastlingPossible(Qq));
    });
  });

  describe('.isBlackShortCastlingPossible()', function () {
    var isCastlingPossible = castlingRightsUtils.isBlackShortCastlingPossible;

    it('return false for 0 (=0b0000) (-)', function () {
      var noCastling = 0;
      assert.isFalse(isCastlingPossible(noCastling));
    });

    it('return false for 13 (=0b1101) (KQq)', function () {
      var KQq = parseInt('1101', 2);
      assert.isFalse(isCastlingPossible(KQq));
    });

    it('return true for 2 (=0b0010) (k)', function () {
      var k = parseInt('0010', 2);
      assert.isTrue(isCastlingPossible(k));
    });

    it('return true for 14 (0b1110) (KQk)', function () {
      var KQk = parseInt('1110', 2);
      assert.isTrue(isCastlingPossible(KQk));
    });
  });

  describe('isBlackLongCastlingPossible()', function () {
    var isCastlingPossible = castlingRightsUtils.isBlackLongCastlingPossible;

    it('return false for 0 (=0b0000) (-)', function () {
      var noCastling = 0;
      assert.isFalse(isCastlingPossible(noCastling));
    });

    it('return false for 12 (=0b1100) (KQ)', function () {
      var KQ = parseInt('1100', 2);
      assert.isFalse(isCastlingPossible(KQ));
    });

    it('return true for 1 (=0b0001) (q)', function () {
      var q = parseInt('0001', 2);
      assert.isTrue(isCastlingPossible(q));
    });

    it('return true for 7 (=0b0111) (Qkq)', function () {
      var Qkq = parseInt('0111', 2);
      assert.isTrue(isCastlingPossible(Qkq));
    });
  });

  describe('toFenField()', function () {
    var toFenField = castlingRightsUtils.toFenField;

    it("return '-' for 0", function () {
      var noCastling = 0,
        fenField = toFenField(noCastling);

      assert.strictEqual(fenField, '-');
    });

    it("return 'Q' for 4 (=0b0100)", function () {
      var Q = 4,
        fenField = toFenField(Q);

      assert.strictEqual(fenField, 'Q');
    });

    it("return 'k' for 2 (=0b0010)", function () {
      var k = 2,
        fenField = toFenField(k);

      assert.strictEqual(fenField, 'k');
    });

    it("return 'Qk' 6 (=0b0110)", function () {
      var Qk = 6,
        fenField = toFenField(Qk);

      assert.strictEqual(fenField, 'Qk');
    });

    it("return 'Kq' for 9 (=0b1001)", function () {
      var Kq = 9,
        fenField = toFenField(Kq);

      assert.strictEqual(fenField, 'Kq');
    });

    it("return KQkq for 15 (0b=1111)", function () {
      var KQkq = 15,
        fenField = toFenField(15);

      assert.strictEqual(fenField, 'KQkq');
    });
  });
});
