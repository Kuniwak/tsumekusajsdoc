// This script licensed under the MIT.
// http://orgachem.mit-license.org


var tsumekusa = require('../../tsumekusa');
var ContentArray = require('./ContentArray');
var BlockContent = require('./BlockContent');
var VimHelpListPublisher = require(
    '../publishing/vimhelp/VimHelpListPublisher');



/**
 * A class for ordered/unordered list contents.
 * Use {@link tsumekusa.contents.DefinitionList} if you need.
 * @param {?tsumekusa.contents.List.ListType=} opt_type List type.  Default
 *     type is unordered list.
 * @constructor
 * @extends {tsumekusa.contents.BlockContent}
 */
var List = function(opt_type) {
  BlockContent.call(this);
  this.listeds_ = new ContentArray();
  this.type_ = opt_type || List.ListType.UNORDERED;
};
tsumekusa.inherits(List, BlockContent);


/**
 * List type numbers.
 * @enum {number}
 */
List.ListType = {
  /** Ordered list type. */
  ORDERED: 0,
  /** Unordered list type. */
  UNORDERED: 1
};


/**
 * Default content publisher.
 * @type {tsumekusa.publishing.ContentPublisher}
 */
List.publisher = VimHelpListPublisher.getInstance();


/**
 * Listed contents.
 * @type {tsumekusa.contents.ContentArray.<tsumekusa.contents.BlockContent>}
 * @private
 */
List.prototype.listeds_ = null;


/**
 * List type.
 * @type {tsumekusa.contents.List.ListType}
 * @private
 */
List.prototype.type_;


/**
 * Returns a list type.
 * @return {tsumekusa.contents.List.ListType} List type.
 */
List.prototype.getListType = function() {
  return this.type_;
};


/**
 * Adds the specified list content to the last.  The method is chainable.
 * @param {tsumekusa.contents.BlockContent} content Content to add.
 * @return {tsumekusa.contents.List} This instance.
 */
List.prototype.addListItem = function(content) {
  contents.setParent(content);
  this.listeds_.addChild(content);
  return this;
};


/**
 * Adds the specified list content to the given 0-based index.  The method is
 * chainable.
 * @param {tsumekusa.contents.BlockContent} content Content to add.
 * @param {number} index 0-based index.
 * @return {tsumekusa.contents.List} This instance.
 */
List.prototype.addListItemAt = function(content, index) {
  contents.setParent(content);
  this.listeds_.addChildAt(content, index);
  return this;
};


/**
 * Removes the specified list content.
 * @param {tsumekusa.contents.BlockContent} content Content to remove.
 * @return {tsumekusa.contents.BlockContent} Removed content, if any.
 */
List.prototype.removeListItem = function(content) {
  var removed = this.listeds_.removeChild(content);
  if (removed) {
    removed.setParent(null);
  }
  return removed;
};


/**
 * Removes the specified list content at the given 0-based index.
 * @param {number} index 0-based index.
 * @return {tsumekusa.contents.BlockContent} Removed content, if any.
 */
List.prototype.removeListItemAt = function(index) {
  var removed = this.listeds_.removeChildAt(index);
  if (removed) {
    removed.setParent(null);
  }
  return removed;
};


/**
 * Returns listed contents.
 * @return {tsumekusa.contents.ContentArray.<tsumekusa.contents.BlockContent>}
 *     Listed contents.
 */
List.prototype.getListedContents = function() {
  return this.listeds_;
};



/**
 * A class for list item.
 * @param {tsumekusa.contents.List.ListType} type List type of the item.
 * @param {tsumekusa.contents.Paragraph} paragraph Paragraph of the item.
 * @constructor
 */
List.ListItem = function(type, paragraph) {
  BlockContent.call(this);
  this.type_ = type;
  this.paragraph_ = paragraph;
};
tsumekusa.inherits(List.ListItem, BlockContent);


/**
 * List type of the item.
 * @type {tsumekusa.contents.List.ListType}
 * @private
 */
List.ListItem.prototype.type_;


/**
 * List type of the item.
 * @type {tsumekusa.contents.Paragraph}
 * @private
 */
List.ListItem.prototype.paragraph_;


/**
 * Returns a list type of the item.
 * @return {tsumekusa.contents.List.ListType} List type of the item.
 */
List.ListItem.prototype.getListType = function() {
  return this.type_;
};


/**
 * Returns a Paragraph of the item.
 * @return {tsumekusa.contents.Paragraph} Paragraph of the item.
 */
List.ListItem.prototype.getParagraph = function() {
  return this.paragraph_;
};


// Export the constructor
module.exports = List;
