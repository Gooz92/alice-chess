'use strict';

var assert = require('assert'),
  sinon = require('sinon'),
  FenParser = require('../fen-parser');

describe('FenParser callback behaviour', function () {
  describe('#parseActiveColor()', function () {
    describe('onWhiteActiveColor', function () {
      it("call only onWhiteActiveColor when color token is 'w'", function () {
        var parser = new FenParser({
          onWhiteActiveColor: sinon.spy(),
          onBlackActiveColor: sinon.spy()
        });

        parser.parseActiveColor('w');

        assert(parser.handler.onWhiteActiveColor.calledOnce);
        assert(!parser.handler.onBlackActiveColor.called);
      });

      it('return value from the onWhiteActiveColor', function () {
        var returns = 'white as snow';

        var parser = new FenParser({
          onWhiteActiveColor: sinon.stub().returns(returns)
        });

        var result = parser.parseActiveColor('w');

        assert.strictEqual(result, returns);
      });
    });

    describe('onBlackActiveColor', function () {
      it("call only onBlackActiveColor when color token is 'b'", function () {
        var parser = new FenParser({
          onWhiteActiveColor: sinon.spy(),
          onBlackActiveColor: sinon.spy()
        });

        parser.parseActiveColor('b');

        assert(!parser.handler.onWhiteActiveColor.called);
        assert(parser.handler.onBlackActiveColor.calledOnce);
      });

      it('return value from the onBlackActiveColor', function () {
        var returns = 'black as night';

        var parser = new FenParser({
          onBlackActiveColor: sinon.stub().returns(returns)
        });

        var result = parser.parseActiveColor('b');
        assert.strictEqual(result, returns);
      });
    });
  });
});
