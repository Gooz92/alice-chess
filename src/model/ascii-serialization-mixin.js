'use strict';

var stringUtils = require('../utils/common-utils/string-utils');

var horizontalBorder = stringUtils.repeat('-', 24),
  topBorder = '  /' + horizontalBorder + '\\',
  bottomBorder = '  \\' + horizontalBorder + '/',
  fileLabels = '    a  b  c  d  e  f  g  h',
  header = fileLabels + '\n' + topBorder,
  footer = bottomBorder + '\n' + fileLabels;

var asciiSerializationMixin = module.exports = {
  generateAsciiRank: function (rankIndex) {
    var rank = [],
      squareIndex = rankIndex * 16,
      endSquareIndex = squareIndex + 8,
      rankName = rankIndex + 1,
      square;

    while (squareIndex < endSquareIndex) {
      square = this.squares[squareIndex++];
      if (square.isEmpty()) {
        rank.push('-');
      } else {
        rank.push(square.piece.fenToken);
      }
    }

    return [rankName, '|', rank.join('  '), '|', rankName].join(' ');
  },

  generateAsciiDiagram: function () {
     var board = [],
      rank,
      index;

    for (index = 7; index >= 0; index--) {
      rank = this.generateAsciiRank(index);
      board.push(rank);
    }

    board = [header, board.join('\n'), footer].join('\n');

    return board;
  }
};
