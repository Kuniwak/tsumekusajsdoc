// This script licensed under the MIT.
// http://orgachem.mit-license.org


var basePath = '../../tsumekusa';
var tsumekusa = require(basePath);
var BlockContentPublisher = require(basePath +
    '/publishing/BlockContentPublisher');
var WordWrapper = require(basePath + '/publishing/WordWrapper');



/**
 * A singleton class for definition item publishers.
 * @constructor
 * @extends {tsumekusa.publishing.BlockContentPublisher}
 */
var DefinitionPublisher = function() {
  BlockContentPublisher.call(this);
};
tsumekusa.inherits(DefinitionPublisher, BlockContentPublisher);
tsumekusa.addSingletonGetter(DefinitionPublisher);


/**
 * Mark symbols.
 * @enum {string}
 */
DefinitionPublisher.MarkSymbol = {
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
 * Default indent width of a no marker definition list.
 * @type {number}
 */
DefinitionPublisher.NO_MARKER_INDENT_WIDTH = 2;


/**
 * Creates a list marker.
 * @param {number} index Index of a content to create the marker.
 * @param {tsumekusa.contents.DefinitionList.ListType} listType List type.
 * @return {string} List marker.
 */
DefinitionPublisher.prototype.createListMarker = function(index, listType) {
  var DefinitionList = require(basePath + '/contents/DefinitionList');
  switch (listType) {
    case DefinitionList.ListType.NO_MARKER:
      return null;
    case DefinitionList.ListType.UNORDERED:
      return this.getUnorderedSymbol();
    case DefinitionList.ListType.ORDERED:
      return this.getOrderedSymbol(index);
    default:
      throw Error('Illegal list type: ' + listType);
  }
};


/**
 * Returns a symbol used in ordered lists.
 * @param {number} index Index of the list.
 * @return {string} Ordered list symbol.
 */
DefinitionPublisher.prototype.getOrderedSymbol = function(index) {
  return index + ')';
};


/**
 * Returns a symbol used in unordered lists.
 * @return {string} Unordered list symbol.
 */
DefinitionPublisher.prototype.getUnorderedSymbol = function() {
  return DefinitionPublisher.MarkSymbol.BAR;
};


/**
 * Returns an object for terms indentation.  Override the method if you want to
 * change a strategy to indent.
 * @param {tsumekusa.contents.DefinitionList.Definition} def Definition.
 * @param {string} marker Marker string.
 * @return {tsumekusa.publishing.WordWrapper.Indent} Created object for
 *     indentation.
 * @protected
 */
DefinitionPublisher.prototype.getIndentForTerms = function(def, marker) {
  var indentWidth = marker ? marker.length + /* a white space width */ 1 : 0;
  return new WordWrapper.Indent(this.getIndentWidth(def), indentWidth);
};


/**
 * Returns an object for descriptions indentation.  Override the method if you
 * want to change a strategy to indent.
 * @param {tsumekusa.contents.DefinitionList.Definition} def Definition.
 * @param {string} marker Marker string.
 * @return {tsumekusa.publishing.WordWrapper.Indent} Created object for
 *     indentation.
 * @protected
 */
DefinitionPublisher.prototype.getIndentForDescriptions = function(def, marker) {
  var indentWidth = marker ? marker.length + /* a white space width */ 1 :
      DefinitionPublisher.NO_MARKER_INDENT_WIDTH;
  return new WordWrapper.Indent(this.getIndentWidth(def) + indentWidth);
};


/** @override */
DefinitionPublisher.prototype.publish = function(content) {
  var inlineContentsInTerm = content.getTerm().getInlineContents();
  var blockContentsInDesc = content.getDescriptions().getChildren();
  var listType = content.getListType();
  var dispWidth = this.getDisplayWidth();
  var index = content.getIndex();
  var marker = this.createListMarker(index, listType);

  if (marker) {
    // Set a marker to the head if the list type is not NO_MARKER
    inlineContentsInTerm = [marker].concat(inlineContentsInTerm);
  }

  var termWrapper = new WordWrapper(dispWidth, this.getIndentForTerms(content,
      marker));
  var descWrapper = new WordWrapper(dispWidth, this.getIndentForDescriptions(
      content, marker));

  var term = termWrapper.wrap(inlineContentsInTerm);
  var desc = blockContentsInDesc.map(function(desc) {
    return descWrapper.wrap(desc.getInlineContents());
  }).join('\n');

  return [term, desc].join('\n');
};


// Export the constructor
module.exports = DefinitionPublisher;
