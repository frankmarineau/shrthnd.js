module.exports = function(shorthand, declarations) {
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