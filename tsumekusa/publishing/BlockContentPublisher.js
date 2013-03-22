// This script licensed under the MIT.
// http://orgachem.mit-license.org


var basePath = '../../tsumekusa';
var WordWrapper = require(basePath + '/publishing/WordWrapper');
var Indent = require(basePath + '/publishing/Indent');



/**
 * An abstract class for block content publisher.
 * @constructor
 * @implements {tsumekusa.publishing.IContentPublisher}
 */
var BlockContentPublisher = function() {};


/**
 * Display width.  Usually the property is used in a console.
 * @type {number}
 * @private
 */
BlockContentPublisher.prototype.dispWidth_ = 80;


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
 * Returns an indent width of a content as a parent of the content.
 * @param {tsumekusa.dom.BlockContent} content Block content to get an
 *     indent width.
 * @return {number} Indent width.
 * @protected
 */
BlockContentPublisher.prototype.getParentIndentWidth = function(content) {
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

  return indentWidth;
};


/**
 * Returns an indent width of the content.  Override the methods if you need to
 * change an indentation width.
 * @param {tsumekusa.dom.BlockContent} content Block content to get an
 *     indent width.
 * @return {number} Indent width.
 */
BlockContentPublisher.prototype.getIndentWidth = function(content) {
  var indentWidth = this.getParentIndentWidth(content);
  return indentWidth;
};


/**
 * Returns an object for indentation.  Override the method if you need to change
 * an indentation.  In default, indent by a width from {@link #getIndentWidth}.
 * @param {tsumekusa.dom.BlockContent} content Block content to get an
 *     object for indentation.
 * @return {tsumekusa.publishing.Indent} Created object for
 *     indentation.
 * @protected
 */
BlockContentPublisher.prototype.getIndent = function(content) {
  return new Indent(this.getIndentWidth(content));
};


/**
 * Returns a word wrapper.  Override the method if you want to change
 * a strategy to wrap words.
 * @param {tsumekusa.dom.BlockContent} content Block content to get a word
 *     wrapper.
 * @return {tsumekusa.publishing.Indent} Created object for
 *     indentation.
 * @protected
 */
BlockContentPublisher.prototype.getWordWrapper = function(content) {
  return new WordWrapper(this.getDisplayWidth(), this.getIndent(content));
};


// Exports the constructor
module.exports = BlockContentPublisher;
