'use strict';

var fenRankToAscii = require('../utils/fen-parser/fen-rank-to-ascii'),
  rank = process.argv[2];

try {
  console.log(rank);
  rank = fenRankToAscii(rank);
  console.log(rank);
} catch (e) {
  console.log(e.message);
}
