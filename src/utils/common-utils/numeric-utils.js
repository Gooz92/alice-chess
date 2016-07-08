'use strict';

var NON_NEGATIVE_INTEGER_PATTERN = /^\d+$/;

var numericUtils = module.exports = {
  isNonNegativeInteger: function (arg) {
    return NON_NEGATIVE_INTEGER_PATTERN.test(arg);
  },

  splitInThousands: function (number) {
    var thousands = [], currentIndex, nextIndex;

    number = number.toString();

    currentIndex = number.length;

    while (currentIndex > 2) {
      nextIndex = currentIndex - 3;
      thousands.unshift(number.slice(nextIndex, currentIndex));
      currentIndex = nextIndex;
    }

    if (currentIndex !== 0) {
      thousands.unshift(number.slice(0, currentIndex));
    }

    return thousands;
  },

  formatThousands: function (number, separator) {
    var thousands = numericUtils.splitInThousands(number);

    separator = separator || ' ';

    return thousands.join(separator);
  }
};
