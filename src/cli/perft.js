const Chess = require('../model/chess');
const formatTime = require('../utils/common-utils/format-time');

var chess = Chess.createStartPosition(),
  initialDepth = process.argv[2],
  leaves = 0;

initialDepth = parseInt(initialDepth);

const results = [
  1,
  20,
  400,
  8902,
  197281,
  4865609,
  119060324
];

var time = Date.now();
// use callbacks insignificant slow down iteration
chess.traverse(initialDepth, {
  onMaxDepthReached: function () {
    ++leaves;
  }
});

console.log(leaves, results[initialDepth] === leaves);
console.log(formatTime(Date.now() - time));