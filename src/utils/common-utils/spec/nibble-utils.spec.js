'use strict';

var assert = require('chai').assert,
  nibbleUtils = require('../nibble-utils');

describe('nibbleUtils', function () {
  describe('.composeByte()', function () {
    var composeByte = nibbleUtils.composeByte;

    it('return 0 for nibbles 0 and 0', function () {
      var zero = composeByte(0, 0);
      assert.strictEqual(zero, 0);
    });

    it('return 0x08 for nibbles 0 and 8', function () {
      var eight = composeByte(0, 8);
      assert.strictEqual(eight, 8);
    });

    it('return 0x70 for nibbles 7 and 0', function () {
      var _112 = composeByte(7, 0);
      assert.strictEqual(_112, 0x70);
    });

    it('return 0x42 for nibbles 4 and 2', function () {
      var answer = composeByte(4, 2);
      assert.strictEqual(answer, 0x42);
    });
  });

  describe('.extractHighNibble', function () {
    var extractHighNibble = nibbleUtils.extractHighNibble;

    it('return 0 for 0', function () {
      var zero = extractHighNibble(0);
      assert.strictEqual(zero, 0);
    });

    it('return 9 for 0x90', function () {
      var nine = extractHighNibble(0x90);
      assert.strictEqual(nine, 9);
    });

    it('return 4 for 0x42', function () {
      var four = extractHighNibble(0x42);
      assert.strictEqual(four, 4);
    });
  });

  describe('.extractLowNibble', function () {
    var extractLowNibble = nibbleUtils.extractLowNibble;

    it('return 0 for 0', function () {
      var zero = extractLowNibble();
      assert.strictEqual(zero, 0);
    });

    it('return 15 for 15', function () {
      var fifteen = extractLowNibble(15);
      assert.strictEqual(fifteen, 15);
    });

    it('return 2 for 0x42', function () {
      var two = extractLowNibble(0x42);
      assert.strictEqual(two, 2);
    });
  });

  describe('.nibblesToBytes', function () {
    var nibblesToBytes = nibbleUtils.nibblesToBytes;

    it('return empty array for empty array', function () {
      var empty = nibblesToBytes([]);
      assert.deepEqual(empty, []);
    });

    it('return [0xab, 0xcd] for [10, 11, 12, 13]', function () {
      var abc = nibblesToBytes([10, 11, 12, 13]);
      assert.deepEqual(abc, [0xab, 0xcd]);
    });

    it('return [0xB0, 0x0B, 0x50] for [11, 0, 0, 11, 5]', function () {
      var boobs = nibblesToBytes([11, 0, 0, 11, 5]);
      assert.deepEqual(boobs, [0xB0, 0x0B, 0x50]);
    });
  });
});