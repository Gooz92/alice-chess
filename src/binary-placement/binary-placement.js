'use strict';

/* jshint esversion: 6 */

// 0 001 = p BP
// 0 010 = n BN
// 0 011 = b BB
// 0 100 = r BR
// 0 101 = q BQ
// 0 110 = k BK


// 1 001 = P WP
// 1 010 = N WN
// 1 011 = B WB
// 1 100 = R WR
// 1 101 = Q WQ
// 1 110 = K WK

// 0000 - empty square ES (0)
// 0111 - empty square count flag EF
// 1000 - empty rank ER
// 1111 - stop SP (15)

const
  WP = 1,
  WN = 2,
  WB = 3,
  WR = 4,
  WQ = 5,
  WK = 6,

  BP = 9,
  BN = 10, // a
  BB = 11, // b
  BR = 12, // c
  BQ = 13, // d
  BK = 14, // e

  ES = 0,
  EF = 7,
  ST = 15;

// 8 - free


let startPosition = require('./start-position.json');
var fs = require('fs');
var wstream = fs.createWriteStream('start-position');

var chess = require('../model/chess').createStartPosition();

let pieces = {
  p: 1,
  n: 2,
  b: 3,
  r: 4,
  q: 5,
  k: 6,

  P: 9,
  N: 10, // a
  B: 11, // b
  R: 12, // c
  Q: 13, // d
  K: 14  // e
};

let squares = [];

for (let rank = 1; rank < 9; rank++) {
  for (let file = 97; file < 105; file++) {
    squares.push(String.fromCharCode(file) + rank);
  }
}

function toArray(position) {
  let posArr = [];

  squares.forEach(square => {
    let piece = position[square];
    if (piece in pieces) {
      posArr.push(pieces[piece]);
    } else {
      posArr.push(0);
    }
  });

  return posArr;
}

function reduce(position) {
  let reduced = [];

  if (position.length % 2 === 1) {
    position.push(15);
  }

  for (let i = 0; i < position.length; i += 2) {
    reduced.push((position[i] << 4) | position[i + 1]);
  }

  return reduced;
}

function writeEmptySquares(position, emptySquaresCount) {
  while (emptySquaresCount > 0) {
    if (emptySquaresCount === 1) {
      position.push(0);
      break;
    } else if (emptySquaresCount === 2) {
      position.push(0, 0);
      break;
    }

    if (emptySquaresCount < 18) {
      position.push(7, emptySquaresCount - 3);
      break;
    }

    position.push(7, 15);
    emptySquaresCount -= 18;
  }
}

function reduceEmptySquares(position) {
  let emptySquaresCount = 0,
    reduced = [];

  position.forEach(byte => {
    if (byte !== 0) {
      if (emptySquaresCount === 0) {
        reduced.push(byte);
        return;
      }
      writeEmptySquares(reduced, emptySquaresCount);
      reduced.push(byte);
      emptySquaresCount = 0;
    } else {
      ++emptySquaresCount;
    }
  });

  if (emptySquaresCount !== 0) {
    writeEmptySquares(reduced, emptySquaresCount);
  }
  return reduced;
}

var posMap = {};

function perft(depth) {
  var nodes = 0, moves;

  if (depth === 0) {
    return 1;
  }

  moves = chess.generateMoves(true);

  moves.forEach(function (move) {
    var subresult;

    move.make();
    if (!chess.isOpponentInCheck()) {
      let position = reduce([].concat(reduceEmptySquares(toArray(chess.generateFieldPlainObject()))));
      let key = position.map(toHex).join('');
      if (!posMap[key]) {
        posMap[key] = true;
        wstream.write(new Buffer(position));
      }
      subresult = perft(depth - 1);
      if (depth === 4) {
        // console.log(subresult);
      }
      nodes += subresult;
    }
    move.unMake();
  });

  return nodes;
}

function toHex(byte) {
  byte = byte.toString(16);
  if (byte.length === 1) return 0 + byte;
  return byte;
}

perft(4);
console.log(Object.keys(posMap).length);



