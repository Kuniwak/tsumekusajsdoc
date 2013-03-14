// This script licensed under the MIT.
// http://orgachem.mit-license.org


var basePath = '../../tsumekusa';
var tsumekusa = require(basePath);
var ContentArray = require(basePath + '/contents/ContentArray');
var BlockContent = require(basePath + '/contents/BlockContent');
var ListPublisher = require(basePath + '/publishing/ListPublisher');
var ListItemPublisher = require(basePath + '/publishing/ListItemPublisher');



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
  this.listeds_ = new ContentArray(this);
  this.type_ = opt_type || List.ListType.UNORDERED;
};
tsumekusa.inherits(List, BlockContent);


/**
 * List type numbers.
 * @enum {number}
 */
List.ListType = {
  /** Ordered list type. */
  ORDERED: 1,
  /** Unordered list type. */
  UNORDERED: 2
};


/**
 * Default content publisher.
 * @type {tsumekusa.publishing.ListPublisher}
 */
List.publisher = ListPublisher.getInstance();


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
  this.listeds_.addChildAt(content, index);
  return this;
};


/**
 * Removes the specified list content.
 * @param {tsumekusa.contents.BlockContent} content Content to remove.
 * @return {tsumekusa.contents.BlockContent} Removed content, if any.
 */
List.prototype.removeListItem = function(content) {
  return this.listeds_.removeChild(content);
};


/**
 * Removes the specified list content at the given 0-based index.
 * @param {number} index 0-based index.
 * @return {tsumekusa.contents.BlockContent} Removed content, if any.
 */
List.prototype.removeListItemAt = function(index) {
  return this.listeds_.removeChildAt(index);
};


/**
 * Returns listed contents.
 * @return {tsumekusa.contents.ContentArray.<tsumekusa.contents.BlockContent>}
 *     Listed contents.
 */
List.prototype.getListItems = function() {
  return this.listeds_;
};


/**
 * Returns a 0-based index of the specified list item.
 * @param {tsumekusa.contents.List.ListItem} item List item.
 * @return {number} Index of the specified definition.
 */
List.prototype.indexOfList = function(item) {
  return this.listeds_.getChildren().indexOf(item);
};



/**
 * A class for list items.
 * @param {tsumekusa.contents.ContentArray.<tsumekusa.contents.BlockContent>}
 *     blocks Block contents in the item.
 * @param {?tsumekusa.contents.List.ListType=} type List type of the item.
 * @constructor
 */
List.ListItem = function(blocks, opt_type) {
  BlockContent.call(this);
  this.type_ = opt_type;
  this.blocks_ = blocks;
};
tsumekusa.inherits(List.ListItem, BlockContent);


/**
 * Default content publisher.
 * @type {tsumekusa.publishing.ListItemPublisher}
 */
List.ListItem.publisher = ListItemPublisher.getInstance();


/**
 * List type of the item.
 * @type {tsumekusa.contents.List.ListType}
 * @private
 */
List.ListItem.prototype.type_;


/**
 * Paragraphs of the item..
 * @type {tsumekusa.contents.ContentArray.<tsumekusa.contents.BlockContent>}
 * @private
 */
List.ListItem.prototype.blocks_;


/**
 * Returns a list type.
 * @return {tsumekusa.contents.List.ListType} List type.
 */
List.ListItem.prototype.getListType = function() {
  return this.type_ || (this.type_ = this.getParent().getListType());
};


/**
 * Returns block contents as descriptions of the definition.
 * @return {tsumekusa.contents.ContentArray.<tsumekusa.contents.BlockContent>}
 *     List item.
 */
List.ListItem.prototype.getBlockContents = function() {
  return this.blocks_;
};


/**
 * Returns a 0-based index of the definition.
 * @return {number} Index of the definition.
 */
List.ListItem.prototype.getIndex = function() {
  // TODO: Caching index.
  var parent = this.getParent();
  return parent.indexOfList(this);
};


// Export the constructor
module.exports = List;
