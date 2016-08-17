'use strict';

var created = false;

function PieceType(token, name) {
  if (created) {
    throw new Error('PieceType enum already created');
  }

  this.token = token;
  this.name = name;
}

[
  ['pawn', 'P'],
  ['rook', 'R'],
  ['knight', 'N'],
  ['bishop', 'B'],
  ['queen', 'Q'],
  ['king', 'K']
].forEach(function (params) {
  var name = params[0],
    token = params[1];

  PieceType[name.toUpperCase()] = new PieceType(name, token);
});

created = true;

module.exports = PieceType;
