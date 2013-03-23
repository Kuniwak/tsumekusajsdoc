// This script licensed under the MIT.
// http://orgachem.mit-license.org


var tsumekusa = require('../../tsumekusa');
var Element = require('./Element');



/**
 * An abstract class for inline contents.
 * @constructor
 * @extends {tsumekusa.dom.Element}
 */
var InlineElement = function() {
  Element.call(this);
};
tsumekusa.inherits(InlineElement, Element);


/**
 * Whether the inline tag is unknown.
 * @type {boolean}
 */
InlineElement.prototype.unknown = false;


/**
 * Whether a content allows a line break is included in.
 * @return {boolean} Whether a content allows a line break is included in.
 */
InlineElement.prototype.isBreakable = tsumekusa.abstractMethod;


// Exports the constructor.
module.exports = InlineElement;
