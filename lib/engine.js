var css = require('css');
var shorthands = require('./properties');

module.exports = function(cssString) {
  var cssObject = css.parse(cssString);
  var longPropertiesPositions = [];

  cssObject.stylesheet.rules.forEach(function(rule) {
    if (rule.type === "rule") {
      var declarations = [];

      rule.declarations.forEach(function(declaration) {
        declarations[declaration.property] = declaration;
      });

      shorthands.forEach(function(shorthand) {
        var shorthandValue = shorthand.getShorthandValue(shorthand, declarations);

        if (shorthandValue !== "") {
          var newDeclarations = [];

          // Add the new shorthand property
          newDeclarations.push({
            type: 'declaration',
            property: shorthand.shorthandProperty,
            value: shorthandValue
          });

          // Add properties having nothing to do with the property being shorthanded
          rule.declarations.forEach(function(declaration) {
            if (shorthand.properties.indexOf(declaration.property) <= -1) {
              newDeclarations.push(declaration);
            }
            else {
              longPropertiesPositions.push(declaration.position);
            }
          });

          rule.declarations = newDeclarations;
        }
      });
    }
  });

  return {
    string: css.stringify(cssObject),
    longPropertiesPositions: longPropertiesPositions
  };
};