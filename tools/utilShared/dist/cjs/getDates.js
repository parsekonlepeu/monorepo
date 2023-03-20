"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDates = void 0;
var _luxon = require("luxon");
var _getLocationOfFirst = require("./getLocationOfFirst");
var getDates = function getDates(firstDay, month, year) {
  var dt = _luxon.DateTime.local(year, month, 1);
  var row_1 = new Array(7).fill(0);
  var row_2 = new Array(7).fill(0);
  var row_3 = new Array(7).fill(0);
  var row_4 = new Array(7).fill(0);
  var row_5 = new Array(7).fill(0);
  var row_6 = new Array(7).fill(0);
  var daysReturn = [row_1, row_2, row_3, row_4, row_5, row_6];
  var arrayIndex = [0, 1, 2, 3, 4, 5, 6];
  var locationOfFirst = (0, _getLocationOfFirst.getLocationOfFirst)(firstDay, dt);
  var indexFilling = arrayIndex.findIndex(function (item) {
    return item === locationOfFirst;
  });
  var lengthLeft = arrayIndex.slice(0, indexFilling).length;
  var lengthRight = indexFilling === 6 ? 0 : arrayIndex.slice(indexFilling + 1).length;
  for (var j = 1; j <= lengthLeft; j++) {
    for (var i = 0; i < 6; i++) {
      daysReturn[i][indexFilling - j] = dt.plus({
        days: i * 7
      }).minus({
        days: j
      });
    }
  }
  for (var _j = 1; _j <= lengthRight; _j++) {
    for (var _i = 0; _i < 6; _i++) {
      daysReturn[_i][indexFilling + _j] = dt.plus({
        days: _i * 7 + _j
      });
    }
  }
  for (var _i2 = 0; _i2 < 6; _i2++) {
    daysReturn[_i2][indexFilling] = dt.plus({
      days: _i2 * 7
    });
  }
  return daysReturn;
};
exports.getDates = getDates;