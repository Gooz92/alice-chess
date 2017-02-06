'use strict';

var createChessboard = require('./chessboard'),
  Chess = require('../model/chess');

var chess = Chess.createStartPosition();

document.addEventListener('DOMContentLoaded', function (event) {
  var boardContainer = document.getElementById('board-container'),
    fen = document.createElement('div');
  
  fen.id = 'fen-container';
  fen.innerText = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';

  boardContainer.appendChild(createChessboard(chess));
  boardContainer.appendChild(fen);
});
