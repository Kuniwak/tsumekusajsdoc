// This script licensed under the MIT.
// http://orgachem.mit-license.org


var jsdocref = require('../../jsdocref');
var Element = require('./element');



/**
 * A class for anchor elements.
 * @constructor
 * @extends {jsdocref.dom.Element}
 */
var AnchorElement = function(content, href) {
  Element.call(this, 'a', false, content);
  this.setAttribute('href', href);
};
jsdocref.inherits(AnchorElement, Element);


// Exports the constructor.
module.exports = AnchorElement;
