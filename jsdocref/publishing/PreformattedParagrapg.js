// This script licensed under the MIT.
// http://orgachem.mit-license.org


var jsdocref = require('../../jsdocref');
var BlockContent = require('./BlockContent');
var VimHelpPreformattedParagraphPublisher = require(
    './VimHelpPreformattedParagraphPublisher');



/**
 * A class for preformatted paragraph.
 * @constructor
 * @param {string} content Preformatted content.
 * @extends {jsdocref.publishing.BlockContent}
 */
var PreformattedParagraph = function(content) {
  BlockContent.call(this);
  this.content_ = content;
};
jsdocref.inherits(PreformattedParagraph, BlockContent);


/**
 * Returns a preformatted content.
 * @return {string} Preformatted content.
 */
PreformattedParagraph.prototype.getContent = function() {
  return this.content_;
};


/**
 * Default content publisher.
 * @type {jsdocref.publishing.ContentPublisher}
 */
PreformattedParagraph.publisher = VimHelpPreformattedParagraphPublisher.
    getInstance();



// Exports the constructor.
module.exports = PreformattedParagraph;
