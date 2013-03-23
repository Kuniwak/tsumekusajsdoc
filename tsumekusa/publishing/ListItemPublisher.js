// This script licensed under the MIT.
// http://orgachem.mit-license.org


var basePath = '../../tsumekusa';
var tsumekusa = require(basePath);
var array = require(basePath + '/array');
var string = require(basePath + '/string');
var Paragraph = require(basePath + '/dom/Paragraph');
var WordWrapper = require(basePath + '/publishing/WordWrapper');
var Indent = require(basePath + '/publishing/Indent');
var BlockElementPublisher = require(basePath +
    '/publishing/BlockElementPublisher');



/**
 * A class for list publisher for vim help.
 * @constructor
 * @implements {tsumekusa.publishing.IElementPublisher}
 */
var ListItemPublisher = function() {
  BlockElementPublisher.call(this);
};
tsumekusa.inherits(ListItemPublisher, BlockElementPublisher);
tsumekusa.addSingletonGetter(ListItemPublisher);


/**
 * Mark symbols.
 * @enum {string}
 */
ListItemPublisher.MarkSymbol = {
  /** Bar marker symbol. */
  BAR: '-',
  /** Circle marker symbol. */
  CIRCLE: 'o',
  /** Cross marker symbol. */
  CROSS: 'x',
  /** Star marker symbol. */
  STAR: '*'
};


/**
 * Indent width for children.
 * @const
 * @type {number}
 */
ListItemPublisher.INDENT_WIDTH_FOR_CHILD = 2;


/** @override */
ListItemPublisher.prototype.getIndentWidth = function(elem) {
  // Ignore an indent width by parent#getIndentWidthForChild
  var parentList = elem.getParentList();
  return parentList.getPublisher().getIndentWidth(parentList);
};


/** @override */
ListItemPublisher.prototype.getIndentWidthForChild = function(elem) {
  return this.getIndentWidth(elem) + ListItemPublisher.INDENT_WIDTH_FOR_CHILD;
};


/**
 * Returns a symbol used in ordered lists.
 * @param {number} index Index of the list.
 * @return {string} Ordered list symbol.
 */
ListItemPublisher.prototype.getOrderedSymbol = function(index) {
  return index + 1 + ')';
};


/**
 * Returns a symbol used in unordered lists.
 * @return {string} Unordered list symbol.
 */
ListItemPublisher.prototype.getUnorderedSymbol = function() {
  return ListItemPublisher.MarkSymbol.BAR;
};


/**
 * Creates a list marker.
 * @param {number} index Index of a content to create the marker.
 * @param {tsumekusa.dom.List.ListType} listType List type.
 * @return {string} List marker.
 */
ListItemPublisher.prototype.createListMarker = function(index, listType) {
  var List = require(basePath + '/dom/List');
  switch (listType) {
    case List.ListType.UNORDERED:
      return this.getUnorderedSymbol();
    case List.ListType.ORDERED:
      return this.getOrderedSymbol(index);
    default:
      throw Error('Illegal list type: ' + listType);
  }
};


/** @override */
ListItemPublisher.prototype.publish = function(item) {
  var index = item.getIndex();
  var marker = this.createListMarker(index, item.getListType());

  var output = item.getBlockElements().publish();

  if (output) {
    var indentWidthForChild = this.getIndentWidthForChild(item);
    var whites = string.repeat(' ', this.getIndentWidth(item));

    // Add a marker and a white space and a head block that was removed a first
    // indent.
    output = whites.concat(marker, ' ', output.slice(indentWidthForChild));
  }

  return output;
};


// Export the constructor
module.exports = ListItemPublisher;
