'use strict';

var createChessboard = require('./chessboard'),
  Chess = require('../model/chess');

var chess = Chess.createStartPosition();

document.addEventListener('DOMContentLoaded', function (event) {
  document.getElementById('boardContainer')
    .appendChild(createChessboard(chess));
});
