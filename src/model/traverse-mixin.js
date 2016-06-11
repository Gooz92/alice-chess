'use strict';

var fnUtils = require('../utils/common-utils/fn-utils'),
  objectUtils = require('../utils/common-utils/object-utils');

var traverseMixin = module.exports = {
  traverse: function (depth, callbacks) {
    var chess = this;

    callbacks = objectUtils.merge({
      onMaxDepthReached: fnUtils.noop,
      onBranchStartTraverse: fnUtils.noop,
      onBranchEndTraverse: fnUtils.noop
    }, callbacks || {});

    traverse(depth, callbacks, chess);
  }
};

function traverse(depthLeft, callbacks, chess) {
  var moves;

  if (depthLeft === 0) {
    return callbacks.onMaxDepthReached();
  }

  moves = chess.generateMoves(true);

  moves.forEach(function (move) {
    move.make();

    if (!chess.isOpponentInCheck()) {
      callbacks.onBranchStartTraverse(move);
      traverse(depthLeft - 1, callbacks, chess);
      callbacks.onBranchEndTraverse(move);
    }

    move.unMake();
  });
}
