// This script licensed under the MIT.
// http://orgachem.mit-license.org


var basePath = '../../tsumekusa';
var tsumekusa = require(basePath);
var ElementArray = require(basePath + '/dom/ElementArray');
var BlockElement = require(basePath + '/dom/BlockElement');



/**
 * A class for ordered/unordered list elements.
 * Use {@link tsumekusa.dom.DefinitionList} if you need.
 * @param {?tsumekusa.dom.List.ListType=} opt_type List type.  Default
 *     type is unordered list.
 * @constructor
 * @extends {tsumekusa.dom.BlockElement}
 */
var List = function(opt_type) {
  BlockElement.call(this);
  this.listeds_ = new ElementArray(this);
  this.type_ = opt_type || List.ListType.UNORDERED;
};
tsumekusa.inherits(List, BlockElement);


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
 * Default element publisher.
 * @type {tsumekusa.publishing.ListPublisher}
 */
List.publisher = null;


/**
 * Listed elements.
 * @type {tsumekusa.dom.ElementArray.<tsumekusa.dom.BlockElement>}
 * @private
 */
List.prototype.listeds_ = null;


/**
 * List type.
 * @type {tsumekusa.dom.List.ListType}
 * @private
 */
List.prototype.type_;


/**
 * Returns a list type.
 * @return {tsumekusa.dom.List.ListType} List type.
 */
List.prototype.getListType = function() {
  return this.type_;
};


/**
 * Creates a list item.
 * @param {tsumekusa.dom.ElementArray.<tsumekusa.dom.BlockElement>}
 *     blocks Block elements in the item.
 * @param {?tsumekusa.dom.List.ListType=} opt_type List type of the item.  Use
 *     a list type of the parent list, if falsey.
 * @return {tsumekusa.dom.List.ListItem} Created list item.
 * @protected
 */
List.prototype.createListItem = function(elemArr, opt_type) {
  return new List.ListItem(elemArr, opt_type);
};


/**
 * Creates a list item if the given element is not a list.
 * @param {tsumekusa.dom.ElementArray.<tsumekusa.dom.BlockElement>|
 * tsumekusa.dom.List} arg Block elements or list.
 * @param {?tsumekusa.dom.List.ListType=} opt_type List type of the item.  Use
 *     a list type of the parent list, if falsey.
 * @return {tsumekusa.dom.List.ListItem|tsumekusa.dom.List} Created list item.
 * @protected
 */
List.prototype.createListItemIfNecessary = function(arg, opt_type) {
  if (arg instanceof List) {
    return arg;
  }
  else {
    return this.createListItem(arg, opt_type);
  }
};


/**
 * Adds the specified list item to the last.  The method is chainable.
 * @param {tsumekusa.dom.ElementArray.<tsumekusa.dom.BlockElement>|
 * tsumekusa.dom.List} arg Block elements or list.
 * @param {?tsumekusa.dom.List.ListType=} opt_type List type of the item.  Use
 *     a list type of the parent list, if falsey.
 * @return {tsumekusa.dom.List} This instance.
 */
List.prototype.addListItem = function(arg, opt_type) {
  var li = this.createListItemIfNecessary(arg, opt_type);
  this.listeds_.addChild(li);
  return this;
};


/**
 * Adds the specified list item to the given 0-based index.  The method is
 * chainable.
 * @param {tsumekusa.dom.ElementArray.<tsumekusa.dom.BlockElement>|
 * tsumekusa.dom.List} arg Block elements or list.
 * @param {?tsumekusa.dom.List.ListType=} opt_type List type of the item.  Use
 *     a list type of the parent list, if falsey.
 * @param {number} index 0-based index.
 * @return {tsumekusa.dom.List} This instance.
 */
List.prototype.addListItemAt = function(element, index) {
  var li = this.createListItemIfNecessary(arg, opt_type);
  this.listeds_.addChildAt(li, index);
  return this;
};


