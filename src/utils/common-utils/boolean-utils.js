'use strict';

var throwError = require('./throw-error');

/**
 * @module booleanUtils
 */

var booleanUtils = module.exports = {

  /**
   * Checks if a a value is true
   *
   * @static
   * @arg {any} value
   * @returns {boolean}
   */

  isTrue: function (value) {
    return value === true;
  },

  /**
   * Checks if a value is not true
   *
   * @static
   * @arg {any} value
   * @returns {boolean}
   */

  isNotTrue: function (value) {
    return value !== true;
  },

  /**
   * Checks if a value is false
   *
   * @static
   * @arg {any} value
   * @returns {boolean}
   */

  isFalse: function (value) {
    return value === false;
  },

  /**
   * Checks if a value is not false
   *
   * @static
   * @arg {any} value
   * @returns {boolean}
   */

  isNotFalse: function (value) {
    return value !== false;
  },

  /**
   * Checks if a value is truthy
   *
   * @static
   * @arg {any} value
   * @returns {boolean}
   */

  isTruthy: function (value) {
    return !!value;
  },

  /**
   * Checks if a value is falsy
   *
   * @static
   * @arg {any} value
   * @returns {boolean}
   */

  isFalsy: function (value) {
    return !value;
  },

  /**
   * Return 0 for falsy value and 1 for truthy
   *
   * @static
   * @arg {any} values
   * @returns {number} 0 or 1
   */

  toInteger: function (value) {
    return +booleanUtils.isTruthy(value);
  },

  /**
   * Return true for string 'true' and false for string 'false'
   *
   * @static
   * @arg {string} value string 'false' or 'true'
   * @throws error if value is not 'true' or 'false'
   * @return {boolean}
   */

  fromString: function (value) {
    if (value === 'true') {
      return true;
    } else if (value === 'false') {
      return false;
    }

    throwError("Invalid argument: '{0}'. It must be 'true' or 'false'!", value);
  }
};
