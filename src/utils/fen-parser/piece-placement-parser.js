'use strict';

const RankParser = require('./rank-parser'),
  { noop } = require('../common-utils/lang-fns'),
  { defaults } = require('../common-utils/object-utils');

var ranksCount = 8;

function PiecePlacementParser(handlers = {}) {

  this.handlers = defaults(handlers, {
    onStart: noop,
    onEnd: noop
  });

  this.rankParser = new RankParser(handlers.rank);
}

PiecePlacementParser.prototype.parse = function (piecePlacement, data) {
  var rankParser = this.rankParser,
    ranks;

  data = data || {};

  this.handlers.onStart.call(data, piecePlacement);

  ranks = piecePlacement.split('/');

  if (ranks.length !== ranksCount) {
    throw new Error(`Invalid ranks count: '${ranks.length}'`);
  }

  ranks.forEach(function (rank) {
    rankParser.parse(rank, data);
  });

  return this.handlers.onEnd.call(data, piecePlacement);
};

module.exports = PiecePlacementParser;
