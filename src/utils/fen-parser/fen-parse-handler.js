'use strict';

var isUtils = require('../common-utils/is-utils');

var eventNames = [
  'onStart',
  'onRankStart',
  'onRankEnd',
  'onPiece',
  'onEmptySquare',
  'onEmptySquaresCount',
  'onPiecePlacementEnd',
  'onWhiteActiveColor',
  'onBlackActiveColor',
  'onCastlingAvailability',
  'onEnPassantSquare',
  'onHalfMoveClock',
  'onFullmoveNumber',
  'onEnd'
];

function FenParseHandler(listeners) {
  addEventListeners(this, listeners);
}

function addEventListeners(handler, listeners) {
  eventNames.forEach(function (eventName) {
    var listener = listeners[eventName];

    if (isUtils.isUndefined(listener)) {
      listener = function() {};
    } else if (!isUtils.isFunction(listener)) {
      throw new Error(eventName + ' must be a function');
    }

    handler[eventName] = listener;
  });
}

module.exports = FenParseHandler;
