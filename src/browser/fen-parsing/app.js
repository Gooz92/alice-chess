'use strict';

var toTableFenParser = require('./to-table-fen-parser');

document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('fen-input').addEventListener('submit', function () {
    console.log('submit');
  });
});
