// This script licensed under the MIT.
// http://orgachem.mit-license.org


var basePath = '../../tsumekusa';
var WordWrapper = require(basePath + '/publishing/WordWrapper');
var Indent = require(basePath + '/publishing/Indent');



/**
 * An abstract class for block element publisher.
 * @constructor
 * @implements {tsumekusa.publishing.IElementPublisher}
 */
var BlockElementPublisher = function() {};


/**
 * Display width.  Usually the property is used in a console.
 * @type {number}
 * @private
 */
BlockElementPublisher.prototype.dispWidth_ = 80;


/**
 * Sets a display width.  The setter mostly used in a CUI environment.
 * @param {number} width Display width.
 */
BlockElementPublisher.prototype.setDisplayWidth = function(width) {
  this.dispWidth_ = width;
};


/**
 * Returns a display width.
 * @return {number} Display width.
 */
BlockElementPublisher.prototype.getDisplayWidth = function() {
  return this.dispWidth_;
};


/**
 * Returns a publisher of an element as the parent of the given element if any.
 * @param {tsumekusa.dom.BlockElement} element Block element.
 * @return {tsumekusa.dom.BlockElementPublisher} Publisher of the parent
 *     element. null if the given element has no parent.
 */
BlockElementPublisher.prototype.getParentPublisher = function(element) {
  var publisher = null;
  var parent;

  if (parent = element.getParent()) {
    publisher = parent.getPublisher();
    if (!publisher) {
      throw Error('Illegal publisher was given: ' + publisher);
    }
  }

  return publisher;
};


/**
 * Returns an indent width of a element as a parent of the element.
 * @param {tsumekusa.dom.BlockElement} element Block element to get an
 *     indent width.
 * @return {number} Indent width from the parent.
 * @protected
 */
BlockElementPublisher.prototype.getIndentWidthFromParent = function(element) {
  var publisher, indentWidth;

  if (publisher = this.getParentPublisher(element)) {
    indentWidth = publisher.getIndentWidthForChild(element.getParent());
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
 * Returns an indent width of the element.  Override the methods if you need to
 * change an indentation width of the element.
 * @param {tsumekusa.dom.BlockElement} element Block element to get an
 *     indent width.
 * @return {number} Indent width of the element.
 */
BlockElementPublisher.prototype.getIndentWidth = function(element) {
  var indentWidth = this.getIndentWidthFromParent(element);
  return indentWidth;
};


/**
 * Returns an indent width of an element as the children of element.  Override
 * the methods if you need to change an indentation width for the children.
 * @param {tsumekusa.dom.BlockElement} element Block element to get an
 *     indent width for the children.
 * @return {number} Indent width for the children.
 */
BlockElementPublisher.prototype.getIndentWidthForChild = function(element) {
  // TODO: Become to be able to change indentations for each child.
  return this.getIndentWidth(element);
};


/**
 * Returns an object for indentation.  Override the method if you need to change
 * an indentation.  In default, indent by a width from {@link #getIndentWidth}.
 * @param {tsumekusa.dom.BlockElement} element Block element to get an
 *     object for indentation.
 * @return {tsumekusa.publishing.Indent} Created object for
 *     indentation.
 * @protected
 */
BlockElementPublisher.prototype.getIndent = function(element) {
  return new Indent(this.getIndentWidth(element));
};


/**
 * Returns a word wrapper.  Override the method if you want to change
 * a strategy to wrap words.
 * @param {tsumekusa.dom.BlockElement} element Block element to get a word
 *     wrapper.
 * @return {tsumekusa.publishing.Indent} Created object for
 *     indentation.
 * @protected
 */
BlockElementPublisher.prototype.getWordWrapper = function(element) {
  return new WordWrapper(this.getDisplayWidth(), this.getIndent(element));
};


// Exports the constructor
module.exports = BlockElementPublisher;
