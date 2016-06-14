'use strict';

var created = false;

function Color(name, token, index) {
  if (created) {
    throw new Error('Color enum already created');
  }

  this.name = name;
  this.token = token;
  this.index = index;
}

Color.WHITE = new Color('white', 'w', 1);
Color.BLACK = new Color('black', 'b', 0);

created = true;

Color.prototype.isWhite = function () {
  return this === Color.WHITE;
};

Color.prototype.isBlack = function () {
  return this === Color.BLACK;
};

Color.prototype.toggle = function () {
  return this.isWhite() ? Color.BLACK : Color.WHITE;
};

Color.getByToken = function (token) {
  if (token === 'w') {
    return Color.WHITE;
  }

  if (token === 'b') {
    return Color.BLACK;
  }

  throw new Error('Unknown color token: ' + token);
};

Color.getByName = function (colorName) {
  if (colorName === Color.WHITE.name) {
    return Color.WHITE;
  }

  if (colorName === Color.BLACK.name) {
    return Color.BLACK;
  }

  throw new Error('Unknown color name: ' + colorName);
};

Color.getByFlag = function (flag) {
  return flag ? Color.WHITE : Color.BLACK;
};

Color.getByIndex = function (index) {
  if (index === 1) {
    return Color.WHITE
  } else if (index === 0) {
    return Color.BLACK;
  }

  throw new Error('Invalid color index');
}

module.exports = Color;
