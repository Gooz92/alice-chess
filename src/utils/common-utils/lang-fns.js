'use strict';

module.exports = {
  equal: function (arg1, arg2) {
    return arg1 == arg2;
  },

  strictEqual: function (arg1, arg2) {
    return arg1 === arg2;
  },

  greateThen: function (arg1, arg2) {
    return arg1 > arg2;
  },

  lessThen: function (arg1, arg2) {
    return arg1 < arg2;
  },

  greateOrEqualThan: function(arg1, arg2) {
    return arg1 >= arg2;
  },

  lessOrEqalThan: function (arg1, arg2) {
    return arg1 <= arg2;
  }
};