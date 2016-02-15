'use strict';

var arrayUtils = module.exports = {
  remove: function (array, item) {
    var index = array.indexOf(item);
    return arrayUtils.removeAt(array, index);
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
