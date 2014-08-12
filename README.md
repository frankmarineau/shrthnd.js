shrthnd.js
==========

Makes your CSS files lighter and more readable by converting and combining properties into their shorthand versions when possible.

## Installation

    npm install shrthnd

## Usage

The module takes a CSS string as only parameter and returns an object containing two properties:

* **string**: The shorthanded CSS string
* **longPropertiesPositions**: An array containing the position (row & column in input string) of the properties that have been shorthanded

## Example

    var cssString = 'body { background-image: url(/img/meow.jpg); background-position: top center; }';

    var shrthnd = require('shrthnd');
    var shorthandedCss = shrthnd(cssString);
    console.log(shorthandedCss.string);