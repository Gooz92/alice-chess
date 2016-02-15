'use strict';

var assert = require('assert'),
  FenParser = require('../fen-parser.js');

describe('FenParser errors behaviour', function () {
  describe('#parseActiveColor()', function () {
    it("throw error if color token is not 'w' or 'b'", function () {
      var parser = new FenParser(),
        notExistingColor = 'magenta';

      var parseNotExistingColor = function() {
        return parser.parseActiveColor('magenta');
      };

      assert.throws(parseNotExistingColor, new RegExp(notExistingColor));
    });
  });
});
