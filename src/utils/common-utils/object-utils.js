'use strict';

var isTypeUtils = require('./is-type-utils');

var objectUtils = module.exports = {
  extend: function (target /* sources... */) {
    var index;

    var setValue = function (value, key) {
      target[key] = value;
    };

    for (index = 1; index < arguments.length; index++) {
      objectUtils.forEachOwnProperty(arguments[index], setValue);
    }

    return target;
  },

  merge: function (target /* sources... */) {
    var index;

    var setValue = function (value, key) {
      if (isTypeUtils.isObject(value)) {
        if (!isTypeUtils.isObject(target[key])) {
          target[key] = {};
        }
        objectUtils.merge(target[key], value);
      } else {
        target[key] = value;
      }
    };

    for (index = 1; index < arguments.length; index++) {
      objectUtils.forEachOwnProperty(arguments[index], setValue);
    }

    return target;
  },

  forEachOwnProperty: function (object, callback) {
    if (!isTypeUtils.isObject(object)) {
      return;
    }

    Object.keys(object).forEach(function (key) {
      callback(object[key], key, object);
    });
  },

  map: function (object, callback) {
    var result = {};

    objectUtils.forEachOwnProperty(object, function (value, key) {
      result[key] = callback(value, key, object);
    });

    return result;
  },

  extract: function (object, keys) {
    var result = {};

    keys.forEach(function (key) {
      result[key] = object[key];
    });

    return result;
  },

  inherit: function (Child, Parent) {
    // rewrite childs prototype it's ok ???
    Child.prototype = Object.create(Parent.prototype);
    Child.prototype.constructor = Child;
    Child.prototype.super = Parent.prototype;

    return Child;
  }
};
