// This script licensed under the MIT.
// http://orgachem.mit-license.org



var tsumekusa = require('../../tsumekusa');
var LineWrapper = require('./LineWrapper');



/**
 * A class for sentence publisher for vim help.
 * @constructor
 * @implements {tsumekusa.contents.Content}
 */
var VimHelpSentencePublisher = function() {};
tsumekusa.addSingletonGetter(VimHelpSentencePublisher);


/**
 * Returns an indent level by a sentence.
 * @param {tsumekusa.contents.Sentence} sentence Sentence.
 * @return {number} Indent lebel.
 */
VimHelpSentencePublisher.prototype.getIndentLevel = function(sentence) {
  return 0;
};


/** @override */
VimHelpSentencePublisher.prototype.publish = function(sentence) {
  return LineWrapper.getInstance().wrap(sentence.getInlineContents(),
                                        tsumekusa.TEXT_WIDTH);
};


// Exports the constructor
module.exports = VimHelpSentencePublisher;
