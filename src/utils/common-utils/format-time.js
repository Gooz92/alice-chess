'use strict';

// converta time in milliseconds to hh:mm:ss.ms
function formatTime(ms) {
  var h = 0, m = 0, s = 0;

  if (ms >= 1e3) {
    s = Math.floor(ms * 0.001);
    ms -= s * 1e3;
  }

  if (s > 59) {
    m = Math.floor(s / 60);
    s -= m * 60;
  }

  if (m > 59) {
    h = Math.floor(m / 60);
    m -= h * 60;
  }

  return [h, m, s].map(function (u) {
    return u < 10 ? '0' + u : u;
  }).join(':') + '.' + (ms < 100 ? '0' + ms : ms);
}

module.exports = formatTime;
