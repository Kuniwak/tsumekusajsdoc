// This script licensed under the MIT.
// http://orgachem.mit-license.org


var tsumekusa = require('../../tsumekusa');
var BlockContent = require('./BlockContent');



/**
 * A class for preformatted paragraph.
 * @constructor
 * @param {string} content Preformatted content.
 * @extends {tsumekusa.contents.BlockContent}
 */
var PreformattedParagraph = function(content) {
  BlockContent.call(this);
  this.content_ = content;
};
tsumekusa.inherits(PreformattedParagraph, BlockContent);


/**
 * Default content publisher.
 * @type {tsumekusa.publishing.PreformattedParagraphPublisher}
 */
PreformattedParagraph.publisher = null;


/**
 * Returns a preformatted content.
 * @return {string} Preformatted content.
 */
PreformattedParagraph.prototype.getContent = function() {
  return this.content_;
};



// Exports the constructor.
module.exports = PreformattedParagraph;
