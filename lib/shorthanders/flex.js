module.exports = function(shorthand, declarations) {
  var shorthandValue = require('./generic')(shorthand, declarations);

  if (!declarations['flex-grow'] || !declarations['flex-shrink']) {
    return '';
  }

  return shorthandValue.replace('  ', ' ').trim();
};