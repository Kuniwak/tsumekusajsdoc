// This script licensed under the MIT.
// http://orgachem.mit-license.org


var tsumekusa = require('../../tsumekusa');
var BlockElement = require('./BlockElement');



/**
 * A class for preformatted paragraph.
 * @constructor
 * @param {string} content Preformatted content.
 * @extends {tsumekusa.dom.BlockElement}
 */
var PreformattedParagraph = function(content) {
  BlockElement.call(this);
  this.content_ = content;
};
tsumekusa.inherits(PreformattedParagraph, BlockElement);


/**
 * Default content publisher.
 * @type {tsumekusa.publishing.PreformattedParagraphPublisher}
 */
PreformattedParagraph.publisher = null;


/**
 * Returns a preformatted content.
 * @return {string} Preformatted content.
 */
PreformattedParagraph.prototype.getElement = function() {
  return this.content_;
};



// Exports the constructor.
module.exports = PreformattedParagraph;
