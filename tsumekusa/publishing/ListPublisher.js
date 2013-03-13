// This script licensed under the MIT.
// http://orgachem.mit-license.org


var basePath = '../../tsumekusa';
var tsumekusa = require(basePath);
var array = require(basePath + '/array');
var Paragraph = require(basePath + '/contents/Paragraph');
var LineWrapper = require(basePath + '/publishing/LineWrapper');
var BlockContentPublisher = require(basePath +
    '/publishing/BlockContentPublisher');



/**
 * A class for list publisher for vim help.
 * @constructor
 * @implements {tsumekusa.publishing.ContentPublisher}
 */
var ListPublisher = function(textWidth) {
  BlockContentPublisher.call(this);
  this.textWidth_ = textWidth;
};
tsumekusa.inherits(ListPublisher, BlockContentPublisher);
tsumekusa.addSingletonGetter(ListPublisher);


/**
 * Mark symbols.
 * @enum {string}
 */
ListPublisher.MarkSymbol = {
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
 * Returns a symbol used in ordered lists.
 * @param {number} index Index of the list.
 * @return {string} Ordered list symbol.
 */
ListPublisher.prototype.getOrderedSymbol = function(index) {
  return index + 1 + ')';
};


/**
 * Returns a symbol used in unordered lists.
 * @return {string} Unordered list symbol.
 */
ListPublisher.prototype.getUnorderedSymbol = function() {
  return ListPublisher.MarkSymbol.BAR;
};


/**
 * Creates a list marker.
 * @param {number} index Index of a content to create the marker.
 * @param {tsumekusa.contents.List.ListType} listType List type.
 * @return {string} List marker.
 */
ListPublisher.prototype.createListMarker = function(index, listType) {
  var List = require(basePath + '/contents/List');
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
ListPublisher.prototype.getIndentLevel = function(content) {
  return BlockContentPublisher.prototype.getIndentLevel.call(this, content) + 2;
};


/** @override */
ListPublisher.prototype.publish = function(list) {
  var listType = list.getListType();
  var indentLv = this.getIndentLevel(list);
  var wrapper = LineWrapper.getInstance();
  var items = list.getListItems().getChildren();

  var publishedItems = items.map(function(item, index) {
    if (this.isListItem(item)) {
      var marker = this.createListMarker(index, item.getListType());
      var markerLen = marker.length;
      var headIndent = new ListPublisher.Indent(indentLv, markerLen);
      var afterIndent = new LineWrapper.Indent(indentLv + markerLen + 1);

      var publishedBlocks = [];
      var blocks = item.getBlockContents().getChildren();

      var head = blocks.shift();
      var headInlineContents = [marker].concat(head.getInlineContents());
      publishedBlocks[0] = wrapper.wrap(headInlineContents, this.textWidth_,
          headIndent);

      blocks.forEach(function(block, idx) {
        publishedBlocks[idx + 1] = wrapper.wrap(block.getInlineContents(),
             this.textWidth_, afterIndent);
      }, this);

      return publishedBlocks.join('\n');
    }
    else {
      return this.publish(item);
    }
  }, this);


  return publishedItems.join('\n\n');
};


/**
 * Whether a content is like {@link tsumekusa.contents.Paragraph}.
 * @param {*} content Content to check.
 * @return {boolean} Whether a content is like Paragraph.
 * @protected
 */
ListPublisher.prototype.isListItem = function(content) {
  var List = require(basePath + '/contents/List');
  return content instanceof List.ListItem;
};



/**
 * A class for list indent.
 * @param {number} indent Indent width of a list.
 * @param {number} markerWidth List marker width.
 * @constructor
 * @extends {tsumekusa.publishing.LineWrapper}
 */
ListPublisher.Indent = function(indent, markerWidth) {
  LineWrapper.Indent.call(this, indent);
  this.markerWidth_ = markerWidth + 1; // Add white space width.
};
tsumekusa.inherits(ListPublisher.Indent, LineWrapper.Indent);


/** @override */
ListPublisher.Indent.prototype.getIndentWidth = function(
    lineIdx) {
  var width = LineWrapper.Indent.prototype.getIndentWidth.call(this, lineIdx);
  return lineIdx > 0 ? width + this.markerWidth_ : width;
};


// Export the constructor
module.exports = ListPublisher;
