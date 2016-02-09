'use strict';

var isUtils = module.exports = {

  /*
    return false for null
    but typeof null === 'object' // <- true
   */
  isObject: function (value) {
    return value !== null && typeof value === 'object';
  },

  isPlainObject: function (value) {
    return isUtils.isObject(value) && value.constructor.name === 'Object';
  },

  isFunction: function (value) {
    return typeof value === 'function';
  },

  isString: function (value) {
    return typeof value === 'string';
  },

  isNumber: function (value) {
    return typeof value === 'number';
  },

  isBoolean: function (value) {
    return typeof value === 'boolean';
  },

  isUndefined: function (value) {
    return typeof value === 'undefined';
  },

  isDefined: function (value) {
    return typeof value !== 'undefined';
  },

  isPresent: function (value) {
    return value !== null && isUtils.isDefined(value);
  }
};
