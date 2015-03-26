// This is the default function that is used to convert most properties to their shorthand version. It simply replaces the long properties by the shorthanded one and combines their values.x

module.exports = function(shorthand, declarations) {
  var shorthandValue = shorthand.shorthandSyntax;

  shorthand.properties.forEach(function(longProperty) {
    if (declarations[longProperty]) {
      shorthandValue = shorthandValue.replace(longProperty, declarations[longProperty].value);
    }
    else {
      shorthandValue = shorthandValue.replace(longProperty, '');
    }
  });

  shorthandValue = shorthandValue.replace('  ', ' ').trim();
  return shorthandValue;
};