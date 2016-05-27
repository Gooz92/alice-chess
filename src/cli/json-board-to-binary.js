'use strict';

var nibbleBoardUtils = require('../utils/chess-utils/nibble-board-utils'),
  board = require('./' + process.argv[2]);

var binaryBoard = nibbleBoardUtils.boardPlainObjectToBytes(board);

console.log(binaryBoard.map(byte => {
  byte = byte.toString(16);
  if (byte.length == 1) byte = 0 + byte;
  return byte;
}));

console.log(nibbleBoardUtils.boardBytesToPlainObject(binaryBoard));