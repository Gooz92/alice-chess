'use strict';

var isTypeUtils = require('./is-type-utils');

module.exports = {
  times: function (n, fn) {
    while (n-- > 0) {
      fn();
    }
  },

  constant: function (value) {
    return function () {
      return value;
    };
  },

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
