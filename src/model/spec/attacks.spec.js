'use strict';

var assert = require('chai').assert,
  attackedSquares = require('./data/attacks'),
  squares = require('../../utils/chess-utils/squares'),
  Chess = require('../chess'),
  Color = require('../color');

function testAttackedSquare(pieceToken, pieceSquare, attackedSquare) {
  var chess = new Chess(),
    color = Color.getByFlag(pieceToken === pieceToken.toUpperCase()),
    expectation = pieceToken + ' on ' + pieceSquare + ' should attack ' +
    attackedSquare;

  chess.placePiece(pieceToken, pieceSquare);

  it(expectation, function () {
    var attacked = chess.isSquareAttacked(squares[attackedSquare], color);
    assert.isTrue(attacked);
  });
}

function testNotAttackedSquare(pieceToken, pieceSquare, notAttackedSquare) {
  var chess = new Chess(),
    color = Color.getByFlag(pieceToken === pieceToken.toUpperCase()),
    expectation = pieceToken + ' on ' + pieceSquare + " should't attack " +
    notAttackedSquare;

  chess.placePiece(pieceToken, pieceSquare);

  it(expectation, function () {
    var attacked = chess.isSquareAttacked(squares[notAttackedSquare], color);
    assert.isFalse(attacked);
  });
}

describe('Attacks', function () {
  Object.keys(attackedSquares).forEach(function (pieceToken) {
    var pieceAttackedSquares = attackedSquares[pieceToken];
    Object.keys(pieceAttackedSquares).forEach(function (pieceSquare) {
      pieceAttackedSquares[pieceSquare][0].forEach(function (attackedSquare) {
        testAttackedSquare(pieceToken, pieceSquare, attackedSquare);
      });
      pieceAttackedSquares[pieceSquare][1].forEach(function (notAttackedSquare) {
        testNotAttackedSquare(pieceToken, pieceSquare, notAttackedSquare);
      });
    });
  });
});
