'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var constantize = function constantize(obj) {
  Object.freeze(obj);
  Object.keys(obj).forEach(function (key, value) {
    if (_typeof(obj[key]) === 'object') {
      constantize(obj[key]);
    }
  });
};