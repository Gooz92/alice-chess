'use strict';

var fns = module.exports = {
  noop: function () {},

  isTrue: function (arg) {
    return arg === true;
  },

  isFalse: function (arg) {
    return arg === false;
  },

  isTruthy: function (arg) {
    return !!arg;
  },

  isFalsy: function (arg) {
    return !arg;
  },

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