// This script licensed under the MIT.
// http://orgachem.mit-license.org


var tsumekusa = require('../../tsumekusa');
var BlockContent = require('./BlockContent');
var Sentence = require('./Sentence');
var VimHelpParagraphPublisher = require(
    '../publishing/VimHelpParagraphPublisher');



/**
 * A class for sentence.
 * @param {Array.<tsumekusa.contents.Sentence>} var_args Sentences to append.
 * @constructor
 * @extends {tsumekusa.contents.BlockContent}
 */
var Paragraph = function(var_args) {
  BlockContent.call(this);
  this.sentences_ = [];
  if (var_args) {
    this.appendSentences(Array.prototype.slice.apply(arguments, 0));
  }
};
tsumekusa.inherits(Paragraph, BlockContent);


/**
 * Default content publisher.
 * @type {tsumekusa.publishing.ContentPublisher}
 */
Paragraph.publisher = VimHelpParagraphPublisher.getInstance();


/**
 * Sentences of the paragraph.
 * @type {Array.<tsumekusa.contents.Sentence>}
 * @private
 */
Paragraph.prototype.sentences_;


/**
 * Returns an array of sub sentences.
 * @return {Array.<tsumekusa.contents.Sentence>} Sub sentences.
 */
Paragraph.prototype.getSentences = function() {
  return this.sentences_;
};


/**
 * Appends sub contents to last.  This method is chainable.
 * @param {Array.<tsumekusa.contents.InlineContent>} contents Sentences to
 *     append.
 * @return {tsumekusa.contents.Paragraph} This instance.
 */
Paragraph.prototype.appendSentences = function(contents) {
  contents.forEach(function(content) {
    this.appendSentence(content);
  }, this);
  return this;
};


/**
 * Appends a sub content to last.  This method is chainable.
 * @param {tsumekusa.contents.InlineContent} content Sentence to append.
 * @return {tsumekusa.contents.Paragraph} This instance.
 */
Paragraph.prototype.appendSentence = function(content) {
  return this.appendSentenceAt(content, this.sentences_.length);
};


/**
 * Appends a sub content by an index.  This method is chainable.
 * @param {tsumekusa.contents.InlineContent} content Sentence to append.
 *     Wrap by {@link tsumekusa.contents.Sentence} if the content is not {@link
 *     tsumekusa.contents.Sentence}.
 * @param {number} index Index.
 * @return {tsumekusa.contents.Paragraph} This instance.
 */
Paragraph.prototype.appendSentenceAt = function(content, index) {
  var sentence = content;

  // TODO: remove instanceof
  if (!(content instanceof Sentence)) {
    sentence = new Sentence(content);
  }
  sentence.setParent(this);
  this.sentences_.splice(index, 0, sentence);
  return this;
};


/**
 * Removes a sub content by a content.
 * @param {tsumekusa.contents.Sentence} content to remove.
 * @return {?tsumekusa.contents.Sentence} Sentence was removed, if
 *     any.
 */
Paragraph.prototype.removeSentence = function(content) {
  var index;
  if ((index = this.sentences_.indexOf(content)) >= 0) {
    return this.removeSentenceAt(index);
  }
  return null;
};


/**
 * Removes a sub content by an index.
 * @param {number} index Index.
 * @return {?tsumekusa.contents.Sentence} Sentence was removed, if
 *     any.
 */
Paragraph.prototype.removeSentenceAt = function(index) {
  var removed = this.sentences_.splice(index, 1)[0];

  if (removed) {
    removed.setParent(null);
    return removed;
  }

  return null;
};


// Exports the constructor.
module.exports = Paragraph;
