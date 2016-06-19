'use strict';

var isTypeUtils = require('../common-utils/is-type-utils');

var eventNames = [
  'onStart',
  'onPiecePlacementStart',
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

    if (isTypeUtils.isUndefined(listener)) {
      listener = function() {};
    } else if (!isTypeUtils.isFunction(listener)) {
      throw new Error(eventName + ' must be a function');
    }

    handler[eventName] = listener;
  });
}

module.exports = FenParseHandler;
