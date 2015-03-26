module.exports = function(shorthand, declarations) {
  var bgProps = {};

  shorthand.properties.forEach(function(property) {
    bgProps[property] = (declarations[property] ? declarations[property].value.split(',') : []);

    // Unify bg layers that have commas because of things like line-gradient
    var unifiedLayers = [];
    var inParenthese = false;
    bgProps[property].forEach(function(bgLayer) {
      if (inParenthese) {
        unifiedLayers[unifiedLayers.length - 1] = unifiedLayers[unifiedLayers.length - 1] += ',' + bgLayer;

        if (bgLayer.indexOf(')') > -1) {
          inParenthese = false;
        }
      }
      else {
        unifiedLayers.push(bgLayer);

        if (bgLayer.indexOf('(') > -1) {
          inParenthese = true;
        }
      }
    });

    bgProps[property] = unifiedLayers;
  });

  var nbLayers = bgProps['background-image'].length;
  var bgLayerProperties = ['background-image', 'background-repeat', 'background-position', 'background-attachment', 'background-origin', 'background-clip', 'background-size'];

  // Define default bg position if it's undefined and we have defined a bg size
  if (!bgProps['background-position'][0] && bgProps['background-size'][0]) {
    bgProps['background-position'][0] = '0 0';
  }

  // Replicate properties that are just defined once accross all layers
  bgLayerProperties.forEach(function(layerProperty) {
    if (bgProps[layerProperty].length < nbLayers) {
      for (var i = bgProps[layerProperty].length ; i < nbLayers ; i++) {
        bgProps[layerProperty].push(bgProps[layerProperty][0]);
      }
    }
  });

  // Stringify the properties
  var shorthandedProperty = "";

  for (var i = 0 ; i < nbLayers ; i++) {
    var layerShorthand = shorthand.shorthandSyntax;
    if (i > 0) layerShorthand = ', ' + layerShorthand;

    bgLayerProperties.forEach(function(bgLayerProperty) {
      if (bgProps[bgLayerProperty][i]) {
        layerShorthand = layerShorthand.replace(bgLayerProperty, bgProps[bgLayerProperty][i]);
      }
      else {
        layerShorthand = layerShorthand.replace(bgLayerProperty, '');
      }

      layerShorthand = layerShorthand.replace('background-color', '');
    });

    // Separate background-size from background-position with a slash only if background-size is specified
    if (bgProps['background-size'][i]) {
      layerShorthand = layerShorthand.replace('{{bg-position-size-slash}}', '/');
    }
    else {
      layerShorthand = layerShorthand.replace('{{bg-position-size-slash}}', '');
    }

    shorthandedProperty += layerShorthand.trim();
  }

  shorthandedProperty += ' ' + (bgProps['background-color'][0] || "");

  return shorthandedProperty.replace(/\s+/g, ' ').trim();
};