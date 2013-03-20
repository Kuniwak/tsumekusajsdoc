// This script licensed under the MIT.
// http://orgachem.mit-license.org


var tsumekusa = require('../../tsumekusa');
var Element = require('./element');



/**
 * A class for anchor elements.
 * @constructor
 * @extends {tsumekusa.html.Element}
 */
var AnchorElement = function(content, href) {
  Element.call(this, 'a', false, content);
  this.setAttribute('href', href);
};
tsumekusa.inherits(AnchorElement, Element);


// Exports the constructor.
module.exports = AnchorElement;
