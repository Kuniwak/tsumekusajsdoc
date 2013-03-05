// This script licensed under the MIT.
// http://orgachem.mit-license.org


var jsdocref = require('../../jsdocref');
var LineWrapper = require('./LineWrapper');



/**
 * A class for paragraph publisher for vim help.
 * @constructor
 * @implements {jsdocref.publishing.ContentPublisher}
 */
var VimHelpParagraphPublisher = function() {};
jsdocref.addSingletonGetter(VimHelpParagraphPublisher);


/**
 * Returns an indent level by a paragraph.
 * @param {jsdocref.publishing.Paragraph} paragraph Paragraph.
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

  var str = LineWrapper.getInstance().wrap(inlineContents, jsdocref.TEXT_WIDTH,
                                        this.getIndentLevel(paragraph));

  return ['', str, ''].join('\n');
};


// Export the constructor
module.exports = VimHelpParagraphPublisher;
