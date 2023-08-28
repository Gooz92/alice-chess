const perft = require('./perft');

const depth = parseInt(process.argv[2]);

const nodesCounts = [ 14, 191, 2812, 43238, 674624, 11030083 ];

const position = {
  c7: 'p',
  d6: 'p',
  a5: 'K',
  b5: 'P',
  h5: 'r',
  b4: 'R',
  f4: 'p',
  h4: 'k',
  e2: 'P',
  g2: 'P'
};

perft(position, depth, nodesCounts[depth - 1]);
