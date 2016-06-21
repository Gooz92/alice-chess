'use strict';

var Chess = require('../model/chess'),
  averageTime = require('../utils/common-utils/benchmark-utils').averageTime;

var chess = Chess.createStartPosition();

console.log(averageTime(function () {
  chess.traverse(4);
}, 10));