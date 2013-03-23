// This script licensed under the MIT.
// http://orgachem.mit-license.org


var basePath = '../../tsumekusa';
var tsumekusa = require(basePath);
var BlockElementPublisher = require(basePath +
    '/publishing/BlockElementPublisher');
var WordWrapper = require(basePath + '/publishing/WordWrapper');
var Indent = require(basePath + '/publishing/Indent');



/**
 * A singleton class for definition item publishers.
 * @constructor
 * @extends {tsumekusa.publishing.BlockElementPublisher}
 */
var DefinitionPublisher = function() {
  BlockElementPublisher.call(this);
};
tsumekusa.inherits(DefinitionPublisher, BlockElementPublisher);
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
 * Default indent width of definition descriptions.
 * @type {number}
 */
DefinitionPublisher.DESCRIPTIONS_INDENT_WIDTH = 2;


/** @override */
DefinitionPublisher.prototype.getIndentWidthForChild = function(elem) {
  return this.getIndentWidth(elem) + DefinitionPublisher.
      DESCRIPTIONS_INDENT_WIDTH;
};


/**
 * Creates a list marker.
 * @param {number} index Index of a content to create the marker.
 * @param {tsumekusa.dom.DefinitionList.ListType} listType List type.
 * @return {string} List marker.
 */
DefinitionPublisher.prototype.createListMarker = function(index, listType) {
  var DefinitionList = require(basePath + '/dom/DefinitionList');
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
  return index + 1 + ')';
};


/**
 * Returns a symbol used in unordered lists.
 * @return {string} Unordered list symbol.
 */
DefinitionPublisher.prototype.getUnorderedSymbol = function() {
  return DefinitionPublisher.MarkSymbol.BAR;
};


/**
 * Returns an object for descriptions indentation.  Override the method if you
 * want to change a strategy to indent.
 * @param {tsumekusa.dom.DefinitionList.Definition} def Definition.
 * @return {tsumekusa.publishing.Indent} Created object for
 *     indentation.
 * @protected
 */
DefinitionPublisher.prototype.getIndentForDescriptions = function(def) {
  var indentWidth = DefinitionPublisher.DESCRIPTIONS_INDENT_WIDTH;
  return new Indent(this.getIndentWidth(def) + indentWidth);
};



/** @override */
DefinitionPublisher.prototype.publish = function(content) {
  var termParagraph = content.getTerm();
  var descsArray = content.getDescriptions();

  if (!termParagraph) {
    throw Error('Invalid definition term: ' + termParagraph);
  }
  if (!descsArray) {
    throw Error('Invalid definition descriptions: ' + descsArray);
  }

  var inlineElementsInTerm = termParagraph.getInlineElements();

  var listType = content.getListType();
  var dispWidth = this.getDisplayWidth();
  var index = content.getIndex();
  var marker = this.createListMarker(index, listType);

  if (marker) {
    // Set a marker to the head if the list type is not NO_MARKER
    inlineElementsInTerm = [marker].concat(inlineElementsInTerm);
  }

  var termWrapper = new WordWrapper(dispWidth, this.getIndent(content,
      marker));

  var term = termWrapper.wrap(inlineElementsInTerm);
  var desc = descsArray.publish();

  return [term, desc].join('\n');
};


// Export the constructor
module.exports = DefinitionPublisher;
