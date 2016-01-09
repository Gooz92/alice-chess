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
