"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _date_base_for_test = require("./date_base_for_test");
Object.keys(_date_base_for_test).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _date_base_for_test[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _date_base_for_test[key];
    }
  });
});