'use strict';

/**
 * @module isTypeUtils
 */

var isTypeUtils = module.exports = {

  /**
   * Checks if a value is object and not null
   *
   * @static
   * @arg {any} value
   * @return {boolean}
   */

  isObject: function (value) {
    return value !== null && typeof value === 'object';
  },

  /**
   * Checks if a value is plain object
   * e.g. object created with object literal or object contructor
   *
   * @static
   * @arg {any} value
   * @returns {boolean}
   */

  isPlainObject: function (value) {
    return isTypeUtils.isObject(value) && value.constructor.name === 'Object';
  },

  /**
   * Checks if type of value is function
   *
   * @static
   * @arg {any} value
   * @return {boolean}
   */

  isFunction: function (value) {
    return typeof value === 'function';
  },

  /**
   * Checks if type of value is string
   *
   * @static
   * @arg {any} value
   * @return {boolean}
   */

  isString: function (value) {
    return typeof value === 'string';
  },

  /**
   * Checks if type of value is number
   *
   * @static
   * @arg {any} value
   * @return {boolean}
   */

  isNumber: function (value) {
    return typeof value === 'number';
  },

  /**
   * Checks if type of value is boolean
   *
   * @static
   * @arg {any} value
   * @return {boolean}
   */

  isBoolean: function (value) {
    return typeof value === 'boolean';
  },

  /**
   * Checks if type of value is undefined
   *
   * @static
   * @arg {any} value
   * @return {boolean}
   */

  isUndefined: function (value) {
    return typeof value === 'undefined';
  },

  /**
   * Checks if type of value is not undefined
   *
   * @static
   * @arg {any} value
   * @return {boolean}
   */

  isDefined: function (value) {
    return typeof value !== 'undefined';
  },

  /**
   * Checks if a value is null or undefined
   *
   * @static
   * @arg {any} value
   * @return {boolean}
   */

  isNill: function (value) {
    return value === null || isTypeUtils.isUndefined(value);
  }
};
