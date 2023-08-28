const startPosition = require('../utils/chess-utils/start-position');
const perft = require('./perft');

const initialDepth = parseInt(process.argv[2]);

const results = [
  20,
  400,
  8902,
  197281,
  4865609,
  119060324
];

perft(startPosition, initialDepth, results[initialDepth - 1]);
