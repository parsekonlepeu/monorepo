"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getLocationOfFirst = void 0;
var getLocationOfFirst = function getLocationOfFirst(firstDay, dt) {
  var weekDay = dt.weekday;
  var startSunday = [7, 1, 2, 3, 4, 5, 6];
  var startMonday = [1, 2, 3, 4, 5, 6, 7];
  var startSaturday = [6, 7, 1, 2, 3, 4, 5];
  switch (firstDay) {
    case "monday":
      return startMonday.indexOf(weekDay);
    case "saturday":
      return startSaturday.indexOf(weekDay);
    case "sunday":
      return startSunday.indexOf(weekDay);
  }
};
exports.getLocationOfFirst = getLocationOfFirst;