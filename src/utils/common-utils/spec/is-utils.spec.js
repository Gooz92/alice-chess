'use strict';

var assert = require('chai').assert,
  isUtils = require('../is-utils');

describe('isUtils', function () {
  describe('.isObject()', function () {
    var isObject = isUtils.isObject;

    it('return true for plain object', function () {
      assert.isTrue(isObject({}));
    });

    it('return true for regexp', function () {
      assert.isTrue(isObject(/alice/));
    });

    it('return true for date', function () {
      assert.isTrue(isObject(new Date()));
    });

    it('return true for object created by constructor', function () {
      var Constructor = function () {},
        object = new Constructor();

      assert.isTrue(isObject(object));
    });

    it('return false for null', function () {
      assert.isFalse(isUtils.isObject(null));
    });

    it('return false for function', function () {
      var doSomething = function () {};
      assert.isFalse(isObject(doSomething));
    });
  });

  describe('.isPlainObject()', function () {
    var isPlainObject = isUtils.isPlainObject;

    it('return true for plain object', function () {
      assert.isTrue(isPlainObject({}));
    });

    it('return false for regexp', function () {
      assert.isFalse(isPlainObject(/alice/));
    });

    it('return false for date', function () {
      assert.isFalse(isPlainObject(new Date()));
    });

    it('return false for object created by constructor', function () {
      var Box = function (contents) {
        this.contents = contents;
      };

      var box = new Box("Schrödinger's cat");

      assert.isFalse(isPlainObject(box));
    });

    it('return false for function', function () {
      var doStuff = function () {};
      assert.isFalse(isPlainObject(doStuff));
    });
  });

  describe('.isFunction()', function () {
    var isFunction = isUtils.isFunction;

    it('return true for function', function () {
      var doSomething = function () {};
      assert.isTrue(isFunction(doSomething));
    });

    it('return false for object', function () {
      assert.isFalse(isFunction({}));
    });
  });

  describe('.isString()', function () {
    var isString = isUtils.isString;

    it('return true for string', function () {
      assert.isTrue(isString('something'));
    });

    it('return false for boolean', function () {
      var lies = false; // everybody lies
      assert.isFalse(isString(lies));
    });
  });

  describe('.isNumber()', function () {
    var isNumber = isUtils.isNumber;

    it('return true for number', function () {
      assert.isTrue(isNumber(42));
    });

    it('return false for string', function () {
      var number = '42';
      assert.isFalse(isNumber(number));
    });
  });

  describe('.isBoolean()', function () {
    var isBoolean = isUtils.isBoolean;

    it('return true for true boolean value', function () {
      var truth = true;
      assert.isTrue(isBoolean(truth));
    });

    it('return true for false boolean value', function () {
      var lies = false;  // everybody lies
      assert.isTrue(isBoolean(lies));
    });

    it('return false for string', function () {
      var text = 'not a boolean';
      assert.isFalse(isBoolean(text));
    });
  });

  describe('.isUndefined()', function () {
    var isUndefined = isUtils.isUndefined;

    it('return true for undefined', function () {
      var notDefined = void 0;
      assert.isTrue(isUndefined(notDefined));
    });

    it('return false for null', function () {
      assert.isFalse(isUndefined(null));
    });
  });

  describe('isDefined()', function () {
    var isDefined = isUtils.isDefined;

    it('return true for defined value', function () {
      var value = "i'm defined!";
      assert.isTrue(isDefined(value));
    });

    it('return true for null', function () {
      assert.isTrue(isDefined(null));
    });
  });

  describe('.isPresent()', function () {
    var isPresent = isUtils.isPresent;

    it('return false for null', function () {
      assert.isFalse(isPresent(null));
    });

    it('return false for undefined', function () {
      var notDefined = void 0;
      assert.isFalse(isPresent(notDefined));
    });
  });
});
