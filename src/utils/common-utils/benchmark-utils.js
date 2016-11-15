'use strict';

var benchmarkUtils = module.exports = {
  time: function (fn) {
    var time = Date.now();
    fn();
    return Date.now() - time;
  },

  averageTime: function (fn, times) {
    var timesLeft = times, result = 0, time;

    while (--timesLeft > 0) {
      time = Date.now();
      fn();
      result += Date.now() - time;
    }

    return result / times;
  }
};
