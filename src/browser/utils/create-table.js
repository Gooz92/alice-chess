'use strict';

var objectUtils = require('../../utils/common-utils/object-utils'),
  domUtils = require('./dom-utils.js');

var defaultOptions = {
  rowCount: 1,
  columnCount: 1,
  tableOptions: {}
};

function createTable(options) {
  var settings = objectUtils.merge({}, defaultOptions, options || {}),
    table = domUtils.createElement('table', settings.tableOptions),
    tbody = domUtils.createElement('tbody'),
    row, cell,
    rowIndex, columnIndex;

  for (rowIndex = 0; rowIndex < settings.rowCount; rowIndex++) {
    row = domUtils.createElement('tr');
    for (columnIndex = 0; columnIndex < settings.columnCount; columnIndex++) {
      cell = domUtils.createElement('td');
      row.appendChild(cell);
    }
    tbody.appendChild(row);
  }

  table.appendChild(tbody);

  return table;
}

module.exports = createTable;
