'use strict';

var CastlingRightsParser = require('../castling-rights-parser'),
  assert = require('chai').assert,
  sinon = require('sinon');

describe('CastlingRightsParser', function () {
  describe('#parse()', function () {
    describe('onStart', function () {
      it('take not parsed castling rights as argument', function () {
        var onStart = sinon.spy(),
          parser = new CastlingRightsParser({
            onStart: onStart
          }),
          castlingRights = 'Kq';

        parser.parse(castlingRights);

        assert.isTrue(onStart.calledWith(castlingRights));
      });
    });
    describe('onCastlingRightsToken', function () {
      it('called for every castling right token', function () {
        var onCastlingRightsToken = sinon.spy(),
          parser = new CastlingRightsParser({
            onCastlingRightsToken: onCastlingRightsToken
          }),
          castlingRights = 'Qk';

        parser.parse(castlingRights);

        assert.deepEqual(onCastlingRightsToken.firstCall.args, ['Q']);
        assert.deepEqual(onCastlingRightsToken.secondCall.args, ['k']);
      });
    });
  });
});
