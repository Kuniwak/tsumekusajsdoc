// This script licensed under the MIT.
// http://orgachem.mit-license.org


var basePath = '../../tsumekusa';
var tsumekusa = require(basePath);
var ElementArray = require(basePath + '/dom/ElementArray');
var BlockElement = require(basePath + '/dom/BlockElement');



/**
 * A class for sentence.
 * @param {tsumekusa.dom.InlineElement|string} var_args Inline contents to
 *     append.
 * @constructor
 * @extends {tsumekusa.dom.BlockElement}
 */
var Paragraph = function(var_args) {
  BlockElement.call(this);

  this.inlineElements_ = new ElementArray();

  if (var_args) {
    this.addInlineElements(Array.prototype.slice.call(arguments, 0));
  }
};
tsumekusa.inherits(Paragraph, BlockElement);


/**
 * Default content publisher.
 * @type {tsumekusa.publishing.ParagraphPublisher}
 */
Paragraph.publisher = null;


/**
 * Inline contents in the paragraph.
 * @type {tsumekusa.dom.ElementArray.<tsumekusa.dom.InlineElement|
 * string>}
 * @private
 */
Paragraph.prototype.inlineElements_;


/**
 * Returns inline contents are in the paragraph.
 * @return {Array.<tsumekusa.dom.InlineElement|string>} Inline contents.
 */
Paragraph.prototype.getInlineElements = function() {
  return this.inlineElements_.getChildren();
};


/**
 * Adds inline contents at the last.
 * @param {Array.<tsumekusa.dom.InlineElement|string>} contents Inline
 *     contents or strings to add.
 * @return {tsumekusa.dom.Paragraph} This instance.
 */
Paragraph.prototype.addInlineElements = function(contents) {
  contents.forEach(function(content) {
    this.addInlineElement(content);
  }, this);
  return this;
};


/**
 * Adds an inline content at the last.
 * @param {tsumekusa.dom.InlineElement|string} content Inline content or
 *     string to add.
 * @return {tsumekusa.dom.Paragraph} This instance.
 */
Paragraph.prototype.addInlineElement = function(content) {
  this.inlineElements_.addChild(content);
  return this;
};


/**
 * Adds an inline content at the given 0-based index.
 * @param {tsumekusa.dom.InlineElement|string} content Inline content or
 *     string to add.
 * @param {number} index 0-based index.
 * @return {tsumekusa.dom.Paragraph} This instance.
 */
Paragraph.prototype.addInlineElementAt = function(content, index) {
  this.inlineElements_.addChildAt(content, index);
  return this;
};


/**
 * Removes the specified inline content from the paragraph.
 * @param {tsumekusa.dom.InlineElement|string} content Inline content or
 *     string to remove.
 * @return {tsumekusa.dom.InlineElement|string} Removed inline content, if
 *     any.
 */
Paragraph.prototype.removeInlineElement = function(content) {
  return this.inlineElements_.removeChild(content);
};


/**
 * Removes the specified inline content at the given 0-based index from the
 * paragraph.
 * @param {number} index 0-based index.
 * @return {tsumekusa.dom.InlineElement|string} Removed inline content, if
 *     any.
 */
Paragraph.prototype.removeInlineElementAt = function(index) {
  return this.inlineElements_.removeChildAt(index);
};


// Exports the constructor.
module.exports = Paragraph;
