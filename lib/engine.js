var css = require('css');
var shorthands = require('./properties');

module.exports = function(cssString) {
  var cssObject = css.parse(cssString);
  var longPropertiesPositions = [];

  // Loop through every rule of the stylesheet
  cssObject.stylesheet.rules.forEach(function(rule) {
    if (rule.type === "rule") { // Exclude comments and other things that aren't rules
      var declarations = [];

      // Create an array of the rule's declarations indexed by their property name
      rule.declarations.forEach(function(declaration) {
        declarations[declaration.property] = declaration;
      });

      // Loop through all of the shorthandable properties to find if the current one can be shortened
      shorthands.forEach(function(shorthand) {
        var shorthandValue = shorthand.getShorthandValue(shorthand, declarations); // Defined in properties.js

        if (shorthandValue !== "") { // If there are no the specific properties of the shorthand, "getShorthandValue" returns an empty string
          var newDeclarations = [];

          // Add the new shorthanded property
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

          // Replace the rule's old declarations with the new shorthanded ones
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