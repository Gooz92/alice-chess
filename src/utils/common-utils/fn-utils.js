'use strict';

var isUtils = require('./is-utils');

module.exports = {
  times: function (n, fn) {
    while (n-- > 0) {
      fn();
    }
  },

  valueFn: function (value) {
    return function () {
      return value;
    };
  },

  overload: function () {
    var fns = [],
      index, fn;

    for (index = 0; index < arguments.length; index++) {
      fn = arguments[index];
      if (!isUtils.isFunction(fn)) {
        throw new Error();
      }

      if (isUtils.isDefined(fns[fn.length])) {
        throw new Error();
      }

      fns[fn.length] = fn;
    }

    return function () {
      fn = fns[arguments.length];

      if (isUtils.isFunction(fn)) {
        return fn.apply(this, arguments);
      }

      throw new Error();
    };
  }
};
