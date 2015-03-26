module.exports = function(shorthand, declarations) {
  var shorthandValue = require('./generic')(shorthand, declarations);

  // If we declare bg size but not position, we can't shorthand
  if (!declarations['border-width'] || !declarations['border-style'] || !declarations['border-color']) {
    return '';
  }

  return shorthandValue.replace('  ', ' ').trim();
};