/**
 * Removes the specified list element.
 * @param {tsumekusa.dom.BlockElement} element Element to remove.
 * @return {tsumekusa.dom.BlockElement} Removed element, if any.
 */
List.prototype.removeListItem = function(element) {
  return this.listeds_.removeChild(element);
};


/**
 * Removes the specified list element at the given 0-based index.
 * @param {number} index 0-based index.
 * @return {tsumekusa.dom.BlockElement} Removed element, if any.
 */
List.prototype.removeListItemAt = function(index) {
  return this.listeds_.removeChildAt(index);
};


/**
 * Returns listed elements.
 * @return {tsumekusa.dom.ElementArray.<tsumekusa.dom.BlockElement>}
 *     Listed elements.
 */
List.prototype.getListItems = function() {
  return this.listeds_;
};



// List.ListItem {{{
/**
 * A class for list items.
 * @param {tsumekusa.dom.ElementArray.<tsumekusa.dom.BlockElement>}
 *     blocks Block elements in the item.
 * @param {?tsumekusa.dom.List.ListType=} opt_type List type of the item.  Use
 *     a list type of the parent list, if falsey.
 * @constructor
 */
List.ListItem = function(blocks, opt_type) {
  BlockElement.call(this);
  this.type_ = opt_type;
  this.setBlockElements(blocks);
};
tsumekusa.inherits(List.ListItem, BlockElement);


/**
 * Default element publisher.
 * @type {tsumekusa.publishing.ListItemPublisher}
 */
List.ListItem.publisher = null;


/**
 * List type of the item.
 * @type {tsumekusa.dom.List.ListType}
 * @private
 */
List.ListItem.prototype.type_;


/**
 * Paragraphs of the item..
 * @type {tsumekusa.dom.ElementArray.<tsumekusa.dom.BlockElement>}
 * @private
 */
List.ListItem.prototype.blocks_;


/** @override */
List.ListItem.prototype.getParent = function() {
  var parent;
  if (parent = BlockElement.prototype.getParent.call(this)) {
    return parent;
  }
  else {
    throw Error('List item have to be in an element array, but come: ' +
        parent);
  }
};


/**
 * Returns a list as the parent of the list item.
 * @return {tsumekusa.dom.List} Parent list.
 */
List.ListItem.prototype.getParentList = function() {
  var elemArr;
  if (elemArr = this.getParent()) {
    return elemArr.getParent();
  }
  else {
    throw Error('List item have to be in a list, but come: ' + parent);
  }
};


/**
 * Returns a list type.
 * @return {tsumekusa.dom.List.ListType} List type.
 */
List.ListItem.prototype.getListType = function() {
  var parentList = this.getParentList();
  return this.type_ || (this.type_ = parentList.getListType());
};


/**
 * Sets block elements.  The method is chainable.
 * @param {tsumekusa.dom.ElementArray.<tsumekusa.dom.BlockElement>} blocks
 *   Block elements to set.
 * @return {tsumekusa.dom.List.ListItem} This instance.
 * @protected
 */
List.ListItem.prototype.setBlockElements = function(blocks) {
  this.blocks_ = blocks;
  blocks.setParent(this);
  return this;
};


/**
 * Returns block elements as descriptions of the definition.
 * @return {tsumekusa.dom.ElementArray.<tsumekusa.dom.BlockElement>}
 *     List item.
 */
List.ListItem.prototype.getBlockElements = function() {
  return this.blocks_;
};


/**
 * Returns a 0-based index of the definition.
 * @return {number} Index of the definition.
 */
List.ListItem.prototype.getIndex = function() {
  // TODO: Caching index.
  var parentElemArr = this.getParent();
  var index = 0;
  var err = Error();

  try {
    parentElemArr.getChildren().forEach(function(li) {
      if (li === this) {
        throw err;
      }
      else if (li instanceof List.ListItem) {
        ++index;
      }
    }, this);
  }
  catch (e) {
    if (e !== err) {
      throw e;
    }
  }

  return index;
};
//}}}


// Export the constructor
module.exports = List;
