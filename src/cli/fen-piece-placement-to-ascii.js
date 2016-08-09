'use strict';

var parse = require('../utils/fen-parser/impl/parse-piece-placement');

console.time('time');
var field = parse('r3k2r/Pppp1ppp/1b3nbN/nP6/BBP1P3/q4N2/Pp1P2PP/R2Q1RK1');
console.timeEnd('time');

console.log(field);