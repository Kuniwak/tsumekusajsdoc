// This script licensed under the MIT.
// http://orgachem.mit-license.org



/**
 * An abstract class for block content publisher.
 * @constructor
 * @implements {tsumekusa.publishing.IContentPublisher}
 */
var BlockContentPublisher = function() {};


/**
 * Display width.  Usually the property is used in a console.
 * @type {?number}
 * @private
 */
BlockContentPublisher.prototype.dispWidth_ = Number.MAX_VALUE;


/**
 * Sets a display width.  The setter mostly used in a CUI environment.
 * @param {number} width Display width.
 */
BlockContentPublisher.prototype.setDisplayWidth = function(width) {
  this.dispWidth_ = width;
};


/**
 * Returns a display width.
 * @return {number} Display width.
 */
BlockContentPublisher.prototype.getDisplayWidth = function() {
  return this.dispWidth_;
};


/**
 * Returns an indent width of the content.
 * @param {tsumekusa.contents.BlockContent} content Block content to get an
 *     indent width.
 * @return {number} Indent width.
 */
BlockContentPublisher.prototype.getIndentWidth = function(content) {
  var parent, indentWidth;
  if (parent = content.getParent()) {
    var publisher = parent.getPublisher();
    if (!publisher) {
      throw Error('Illegal publisher was given: ' + publisher);
    }
    indentWidth = publisher.getIndentWidth(parent);
  }
  else {
    indentWidth = 0;
  }

  if (indentWidth < 0) {
    throw Error('Indent width have to be greater than 0, but come: ' +
        indentWidth);
  }

  return this.getIndentWidthInternal(content, indentWidth);
};


/**
 * Returns an indent width of the content.
 * @param {tsumekusa.contents.BlockContent} content Block content to get an
 *     indent width.
 * @param {number} width Indent width of a content as a parent of the {@code
 *     content}.  It is 0, if the parent is not defined.
 * @return {number} Indent width of the {@code content}.
 * @protected
 */
BlockContentPublisher.prototype.getIndentWidthInternal = function(content,
    width) {
  return width;
};


/**
 * Returns an object for indentation.  Override the method if you want to change
 * a strategy to indent.  In defaultm constant width indentation by {@link
 * #getIndentWidth}.
 * @param {tsumekusa.contents.BlockContent} content Block content to get an
 *     object for indentation.
 * @return {tsumekusa.publishing.WordWrapper.Indent} Created object for
 *     indentation.
 * @protected
 */
BlockContentPublisher.prototype.getIndent = function(content) {
  return new WordWrapper.Indent(this.getIndentWidth(content));
};


/**
 * Returns a word wrapper.  Override the method if you want to change
 * a strategy to wrap words.
 * @param {tsumekusa.contents.BlockContent} content Block content to get a word
 *     wrapper.
 * @return {tsumekusa.publishing.WordWrapper.Indent} Created object for
 *     indentation.
 * @protected
 */
BlockContentPublisher.prototype.getWordWrapper = function(content) {
  return new WordWrapper(this.getDisplatWidth(), this.getIndent(content));
};


// Exports the constructor
module.exports = BlockContentPublisher;
