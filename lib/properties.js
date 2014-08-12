// This is the default function that is used to convert most properties to their shorthand version. It simply replaces
var basicShorthandReplace = function(shorthand, declarations) {
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

var shorthandMarginOrPadding = function(shorthand, declarations) {
  var propertyName = shorthand.shorthandProperty;

  if (declarations[propertyName + '-top'] && declarations[propertyName + '-right'] && declarations[propertyName + '-bottom'] && declarations[propertyName + '-left']) { // If all 4 margin sides are set
    if (declarations[propertyName + '-top'].value === declarations[propertyName + '-right'].value && declarations[propertyName + '-right'].value === declarations[propertyName + '-bottom'].value && declarations[propertyName + '-bottom'].value === declarations[propertyName + '-left'].value) { // If the margin is equal on all sides
      // 1-value notation
      return declarations[propertyName + '-top'].value;
    }
    else if (declarations[propertyName + '-top'].value === declarations[propertyName + '-bottom'].value && declarations[propertyName + '-left'].value === declarations[propertyName + '-right'].value) { // If horizontal and vertical margins are equal on both sides
      // 2-value notation
      return declarations[propertyName + '-top'].value + ' ' + declarations[propertyName + '-left'].value;
    }
    else if (declarations[propertyName + '-left'].value === declarations[propertyName + '-right'].value) { // If only the horizontal margin is equal on both sides
      // 3-value notation
      return declarations[propertyName + '-top'].value + ' ' + declarations[propertyName + '-left'].value + ' ' + declarations[propertyName + '-bottom'].value;
    }
    else { // If all 4 margins are different
      // 4-value notation
      return basicShorthandReplace(shorthand, declarations);
    }
  }
  else { // Not all margin sides are defined
    return '';
  }
};

// This array defines all the shorthand properties and their details
module.exports = [{
  shorthandProperty: 'margin',
  properties: ['margin-top', 'margin-right', 'margin-bottom', 'margin-left'],
  shorthandSyntax: 'margin-top margin-right margin-bottom margin-left',
  getShorthandValue: shorthandMarginOrPadding
}, {
  shorthandProperty: 'padding',
  properties: ['padding-top', 'padding-right', 'padding-bottom', 'padding-left'],
  shorthandSyntax: 'padding-top padding-right padding-bottom padding-left',
  getShorthandValue: shorthandMarginOrPadding
}, {
  shorthandProperty: 'background',
  properties: ['background-color', 'background-image', 'background-repeat', 'background-position', 'background-attachment'],
  shorthandSyntax: 'background-color background-image background-repeat background-position background-attachment',
  getShorthandValue: basicShorthandReplace
}, {
  shorthandProperty: 'font',
  properties: ['font-style', 'font-variant', 'font-weight', 'font-size', 'line-height', 'font-family'],
  shorthandSyntax: 'font-style font-variant font-weight font-size/line-height font-family',
  getShorthandValue: function(shorthand, declarations) {
    var shorthandValue = basicShorthandReplace(shorthand, declarations);

    // We must at least have size & family or else the shorthand will get ignored by the browser
    if (!declarations['font-size'] || !declarations['font-family']) {
      return "";
    }

    // Remove slash if line-height is not specified
    if (!declarations['line-height']) {
      shorthandValue = shorthandValue.replace('/', '');
    }

    return shorthandValue.replace('  ', ' ').trim();
  }
}, {
  shorthandProperty: 'border',
  properties: ['border-width', 'border-style', 'border-color'],
  shorthandSyntax: 'border-width border-style border-color',
  getShorthandValue: basicShorthandReplace
}, {
  shorthandProperty: 'outline',
  properties: ['outline-width', 'outline-style', 'outline-color'],
  shorthandSyntax: 'outline-width outline-style outline-color',
  getShorthandValue: basicShorthandReplace
}, {
  shorthandProperty: 'list-style',
  properties: ['list-style-type', 'list-style-position', 'list-style-image'],
  shorthandSyntax: 'list-style-type list-style-position list-style-image',
  getShorthandValue: basicShorthandReplace
}];