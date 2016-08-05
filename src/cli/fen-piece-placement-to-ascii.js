'use strict';

var parse = require('../utils/fen-parser/impl/parse-piece-placement');

console.time('time');
var field = parse('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR');
console.timeEnd('time');

console.log(field);