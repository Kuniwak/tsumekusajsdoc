// This script licensed under the MIT.
// http://orgachem.mit-license.org


var jsdocref = require('../../jsdocref');
var array = require('../array');
var InlineContent = require('./InlineContent');
var VimHelpSentencePublisher = require('./VimHelpSentencePublisher');



/**
 * A class for sentence.
 * @param {...(string|jsdocref.publishing.InlineContent)} var_args Contents to
 *     add.
 * @constructor
 * @extends {jsdocref.publishing.InlineContent}
 */
var Sentence = function(var_args) {
  InlineContent.call(this);
  this.contents_ = [];
  this.appendInlineContents(Array.prototype.slice.call(arguments));
};
jsdocref.inherits(Sentence, InlineContent);


/**
 * Default publisher for the content.
 * @type {VimHelpSentencePublisher}
 */
Sentence.publisher = VimHelpSentencePublisher.getInstance();


/**
 * Sub contents of the sentence.
 * @type {Array.<jsdocref.publishing.Content>}
 * @private
 */
Sentence.prototype.contents_;


/**
 * Parent content.
 * @type {jsdocref.publishing.Paragraph}
 * @private
 */
Sentence.prototype.parent_ = null;


/**
 * Sets a parent content.  This method is chainable.
 * @param {jsdocref.publishing.Paragraph} container Parent content.
 * @return {jsdocref.publishing.Sentence} This instance.
 * @protected
 */
Sentence.prototype.setParent = function(container) {
  this.parent_ = container;
  return this;
};


/**
 * Returns a parent content.
 * @return {jsdocref.publishing.Paragraph} Parent content.
 */
Sentence.prototype.getParent = function() {
  return this.parent_;
};


/**
 * Returns an array of sub contents.
 * @return {Array.<jsdocref.publishing.Content>} Sub contents.
 */
Sentence.prototype.getInlineContents = function() {
  return array.clone(this.contents_);
};


/**
 * Appends inline contents.  This method is chainable.
 * @param {Array.<jsdocref.publishing.Content>} contents Contents to append.
 * @return {jsdocref.publishing.Sentence} This instance.
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
 * @param {jsdocref.publishing.Content} content Content to append.
 * @return {jsdocref.publishing.Sentence} This instance.
 */
Sentence.prototype.appendInlineContent = function(content) {
  return this.appendInlineContentAt(content, this.contents_.length);
};


/**
 * Appends an inline content without a sentence by an index.  This method is
 * chainable.
 * @param {jsdocref.publishing.Content} content Content to append.
 * @param {number} index Index.
 * @return {jsdocref.publishing.Sentence} This instance.
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
 * @param {jsdocref.publishing.Content} content to remove.
 * @return {?jsdocref.publishing.Content} Content was removed, if any.
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
 * @return {?jsdocref.publishing.Content} Content was removed, if any.
 */
Sentence.prototype.removeInlineContentAt = function(index) {
  var removed = this.contents_.splice(index, 1)[0] || null;

  if (removed && removed.setParent) {
    removed.setParent(null);
  }

  return removed;
};


// Exports the constructor.
module.exports = Sentence;
