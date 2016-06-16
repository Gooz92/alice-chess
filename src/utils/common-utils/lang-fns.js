'use strict';

module.exports = {
  noop: function () {},

  equal: function (arg1, arg2) {
    return arg1 == arg2;
  },

  strictEqual: function (arg1, arg2) {
    return arg1 === arg2;
  },

  greatThan: function (arg1, arg2) {
    return arg1 > arg2;
  },

  lessThan: function (arg1, arg2) {
    return arg1 < arg2;
  },

  greatOrEqualThan: function(arg1, arg2) {
    return arg1 >= arg2;
  },

  lessOrEqualThan: function (arg1, arg2) {
    return arg1 <= arg2;
  }
};