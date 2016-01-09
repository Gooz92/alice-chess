'use strict';

var assert = require('assert'),
  FenParseHandler = require('../fen-parse-handler');

describe('FenParseHandler', function () {
  describe('#constructor()', function () {
    it('all event handlers must be function', function () {
      var fenParseHandler = new FenParseHandler({});

      Object.keys(fenParseHandler).forEach(function (eventName) {
        var eventHandler = fenParseHandler[eventName],
          type = typeof eventHandler;

        assert.strictEqual(type, 'function',
          "Event handler '" + eventName + "'' must be a function");
      });
    });

    it('throw error if at least one handler is not a function', function () {
      var handlers = {
        onStart: function() {},
        onEnd: function() {},
        onPiece: 'not a function'
      };

      var createParseHandler = function () {
        return new FenParseHandler(handlers);
      };

      assert.throws(createParseHandler, /onPiece/);
    });
  });
});
