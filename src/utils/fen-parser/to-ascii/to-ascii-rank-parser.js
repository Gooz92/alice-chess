'use strict';

var RankParser = require('./rank-parser'),
  objectUtils = require('../../common-utils/object-utils'),
  createRankParseHandlers = require('./create-rank-parse-handlers');

ToAsciiRankParser.defaultEmptySquareToken = '.';

function ToAsciiRankParser(options) {
  var handlers;

  options = objectUtils.defaults(options, {
    emptySquareToken: ToAsciiRankParser.defaultEmptySquareToken
  });

  handlers = createRankParseHandlers(options);

  this.rankParser = new RankParser(handlers);
}

ToAsciiRankParser.prototype.parse = function (rank) {
  return this.rankParser.parse(rank);
};

module.exports = ToAsciiRankParser;
