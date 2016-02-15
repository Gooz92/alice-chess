'use strict';

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

  repeat: function (token, times) {
    var repeatition = '';

    while (times-- > 0) {
      repeatition += token;
    }

    return repeatition;
  },

  createPadding: function (str, size) {
    var padding = stringUtils.repeat(' ', size - str.length);
    return padding;
  },

  padLeft: function (str, size) {
    var padding = stringUtils.createPadding(str, size);

    return str + padding;
  },

  padRight: function (str, size) {
    var padding = stringUtils.createPadding(str, size);

    return padding + str;
  }
};
