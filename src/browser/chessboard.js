'use strict';

var createElement = require('./utils/dom-utils').createElement,
  boardUtils = require('../utils/chess-utils/board-utils'),
  pieceCharacters = require('./utils/piece-characters'),
  objectUtils = require('../utils/common-utils/object-utils'),
  langFns = require('../utils/common-utils/lang-fns');

var activePiece;

function createFilesLabelRow() {
  var row = createElement('tr'), label, fileName, index;

  label = createElement('th');
  row.appendChild(label);

  for (index = 0; index < 8; index++) {
    fileName = boardUtils.fileIndexToName(index);
    label = createElement('th', {
      innerHTML: fileName
    });
    row.appendChild(label);
  }

  label = createElement('th');
  row.appendChild(label);

  return row;
}

function createRank(rankIndex, chess) {
  var rank = createElement('tr'),
    rankName = 8 - rankIndex,
    label = createElement('th', {
      innerHTML: rankName
    }),
    rankSquares = chess.getRank(7 - rankIndex),
    fileName, square, index;

  rank.appendChild(label);

  for (index = 0; index < 8; index++) {
    fileName = boardUtils.fileIndexToName(index);
    square = createElement('td', {
      id: fileName + rankName,
      onclick: createClickHandler(chess)
    });

    if (rankSquares[index].isOccupied()) {
      square.innerHTML =
        pieceCharacters[rankSquares[index].piece.fenToken];

      square.classList.add('occupied');
    }

    rank.appendChild(square);
  }

  label = createElement('th', {
    innerHTML: rankName
  });

  rank.appendChild(label);

  return rank;
}

function clearSelection() {
  var classes = ['target-square', 'highlighted', 'captured-piece'],
    selector = classes.map(function (className) {
      return '.' + className;
    }).join(',');

   [].forEach.call(document.querySelectorAll(selector), function (sq) {
     classes.forEach(function (className) {
        sq.classList.remove(className);
     });
   });
}

function createClickHandler(chess) {
  return function () {
    var square = chess.squares[this.id],
      self = this,
      targetSquareNames;

    clearSelection();

    if (square.isOccupiedByPlayer(chess.activeColor)) {
      square.piece.generateMoves().forEach(
        function (mv) {
          var square = document.getElementById(mv.targetSquare.name);

          if (mv.targetSquare.isEmpty()) {
            square.className = 'target-square';
          } else {
            square.classList.add('captured-piece');
          }

          if (mv.capturedPawn) { // en passant
            square = document.getElementById(mv.capturedPawn.square.name);
            square.classList.add('captured-piece');
          }
        }
      );

      activePiece = square.piece;
      this.classList.add('highlighted');
    } else if (activePiece &&
      activePiece.generateTargetSquareNames().indexOf(this.id) > -1) {
      var move = activePiece.generateMoves().filter(function (mv) {
        return mv.targetSquare.name === self.id;
      })[0];

      if (move.capturedPawn) { // en passant
        var epSq = document.getElementById(move.capturedPawn.square.name);

        epSq.innerHTML = '';
        epSq.className = '';
      }

      move.make();

      if (move.rook) { // is castling

        document.getElementById(move.rook.square.name).innerHTML =
          pieceCharacters[move.rook.fenToken];

        document.getElementById(move.rook.square.name).className = 'occupied';
        document.getElementById(move.sourceRookSquare.name).className = '';
        document.getElementById(move.sourceRookSquare.name).innerHTML = '';
      }

      this.innerHTML = pieceCharacters[activePiece.fenToken];
      this.className = 'occupied';

      var sourceSquare = document.getElementById(move.sourceSquare.name);

      sourceSquare.innerHTML = '';
      sourceSquare.className = '';
      activePiece = null;
    }
  };
}

module.exports = function createChessboard(chess) {
  var table = createElement('table', {
      className: 'chessboard'
    }),
    tbody = createElement('tbody'),
    filesLabelRow = createFilesLabelRow(),
    rank, rankIndex;

  tbody.appendChild(filesLabelRow);

  for (rankIndex = 0; rankIndex < 8; rankIndex++) {
    rank = createRank(rankIndex, chess);
    tbody.appendChild(rank);
  }

  filesLabelRow = createFilesLabelRow();
  tbody.appendChild(filesLabelRow);

  table.appendChild(tbody);

  return table;
};