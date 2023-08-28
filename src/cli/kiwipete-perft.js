const perft = require('./perft');

const nodesCounts = [ 48, 2039, 97862, 4085603, 193690690 ];

const position = {
  a8: 'r', e8: 'k',  h8: 'r',
  a7: 'p', c7: 'p', d7: 'p', e7: 'q', f7: 'p', g7: 'b',
  a6: 'b', b6: 'n', e6: 'p', f6: 'n', g6: 'p',
  d5: 'P', e5: 'N',
  b4: 'p', e4: 'P',
  c3: 'N', f3: 'Q', h3: 'p',
  a2: 'P', b2: 'P', c2: 'P', d2: 'B', e2: 'B', f2: 'P',  g2: 'P',  h2: 'P',
  a1: 'R', e1: 'K', h1: 'R'
};

const depth = parseInt(process.argv[2]);

perft(position, depth, nodesCounts[depth - 1]);
