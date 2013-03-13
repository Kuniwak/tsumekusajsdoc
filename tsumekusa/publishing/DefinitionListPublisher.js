// This script licensed under the MIT.
// http://orgachem.mit-license.org


var basePath = '../../tsumekusa';
var tsumekusa = require(basePath);
var array = require(basePath + '/array');
var LineWrapper = require(basePath + '/publishing/LineWrapper');
var BlockContentPublisher = require(basePath + 
    '/publishing/BlockContentPublisher');



/**
 * A class for list publisher for vim help.
 * @constructor
 * @extends {tsumekusa.publishing.ContentPublisher}
 */
var DefinitionListPublisher = function(textWidth) {
  BlockContentPublisher.call(this);
  this.textWidth_ = textWidth;
};
tsumekusa.inherits(DefinitionListPublisher, BlockContentPublisher);
tsumekusa.addSingletonGetter(DefinitionListPublisher);


/**
 * Mark symbols.
 * @enum {string}
 */
DefinitionListPublisher.MarkSymbol = {
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
DefinitionListPublisher.NO_MARKER_INDENT_WIDTH = 2;


/** @override */
DefinitionListPublisher.prototype.getIndentLevel = function(content) {
  return BlockContentPublisher.prototype.getIndentLevel.call(this, content) + 2;
};


/**
 * Returns a symbol used in ordered lists.
 * @param {number} index Index of the list.
 * @return {string} Ordered list symbol.
 */
DefinitionListPublisher.prototype.getOrderedSymbol = function(index) {
  return index + ')';
};


/**
 * Returns a symbol used in unordered lists.
 * @return {string} Unordered list symbol.
 */
DefinitionListPublisher.prototype.getUnorderedSymbol = function() {
  return DefinitionListPublisher.MarkSymbol.BAR;
};


/**
 * Creates a list marker.
 * @param {number} index Index of a content to create the marker.
 * @param {tsumekusa.contents.DefinitionList.ListType} listType List type.
 * @return {string} List marker.
 */
DefinitionListPublisher.prototype.createListMarker = function(index,
    listType) {
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


/** @override */
DefinitionListPublisher.prototype.publish = function(list) {
  var DefinitionList = require(basePath + '/contents/DefinitionList');
  var wrapper = LineWrapper.getInstance();
  var indentLv = this.getIndentLevel(list);

  var output = list.getDefinitions().getChildren().map(function(def, index) {
    var result = [];
    var listType = def.getListType();
    var term = array.clone(def.getTerm().getInlineContents());
    var descs = def.getDescriptions().getChildren();
    var termIndent, descIndent;

    // set marker at the head if the list type is not NO_MARKER
    if (listType !== DefinitionList.ListType.NO_MARKER) {
      var marker = this.createListMarker(index, listType);
      var markerLen = marker.length + /* white space width */ 1;
      term.unshift(marker);
      termIndent = new DefinitionListPublisher.Indent(indentLv, markerLen);
      descIndent = new DefinitionListPublisher.Indent(indentLv + markerLen);
    }
    else {
      termIndent = new DefinitionListPublisher.Indent(indentLv);
      descIndent = new DefinitionListPublisher.Indent(indentLv +
          DefinitionListPublisher.NO_MARKER_INDENT_WIDTH);
    }

    result.push(wrapper.wrap(term, this.textWidth_, termIndent));

    var descStr = descs.map(function(desc) {
      return wrapper.wrap(desc.getInlineContents(), this.textWidth_,
          descIndent);
    }).join('\n');
    result.push(descStr);

    return result.join('\n');
  }, this);

  return output.join('\n\n');
};



/**
 * A class for list indent.
 * @param {number} indent Indent width of a list.
 * @param {number} markerWidth List marker width.
 * @constructor
 * @extends {tsumekusa.publishing.LineWrapper}
 */
DefinitionListPublisher.Indent = function(indent, markerWidth) {
  LineWrapper.Indent.call(this, indent);
  this.markerWidth_ = markerWidth;
};
tsumekusa.inherits(DefinitionListPublisher.Indent, LineWrapper.Indent);


// Export the constructor
module.exports = DefinitionListPublisher;
