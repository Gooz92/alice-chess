'use strict';

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

  times(n, fn) {
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

  constant: value => () => value
};
