'use strict';

var CastlingRightsParser = require('../castling-rights-parser'),
  assert = require('chai').assert;

describe('CastlingRightsParser', function () {
  describe('#parse()', function () {
    var parser;
    beforeEach(function () {
      parser = new CastlingRightsParser();
    });

    it('throw error for invalid castling rights token', function () {
      var invalidCastlingRights = 'Qks';
      // TODO add checking for error message
      assert.throws(function () {
        parser.parse(invalidCastlingRights);
      });
    });

    it('throw error for repeated castling token', function () {
      var invalidCastlingRights = 'KK';

      assert.throws(function () {
        parser.parse(invalidCastlingRights);
      });
    });

    it('throw error for wrong castling token order', function () {
      var invalidCastlingRights = 'qK';

      assert.throws(function () {
        parser.parse(invalidCastlingRights);
      });
    });
  });
});
