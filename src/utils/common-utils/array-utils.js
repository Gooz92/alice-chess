'use strict';

/**
 * @module arrayUtils
 */

var arrayUtils = module.exports = {

  /**
   * Remove given element from array
   *
   * @arg {array} array
   * @arg {any} element to remove
   */

  remove: function (array, item) {
    var index = array.indexOf(item);

    if (index > -1 && index < array.length) {
      while (index++ < array.length - 1) {
        array[index - 1] = array[index];
      }
      --array.length;
    }
  },

  sum: function (arr) {
    return arr.reduce(function (a, b) {
      return a + b;
    });
  },

  mean: function (arr) {
    return arrayUtils.sum(arr) / arr.length;
  },

  toArray: function (arg) {
    return Array.prototype.slice.call(arg);
  },

  count: function (array, predicate) {
    var count = 0;

    array.forEach(function (item, index, array) {
      if (predicate(item, index, array) === true) {
        ++count;
      }
    });

    return count;
  }
};
