'use strict';

var Chess = require('../model/chess'),
  pieceCharacters = require('./utils/piece-characters'),
  createTable = require('./utils/create-table');

var chess = Chess.createStartPosition();

var table = createTable({
  rowCount: 8,
  columnCount: 8,
  tableOptions: {
    className: 'chess-board'
  },
  getCellOptions: function (rowIndex, columnIndex) {
    var className = (rowIndex + columnIndex) % 2 === 0 ? 'light' : 'dark',
      innerHTML = '';
    
    if (rowIndex === 1) {
      innerHTML = pieceCharacters.p; 
    } else if (rowIndex === 6) {
      innerHTML = pieceCharacters.P;
    } else if (rowIndex === 0) {
      innerHTML = pieceCharacters['rnbqkbnr'.charAt(columnIndex)];
    } else if (rowIndex === 7) {
      innerHTML = pieceCharacters['RNBQKBNR'.charAt(columnIndex)];
    }

    return {
      className: className,
      innerHTML: innerHTML
    };
  }
});

document.addEventListener('DOMContentLoaded', function (event) {
  document.body.appendChild(table);
});
