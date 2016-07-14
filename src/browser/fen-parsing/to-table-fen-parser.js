'use strict';

var FenParser = require('../../utils/fen-parser');

module.exports = new FenParser({
  piecePlacement: {
    onStart: function () {
      var table = document.createElement('table'),
        tbody = document.createElement('tbody');

      table.appendChild(tbody);

      this.table = table;
      this.tbody = tbody;
    },

    rank: {
      onStart: function () {
        this.rank = document.createElement('tr');
      },

      onPieceToken: function (pieceToken) {
        var square = document.createElement('td');
        square.innerHTML = pieceToken;
        this.rank.appendChild(square);
      },

      onEmptySquare: function () {
        var square = document.createElement('td');
        this.rank.appendChild(square);
      },

      onEnd: function () {
        this.tbody.appendChild(this.rank);
      }
    }
  },

  onEnd: function () {
    return this.table;
  }
});
