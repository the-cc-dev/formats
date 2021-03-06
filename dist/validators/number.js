'use strict';

var getReturnValue = require('../getReturnValue'),
    throwOnUnknownProperties = require('../throwOnUnknownProperties');

var validator = function validator(options) {
  options = options || {};
  options.min = options.min || Number.NEGATIVE_INFINITY;
  options.max = options.max || Number.POSITIVE_INFINITY;
  options.isInteger = Boolean(options.isInteger);

  throwOnUnknownProperties(options, ['min', 'max', 'isInteger', 'default']);

  return function (value) {
    var returnValue = getReturnValue(value, options);

    if (typeof value !== 'number') {
      return returnValue.false;
    }

    if (options.isInteger && Math.trunc(value) !== value) {
      return returnValue.false;
    }

    if (value < options.min) {
      return returnValue.false;
    }

    if (value > options.max) {
      return returnValue.false;
    }

    return returnValue.true;
  };
};

module.exports = validator;