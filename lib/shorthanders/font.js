module.exports = function(shorthand, declarations) {
  var shorthandValue = require('./generic')(shorthand, declarations);

  // We must at least have size & family or else the shorthand will get ignored by the browser
  if (!declarations['font-size'] || !declarations['font-family']) {
    return "";
  }

  // Remove slash if line-height is not specified
  if (!declarations['line-height']) {
    shorthandValue = shorthandValue.replace('/', '');
  }

  return shorthandValue.replace('  ', ' ').trim();
};