'use strict';

var fenParser = require('../utils/fen-parser/to-ascii-fen-parser');

var piecePlacement = process.argv[2];

var field = fenParser.parsePiecePlacement(piecePlacement);

console.log(field);