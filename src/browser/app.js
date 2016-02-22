'use strict';

var Chess = require('../model/chess'),
  createTable = require('./utils/create-table');

var chess = Chess.createStartPosition();

var table = createTable({
  rowCount: 8,
  columnCount: 8,
  tableOptions: {
    className: 'chess-board'
  },
  getCellOptions: function (rowIndex, columnIndex) {
    var className = (rowIndex + columnIndex) % 2 === 0 ? 'light' : 'dark';

    return {
      className: className
    };
  }
});

document.addEventListener('DOMContentLoaded', function (event) {
  document.body.appendChild(table);
});
