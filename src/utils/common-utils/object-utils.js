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

  defaults: function (obj, defaultValues) {
    return objectUtils.merge({}, defaultValues, obj);
  },

  pick: function (obj, keys) {
    var result = {};

    keys.forEach(function (key) {
      if (obj.hasOwnProperty(key)) {
        result[key] = obj[key];
      }
    });

    return result;
  },

  get: function (obj, path) {
    var result = obj, index;

    path = path.split('.');

    for (index = 0; index < path.length; index++) {
      result = result[path[index]];
      if (!isTypeUtils.isObject(result)) {
        return null;
      }
    }

    return result;
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

  omit: function (object, keys) {
    var result = {};

    Object.keys(object).forEach(function (key) {
      if (keys.indexOf(key) === -1) {
        result[key] = object[key];
      }
    });

    return result;
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
