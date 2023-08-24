'use strict';

import './view/style.less';

var createChessboard = require('./chessboard'),
  Chess = require('../model/chess');

const chess = Chess.createStartPosition();

document.addEventListener('DOMContentLoaded', () => {
  const boardContainer = document.getElementById('board-container');
  const fen = document.createElement('div');

  fen.id = 'fen-container';
  fen.innerText = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';

  boardContainer.append(createChessboard(chess), fen);
});
