'use strict';

var Parser = require('../utils/fen-parser/to-object-castling-rights-parser'),
  castlingRights = process.argv[2];

var parser = new Parser();

try {
  console.log(parser.parse(castlingRights));
} catch (e) {
  console.log(e.message);
}
