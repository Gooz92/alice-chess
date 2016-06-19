'use strict';

var isTypeUtils = require('./is-type-utils');

var wrapInQuotesPattern = /^('|")(.+)(\1)$/;

var stringUtils = module.exports = {
  isWrappedInQuotes: function (value)  {
    return wrapInQuotesPattern.test(value);
  },

  unwrapQuotes: function (value) {
    var match = value.match(wrapInQuotesPattern);

    if (match === null) {
      return value;
    }

    return match[2];
  },

  repeat: function (str, times) {
    var repeatition = '';

    while (times-- > 0) {
      repeatition += str;
    }

    return repeatition;
  },

  createPadding: function (str, size, character) {
    return stringUtils.repeat(character, size - str.length);
  },

  padLeft: function (str, size) {
    var padding = stringUtils.createPadding(str, size);
    return str + padding;
  },

  padRight: function (str, size) {
    var padding = stringUtils.createPadding(str, size);
    return padding + str;
  },

  stringify: function (str) {
    var singleQuotesCount = 0,
      doubleQuotesCount = 0,
      qoutes, match;

    if (isTypeUtils.isNill(str)) {
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