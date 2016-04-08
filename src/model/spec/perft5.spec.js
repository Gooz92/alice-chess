'use strict';

var assert = require('chai').assert,
  Chess = require('../chess'),
  perft5Results = require('./data/initial-position-perft5-results');

describe('perft5', function () {
  var chess = Chess.createStartPosition(),
    initialDepth = 5;

   function perft(depth) {
     var result = 0, moves;

     if (depth === 0) {
       return 1;
     }

     moves = chess.generateMoves();

     moves.forEach(function (move) {
       var subresult;

       move.make();
       subresult = perft(depth - 1);
       if (depth === initialDepth) {
         testPerft5Subresult(move.toSAN(), subresult);
       }
       result += subresult;
       move.unMake();
     });

     return result;
   }

   perft(initialDepth);

   function testPerft5Subresult(moveName, subresult) {
     it(moveName + ' = ' + perft5Results[moveName], function () {
       assert.strictEqual(subresult, perft5Results[moveName]);
     });
   }
});