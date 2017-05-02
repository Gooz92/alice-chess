'use strict';

const { isNill } = require('./is-type-utils');

var stringUtils = module.exports = {
  repeat: function (str, times) {
    var repeatition = '';

    while (times-- > 0) {
      repeatition += str;
    }

    return repeatition;
  },

  createPadding: function (str, size, character) {
    character = character || ' ';
    return stringUtils.repeat(character, size - str.length);
  },

  padLeft: function (str, size, padChar) {
    var padding = stringUtils.createPadding(str, size, padChar);
    return padding + str;
  },

  padRight: function (str, size, padChar) {
    var padding = stringUtils.createPadding(str, size, padChar);
    return str + padding;
  },

  center: function (str, size, padChar) {
    var leftPadsCount = Math.floor((str.length + size) / 2);

    str = stringUtils.padLeft(str, leftPadsCount, padChar);
    str = stringUtils.padRight(str, size, padChar);

    return str;
  },

  stringify: function (str) {
    var singleQuotesCount = 0,
      doubleQuotesCount = 0,
      qoutes, match;

    if (isNill(str)) {
      return "''";
    }

    qoutes = /'|"/g;

    while ((match = qoutes.exec(str)) !== null) {
      if (match[0] === '"') {
        ++doubleQuotesCount;
      } else {
        ++singleQuotesCount;
      }
    }

    if (singleQuotesCount === 0) {
      return "'" + str + "'";
    }

    if (doubleQuotesCount === 0) {
      return '"' + str + '"';
    }

    if (doubleQuotesCount > singleQuotesCount) {
      return "'" + str.replace(/'/g, "\\'") + "'";
    }

    return '"' + str.replace(/"/g, '\\"') + '"';
  }
};