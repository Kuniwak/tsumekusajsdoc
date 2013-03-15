// This script licensed under the MIT.
// http://orgachem.mit-license.org


var basePath = '../../tsumekusa';
var tsumekusa = require(basePath);
var array = require(basePath + '/array');
var Paragraph = require(basePath + '/contents/Paragraph');
var WordWrapper = require(basePath + '/publishing/WordWrapper');
var BlockContentPublisher = require(basePath +
    '/publishing/BlockContentPublisher');



/**
 * A class for list publisher for vim help.
 * @constructor
 * @implements {tsumekusa.publishing.IContentPublisher}
 */
var ListItemPublisher = function() {
  BlockContentPublisher.call(this);
};
tsumekusa.inherits(ListItemPublisher, BlockContentPublisher);
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
 * @param {tsumekusa.contents.List.ListType} listType List type.
 * @return {string} List marker.
 */
ListItemPublisher.prototype.createListMarker = function(index, listType) {
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


/**
 * Returns an object for a list item indentation.  Override the method if you
 * want to change a strategy to indent.
 * <pre>
 * --| 1st line indent
 * ----| 2nd line indent
 *
 *   o First para-
 *     graph...
 *
 *     Second par-
 *     agraph...
 * </pre>
 * @param {tsumekusa.contents.DefinitionList.Definition} item List item.
 * @param {string} marker Marker string.
 * @return {tsumekusa.publishing.WordWrapper.Indent} Created object for
 *     indentation.
 * @protected
 */
ListItemPublisher.prototype.getHeadIndent = function(item, marker) {
  var indentWidth = marker.length +
      /* a white space is between marker and a sentence*/ 1;
  return new ListItemPublisher.Indent(this.getIndentWidth(item), indentWidth);
};


/**
 * Returns an object for list item on no head indentation.  Override the method
 * if you want to change a strategy to indent.  See {@link #getHeadIndent}.
 * @param {tsumekusa.contents.DefinitionList.Definition} item List item.
 * @param {string} marker Marker string.
 * @return {tsumekusa.publishing.WordWrapper.Indent} Created object for
 *     indentation.
 * @protected
 */
ListItemPublisher.prototype.getNonHeadIndent = function(item, marker) {
  var indentWidth = marker.length +
      /* a white space is between marker and a sentence*/ 1;
  return new WordWrapper.Indent(this.getIndentWidth(item) + indentWidth);
};


/** @override */
ListItemPublisher.prototype.publish = function(item) {
  var index = item.getIndex();
  var marker = this.createListMarker(index, item.getListType());
  var dispWidth = this.getDisplayWidth();

  var headIndent = this.getHeadIndent(item, marker);
  var nonHeadIndent = this.getNonHeadIndent(item, marker);
  var headWrapper = new WordWrapper(dispWidth, headIndent);
  var nonHeadWrapper = new WordWrapper(dispWidth, nonHeadIndent);

  var blocks = item.getBlockContents().getChildren();
  var headBlock = blocks.shift();
  var headInlineContents = [marker].concat(headBlock.getInlineContents());

  var output = [headWrapper.wrap(headInlineContents)];

  output.push.apply(output, blocks.map(function(block) {
    return nonHeadWrapper.wrap(block.getInlineContents());
  }));

  return output.join('\n');
};



/**
 * A class for list indent.
 * @param {number} indent Indent width of a list.
 * @param {number} markerWidth List marker width.
 * @constructor
 * @extends {tsumekusa.publishing.WordWrapper}
 */
ListItemPublisher.Indent = function(indent, markerWidth) {
  WordWrapper.Indent.call(this, indent);
  this.markerWidth_ = markerWidth; // Add white space width.
};
tsumekusa.inherits(ListItemPublisher.Indent, WordWrapper.Indent);


/** @override */
ListItemPublisher.Indent.prototype.getIndentWidth = function(
    lineIdx) {
  var indentWidth = WordWrapper.Indent.prototype.getIndentWidth.call(this,
      lineIdx);
  return lineIdx > 0 ? indentWidth + this.markerWidth_ : indentWidth;
};


// Export the constructor
module.exports = ListItemPublisher;
