// This script licensed under the MIT.
// http://orgachem.mit-license.org


var tsumekusa = require('../../tsumekusa');
var array = require('../array');
var InlineContent = require('./InlineContent');
var VimHelpSentencePublisher = require('./VimHelpSentencePublisher');



/**
 * A class for sentence.
 * @param {string|tsumekusa.publishing.InlineContent} var_args Contents to
 *     append.
 * @constructor
 * @extends {tsumekusa.publishing.InlineContent}
 */
var Sentence = function(var_args) {
  InlineContent.call(this);
  this.contents_ = [];

  if (var_args) {
    this.appendInlineContents(Array.prototype.slice.call(arguments));
  }
};
tsumekusa.inherits(Sentence, InlineContent);


/**
 * Default publisher for the content.
 * @type {tsumekusa.publishing.ContentPublisher}
 */
Sentence.publisher = VimHelpSentencePublisher.getInstance();


/**
 * Sub contents of the sentence.
 * @type {Array.<tsumekusa.publishing.InineContent>}
 * @private
 */
Sentence.prototype.contents_;


/**
 * Parent content.
 * @type {tsumekusa.publishing.Paragraph}
 * @private
 */
Sentence.prototype.parent_ = null;


/**
 * Sets a parent content.  This method is chainable.
 * @param {tsumekusa.publishing.Paragraph} container Parent content.
 * @return {tsumekusa.publishing.Sentence} This instance.
 * @protected
 */
Sentence.prototype.setParent = function(container) {
  this.parent_ = container;
  return this;
};


/**
 * Returns a parent content.
 * @return {tsumekusa.publishing.Paragraph} Parent content.
 */
Sentence.prototype.getParent = function() {
  return this.parent_;
};


/**
 * Returns an array of sub contents.
 * @return {Array.<tsumekusa.publishing.InineContent>} Sub contents.
 */
Sentence.prototype.getInlineContents = function() {
  return array.clone(this.contents_);
};


/**
 * Returns an array of sub contents.
 * @param {number} index Index.
 * @return {tsumekusa.publishing.InineContent|string} Inline content.
 */
Sentence.prototype.getInlineContentAt = function(index) {
  return this.contents_[index];
};


/**
 * Sets an array of sub contents.  This method is chainable.
 * @param {number} index Index.
 * @param {tsumekusa.publishing.InineContent|string} content Inline content.
 * @return {tsumekusa.publishing.Sentence} This instance.
 */
Sentence.prototype.setInlineContentAt = function(content, index) {
  this.contents_[index] = content;
  return this;
};


/**
 * Appends inline contents.  This method is chainable.
 * @param {Array.<tsumekusa.publishing.InineContent>} contents Contents to
 *     append.
 * @return {tsumekusa.publishing.Sentence} This instance.
 */
Sentence.prototype.appendInlineContents = function(contents) {
  contents.forEach(function(content) {
    this.appendInlineContent(content);
  }, this);
  return this;
};


/**
 * Appends an inline content without a sentence to last.  This method is
 * chainable.
 * @param {tsumekusa.publishing.InineContent} content Content to append.
 * @return {tsumekusa.publishing.Sentence} This instance.
 */
Sentence.prototype.appendInlineContent = function(content) {
  return this.appendInlineContentAt(content, this.contents_.length);
};


/**
 * Appends an inline content without a sentence by an index.  This method is
 * chainable.
 * @param {tsumekusa.publishing.InineContent} content Content to append.
 * @param {number} index Index.
 * @return {tsumekusa.publishing.Sentence} This instance.
 */
Sentence.prototype.appendInlineContentAt = function(content, index) {
  if (content instanceof Sentence) {
    throw Error('Sentence cannot nest a sentence');
  }

  this.contents_.splice(index, 0, content);

  if (content.setParent) {
    content.setParent();
  }
  return this;
};


/**
 * Removes an inline by a content.
 * @param {tsumekusa.publishing.InineContent} content to remove.
 * @return {?tsumekusa.publishing.InineContent} Content was removed, if any.
 */
Sentence.prototype.removeInlineContent = function(content) {
  var index;
  if ((index = this.contents_.indexOf(content)) >= 0) {
    return this.removeInlineContentAt(index);
  }
  return null;
};


/**
 * Removes an inline content by an index.
 * @param {number} index Index.
 * @return {?tsumekusa.publishing.InineContent} Content was removed, if any.
 */
Sentence.prototype.removeInlineContentAt = function(index) {
  var removed = this.contents_.splice(index, 1)[0] || null;

  if (removed && removed.setParent) {
    removed.setParent(null);
  }

  return removed;
};


/**
 * Returns a count of inline contents included.
 * @return {number} Count of inline contents included.
 */
Sentence.prototype.getCount = function() {
  // TODO: Memorize count to fast processing
  return this.contents_.length;
};


/**
 * Extends a sentence with another sentence.  This method is chainable.
 * @param {tsumekusa.publishing.Sentence} sentence Sentence to extend.
 * @return {tsumekusa.publishing.Sentence} This instance.
 */
Sentence.prototype.extend = function(sentence) {
  if (this === sentence) {
    throw Error('Cannot concat self sentence.');
  }

  Array.prototype.push.apply(this.contents_, sentence.contents_);
  return this;
};


// Exports the constructor.
module.exports = Sentence;
