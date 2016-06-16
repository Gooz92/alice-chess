'use strict';

module.exports = {
  noop: function () {},

  equal: function (arg1, arg2) {
    return arg1 == arg2;
  },

  strictEqual: function (arg1, arg2) {
    return arg1 === arg2;
  },

  greateThan: function (arg1, arg2) {
    return arg1 > arg2;
  },

  lessThan: function (arg1, arg2) {
    return arg1 < arg2;
  },

  greateOrEqualThan: function(arg1, arg2) {
    return arg1 >= arg2;
  },

  lessOrEqualThan: function (arg1, arg2) {
    return arg1 <= arg2;
  }
};