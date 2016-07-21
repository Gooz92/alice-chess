'use strict';

var Chess = require('../model/chess'),
  pieceCharacters = require('./utils/piece-characters'),
  createTable = require('./utils/create-table'),
  boardUtils = require('../utils/chess-utils/board-utils'),
  arrayUtils = require('../utils/common-utils/array-utils');

var chess = Chess.createStartPosition(),
  activePiece;

var table = createTable({
  rowCount: 8,
  columnCount: 8,
  tableOptions: {
    className: 'chess-board'
  },
  getCellOptions: function (rowIndex, columnIndex) {
    var className = ['light', 'dark'][(rowIndex + columnIndex) % 2],
      rankName = boardUtils.rankIndexToName(7 - rowIndex),
      fileName = boardUtils.fileIndexToName(columnIndex),
      square = chess.getSquareByName(fileName + rankName),
      innerHTML = '';

    if (square.isOccupied()) {
      innerHTML = pieceCharacters[square.piece.getFenToken()];
      className += ' occupied';
    }

    return {
      className: className,
      innerHTML: innerHTML,
      id: fileName + rankName,
      onclick: function () {
        var square = chess.getSquareByName(this.id),
          highlightedCells = document.querySelectorAll('.highlighted'),
          targetSquareNames;

        arrayUtils.toArray(highlightedCells).forEach(function (cell) {
          cell.classList.remove('highlighted');
        });

        if (square.isEmpty() || square.piece.color !== chess.activeColor) {
          return;
        }

        targetSquareNames = square.piece.generateTargetSquareNames();

        hightlightTargetSquares(targetSquareNames);
      }
    };
  }
});

function hightlightTargetSquares(ids) {
  ids.map(function (id) {
    return document.getElementById(id);
  }).forEach(function (el) {
    el.classList.add('highlighted');
  });
}

document.addEventListener('DOMContentLoaded', function (event) {
  document.body.appendChild(table);
});
