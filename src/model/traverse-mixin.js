'use strict';

var noop = require('../utils/common-utils/lang-fns').noop,
  objectUtils = require('../utils/common-utils/object-utils');

var traverseMixin = module.exports = {
  traverse: function (depth, callbacks) {
    var chess = this;

    callbacks = objectUtils.merge({
      onMaxDepthReached: noop,
      onBranchStartTraverse: noop,
      onBranchEndTraverse: noop
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
