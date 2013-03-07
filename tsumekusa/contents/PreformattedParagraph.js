// This script licensed under the MIT.
// http://orgachem.mit-license.org


var tsumekusa = require('../../tsumekusa');
var BlockContent = require('./BlockContent');
var VimHelpPreformattedParagraphPublisher = require(
    '../publishing/VimHelpPreformattedParagraphPublisher');



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
 * Returns a preformatted content.
 * @return {string} Preformatted content.
 */
PreformattedParagraph.prototype.getContent = function() {
  return this.content_;
};


/**
 * Default content publisher.
 * @type {tsumekusa.publishing.ContentPublisher}
 */
PreformattedParagraph.publisher = VimHelpPreformattedParagraphPublisher.
    getInstance();



// Exports the constructor.
module.exports = PreformattedParagraph;
