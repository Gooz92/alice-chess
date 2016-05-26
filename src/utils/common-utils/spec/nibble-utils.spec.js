'use strict';

let assert = require('chai').assert,
  nibbleUtils = require('../nibble-utils');

describe('nibbleUtils', function () {
  describe('.composeByte()', function () {
    let composeByte = nibbleUtils.composeByte;

    it('return 0 for nibbles 0 and 0', function () {
      let zero = composeByte(0, 0);
      assert.strictEqual(zero, 0);
    });

    it('return 0x08 for nibbles 0 and 8', function () {
      let eight = composeByte(0, 8);
      assert.strictEqual(eight, 8);
    });

    it('return 0x70 for nibbles 7 and 0', function () {
      let _112 = composeByte(7, 0);
      assert.strictEqual(_112, 0x70);
    });

    it('return 0x42 for nibbles 4 and 2', function () {
      let answer = composeByte(4, 2);
      assert.strictEqual(answer, 0x42);
    });
  });

  describe('.extractHighNibble', function () {
    let extractHighNibble = nibbleUtils.extractHighNibble;

    it('return 0 for 0', function () {
      let zero = extractHighNibble(0);
      assert.strictEqual(zero, 0);
    });

    it('return 9 for 0x90', function () {
      let nine = extractHighNibble(0x90);
      assert.strictEqual(nine, 9);
    });

    it('return 4 for 0x42', function () {
      let four = extractHighNibble(0x42);
      assert.strictEqual(four, 4);
    });
  });

  describe('.extractLowNibble', function () {
    let extractLowNibble = nibbleUtils.extractLowNibble;

    it('return 0 for 0', function () {
      let zero = extractLowNibble();
      assert.strictEqual(zero, 0);
    });

    it('return 15 for 15', function () {
      let fifteen = extractLowNibble(15);
      assert.strictEqual(fifteen, 15);
    });

    it('return 2 for 0x42', function () {
      let two = extractLowNibble(0x42);
      assert.strictEqual(two, 2);
    });
  });

  describe('.nibblesToBytes', function () {
    let nibblesToBytes = nibbleUtils.nibblesToBytes;

    it('return empty array for empty array', function () {
      let empty = nibblesToBytes([]);
      assert.deepEqual(empty, []);
    });

    it('return [0xab, 0xcd] for [10, 11, 12, 13]', function () {
      let abc = nibblesToBytes([10, 11, 12, 13]);
      assert.deepEqual(abc, [0xab, 0xcd]);
    });

    it('return [0xB0, 0x0B, 0x50] for [11, 0, 0, 11, 5]', function () {
      let boobs = nibblesToBytes([11, 0, 0, 11, 5]);
      assert.deepEqual(boobs, [0xB0, 0x0B, 0x50]);
    });
  });
});