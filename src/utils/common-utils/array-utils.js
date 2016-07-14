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
    return arrayUtils.removeAt(array, index);
  },

  sum: function (arr) {
    return arr.reduce(function (a, b) {
      return a + b;
    });
  },

  mean: function (arr) {
    return arrayUtils.sum(arr) / arr.length;
  },

  removeAt: function (array, index) {
    if (index < 0 || index >= array.length) {
      return false;
    }

    array.splice(index, 1);
    return true;
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
