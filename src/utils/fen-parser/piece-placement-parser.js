'use strict';

var RankParser = require('./rank-parser'),
  langFns = require('../common-utils/lang-fns'),
  throwError = require('../common-utils/throw-error');

var ranksCount = 8;

function PiecePlacementParser(handlers) {
  handlers = handlers || {};

  this.handlers = {
    onStart: handlers.onStart || langFns.noop,
    onEnd: handlers.onEnd || langFns.noop
  };

  this.rankParser = new RankParser(handlers.rank);
}

PiecePlacementParser.prototype.parse = function (piecePlacement) {
  var data = {},
    rankParser = this.rankParser,
    ranks;

  this.handlers.onStart.call(data, piecePlacement);

  ranks = piecePlacement.split('/');

  if (ranks.length !== ranksCount) {
    throwError("Invalid ranks count: '{0}'", ranks.length);
  }

  ranks.forEach(function (rank) {
    rankParser.parse(rank, data);
  });

  return this.handlers.onEnd.call(data, piecePlacement);
};

module.exports = PiecePlacementParser;
