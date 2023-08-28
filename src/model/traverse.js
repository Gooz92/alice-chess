const { noop } = require('../utils/common-utils/lang-fns');

module.exports = (chess, depth, callbacks) => {

  const adaptedCallbacks = {
    onMaxDepthReached: noop,
    onBranchStartTraverse: noop,
    onBranchEndTraverse: noop,
    ...callbacks
  };

  baseTraverse(chess, depth, adaptedCallbacks);
};

const baseTraverse = (chess, depthLeft, callbacks) => {

  if (depthLeft === 0) {
    return callbacks.onMaxDepthReached();
  }

  const moves = chess.generateMoves(true);

  moves.forEach(move => {
    move.make();

    if (!chess.isOpponentInCheck()) {
      callbacks.onBranchStartTraverse(move);
      baseTraverse(chess, depthLeft - 1, callbacks);
      callbacks.onBranchEndTraverse(move);
    }

    move.unMake();
  });
};
