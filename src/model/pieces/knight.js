'use strict';

const boardUtils = require('../../utils/chess-utils/board-utils');
const moveFactory = require('../move-factory');

const offsets = [14, 18, 31, 33, -14, -18, -31, -33];

module.exports = {
  token: 'n',

  forEachMove: function (callback, pseudoLegal) {

    offsets.forEach(offset => {
      var targetSquareIndex = this.square.index + offset,
        targetSquare, move;

      if (boardUtils.isSquareOutOfBoard(targetSquareIndex)) {
        return;
      }

      targetSquare = this.square.chess.squares[targetSquareIndex];

      if (targetSquare.isEmpty()) {
        move = moveFactory.createSilentMove(this.square, targetSquare);
      } else if (targetSquare.isOccupiedByOpponent(this.color)) {
        move = moveFactory.createCapture(this.square, targetSquare);
      } else {
        return;
      }

      if (pseudoLegal || !targetSquare.chess.isInCheckAfter(move)) {
        callback(move);
      }
    });
  }
};
