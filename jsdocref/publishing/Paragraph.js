// This script licensed under the MIT.
// http://orgachem.mit-license.org


var jsdocref = require('../../jsdocref');
var BlockContent = require('./BlockContent');
var Sentence = require('./Sentence');
var VimHelpParagraphPublisher = require('./VimHelpParagraphPublisher');



/**
 * A class for sentence.
 * @param {...jsdocref.publishing.Sentence} var_args Sentences to append.
 * @constructor
 * @extends {jsdocref.publishing.BlockContent}
 */
var Paragraph = function(var_args) {
  BlockContent.call(this);
  this.sentences_ = [];
  this.appendSentences(Array.prototype.slice.call(arguments));
};
jsdocref.inherits(Paragraph, BlockContent);


/**
 * Default content publisher.
 * @type {jsdocref.publishing.ContentPublisher}
 */
Paragraph.publisher = VimHelpParagraphPublisher.getInstance();


/**
 * Sentences of the paragraph.
 * @type {Array.<jsdocref.publishing.Sentence>}
 * @private
 */
Paragraph.prototype.sentences_;


/**
 * Returns an array of sub sentences.
 * @return {Array.<jsdocref.publishing.Sentence>} Sub sentences.
 */
Paragraph.prototype.getSentences = function() {
  return this.sentences_;
};


/**
 * Appends sub contents to last.  This method is chainable.
 * @param {Array.<jsdocref.publishing.InlineContent>} contents Sentences to
 *     append.
 * @return {jsdocref.publishing.Paragraph} This instance.
 */
Paragraph.prototype.appendSentences = function(contents) {
  contents.forEach(function(content) {
    this.appendSentence(content);
  }, this);
  return this;
};


/**
 * Appends a sub content to last.  This method is chainable.
 * @param {jsdocref.publishing.InlineContent} content Sentence to append.
 * @return {jsdocref.publishing.Paragraph} This instance.
 */
Paragraph.prototype.appendSentence = function(content) {
  return this.appendSentenceAt(content, this.sentences_.length);
};


/**
 * Appends a sub content by an index.  This method is chainable.
 * @param {jsdocref.publishing.InlineContent} content Sentence to append.
 *     Wrap by {@link jsdocref.publishing.Sentence} if the content is not {@link
 *     jsdocref.publishing.Sentence}.
 * @param {number} index Index.
 * @return {jsdocref.publishing.Paragraph} This instance.
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
 * @param {jsdocref.publishing.Sentence} content to remove.
 * @return {?jsdocref.publishing.Sentence} Sentence was removed, if
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
 * @return {?jsdocref.publishing.Sentence} Sentence was removed, if
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
