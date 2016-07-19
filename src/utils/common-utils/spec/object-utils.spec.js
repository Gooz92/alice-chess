'use strict';

var assert = require('chai').assert,
  sinon = require('sinon'),
  objectUtils = require('../object-utils');

describe('objectUtils', function () {
  describe('.forEachOwnProperty()', function () {
    var object = {
      one: 'one',
      two: 'two'
    };

    it('call callback for every property in object', function () {
      var propertiesCount = Object.keys(object).length,
        callback = sinon.spy();

      objectUtils.forEachOwnProperty(object, callback);

      assert.strictEqual(callback.callCount, propertiesCount);
    });

    it('call callback with property value as first argument', function () {
      var callback = sinon.spy();

      objectUtils.forEachOwnProperty(object, callback);

      assert.isTrue(callback.calledWith('two'));
    });
  });

  describe('.extend()', function () {
    it('copy all properties from sources to target', function () {
      var firstSource = {
        one: 1
      };

      var secondSource = {
        two: 2
      };

      var target = objectUtils.extend({}, firstSource, secondSource);

      assert.deepEqual(target, {
        one: 1,
        two: 2
      });
    });
  });

  describe('.defaults()', function () {
    var defaults = objectUtils.defaults;
    it('set given default values to missed properties', function () {
      var circle = {
        radius: 1
      };

      circle = defaults(circle, {
        x: 0,
        y: 0
      });

      assert.deepEqual(circle, {
        radius: 1,
        x: 0,
        y: 0
      });
    });
  });

  describe('.pick()', function () {
    var pick = objectUtils.pick;
    it('creates an object with picked object properties', function () {
      var rectangle = {
        x: 10,
        y: 10,
        width: 50,
        height: 100
      };

      var size = pick(rectangle, ['width', 'height']);

      assert.deepEqual(size, {
        width: 50,
        height: 100
      });
    });
  });

  describe('.get()', function () {
    var get = objectUtils.get;
    it('get object property by property names chain');
  });

  describe('.merge()', function () {
    it('copy all properties from sources to target', function () {
      var firstSource = {
        one: 1
      };

      var secondSource = {
        two: 2
      };

      var target = objectUtils.merge({}, firstSource, secondSource);

      assert.deepEqual(target, {
        one: 1,
        two: 2
      });
    });
  });

  describe('.invert()', function () {
    it('return object with inverted keys and values', function () {
      assert.deepEqual(objectUtils.invert({
        key1: 'val1',
        key2: 'val2'
      }), {
        val1: 'key1',
        val2: 'key2'
      });
    });
  });

  describe('.inherit()', function () {
    function Parent() {

    }

    Parent.prototype.parentMethod = function () {
      return 'parent';
    };

    function Child() {

    }

    it('return Child constructor', function () {
      var Constructor = objectUtils.inherit(Child, Parent);
      assert.strictEqual(Constructor, Child);
    });
  });
});
