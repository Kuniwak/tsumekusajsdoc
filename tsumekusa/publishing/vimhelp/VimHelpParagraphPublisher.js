// This script licensed under the MIT.
// http://orgachem.mit-license.org


var tsumekusa = require('../../../tsumekusa');
var LineWrapper = require('../../../tsumekusa/LineWrapper');



/**
 * A class for paragraph publisher for vim help.
 * @constructor
 * @implements {tsumekusa.publishing.ContentPublisher}
 */
var VimHelpParagraphPublisher = function() {};
tsumekusa.addSingletonGetter(VimHelpParagraphPublisher);


/**
 * Returns an indent level by a paragraph.
 * @param {tsumekusa.contents.Paragraph} paragraph Paragraph.
 * @return {number} Indent lebel.
 */
VimHelpParagraphPublisher.prototype.getIndentLevel = function(paragraph) {
  return 0;
};


/** @override */
VimHelpParagraphPublisher.prototype.publish = function(paragraph) {
  var sentences = paragraph.getSentences();

  // concat all sentences
  var inlineContents = Array.prototype.concat.apply([],
      sentences.map(function(sentence) {
    return sentence.getInlineContents();
  }));

  var str = LineWrapper.getInstance().wrap(inlineContents, tsumekusa.TEXT_WIDTH,
                                        this.getIndentLevel(paragraph));

  return str;
};


// Export the constructor
module.exports = VimHelpParagraphPublisher;
