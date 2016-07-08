'use strict';

var stringUtils = require('./string-utils'),
  isTypeUtils = require('./is-type-utils');

function extractHeaderLabels(entries) {
  var headerLabels = [];

  entries.forEach(function (entry) {
    Object.keys(entry).forEach(function (key) {
      if (headerLabels.indexOf(key) === -1) {
        headerLabels.push(key);
      }
    });
  });

  return headerLabels;
}

function createAsciiTable(entries) {
  var headerLabels = extractHeaderLabels(entries),
    table = [headerLabels],
    columnWidths = headerLabels.map(function (headerLabel) {
      return headerLabel.length;
    }), i, j;

  entries.forEach(function (entry) {
    var row = headerLabels.map(function (headerLabel, index) {
      var text = entry[headerLabel];

      if (isTypeUtils.isUndefined(text)) {
        text = '-'
      } else {
        text = text.toString();
      }

      if (text.length > columnWidths[index].length) {
        columnWidths[index] = text.length;
      }

      return text;
    });

    table.push(row);
  });

  for (i = 0; i < table.length; i++) {
    for (j = 0; j < table[i].length; j++) {
      table[i][j] = stringUtils.center(table[i][j], columnWidths[j] + 2);
    }
  }

  return table.join('\n');
}

module.exports = createAsciiTable;
