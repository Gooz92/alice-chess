const Chess = require('../model/chess'),
  formatTime = require('../utils/common-utils/format-time'),
  traverse = require('../model/traverse');

module.exports = (position, depth, expectedNodes) => {
  const chess = new Chess();
  chess.place(position);

  let leaves = 0;
  const time = Date.now();

  traverse(chess, depth, {
    onMaxDepthReached: () => {
      ++leaves;
    }
  });

  const result = leaves === expectedNodes ? 'PASSED' : 'FAILED'; 
  console.log(`${result}; nodes: ${leaves}; time: ${formatTime(Date.now() - time)}`);
};
