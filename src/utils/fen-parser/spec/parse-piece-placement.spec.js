const assert = require('assert/strict');
const { parseFenPiecePlacement } = require('../parse-piece-placement');

const startPosition = require('../../chess-utils/start-position');

const INITIAL_FEN_PIECE_PLACEMENT = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR'

describe('parseFenPiecePlacement', () => {

  it('parse initial piece placement', () => {
    const board = parseFenPiecePlacement(INITIAL_FEN_PIECE_PLACEMENT);
    assert.deepEqual(board, startPosition);
  });

});
