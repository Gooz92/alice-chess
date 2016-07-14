'use strict';

var isTypeUtils = require('./is-type-utils');

/**
 * @module fnUtils
 */

module.exports = {

  /**
   * Execute given function n times
   *
   * @static
   * @arg {number} n
   * @arg {function} fn
   */

  times: function (n, fn) {
    while (n-- > 0) {
      fn();
    }
  },

  /**
   * Creates a function that returns given value.
   *
   * @static
   * @arg {any} value
   * @return {function} function that return given value
   */

  constant: function (value) {
    return function () {
      return value;
    };
  },

  /**
   * TODO very sloppy implementation
   * May don't use this controversial approach
   */

  overload: function () {
    var fns = [],
      index, fn;

    for (index = 0; index < arguments.length; index++) {
      fn = arguments[index];
      if (!isTypeUtils.isFunction(fn)) {
        throw new Error();
      }

      if (isTypeUtils.isDefined(fns[fn.length])) {
        throw new Error();
      }

      fns[fn.length] = fn;
    }

    return function () {
      fn = fns[arguments.length];

      if (isTypeUtils.isFunction(fn)) {
        return fn.apply(this, arguments);
      }

      throw new Error();
    };
  }
};
