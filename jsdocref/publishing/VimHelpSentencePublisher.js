// This script licensed under the MIT.
// http://orgachem.mit-license.org



var jsdocref = require('../../jsdocref');
var LineWrapper = require('./LineWrapper');



/**
 * A class for sentence publisher for vim help.
 * @constructor
 * @implements {jsdocref.publishing.Content}
 */
var VimHelpSentencePublisher = function() {};
jsdocref.addSingletonGetter(VimHelpSentencePublisher);


/**
 * Returns an indent level by a sentence.
 * @param {jsdocref.publishing.Sentence} sentence Sentence.
 * @return {number} Indent lebel.
 */
VimHelpSentencePublisher.prototype.getIndentLevel = function(sentence) {
  return 0;
};


/** @override */
VimHelpSentencePublisher.prototype.publish = function(sentence) {
  return LineWrapper.getInstance().wrap(sentence.getInlineContents(),
                                        jsdocref.TEXT_WIDTH);
};


// Exports the constructor
module.exports = VimHelpSentencePublisher;
