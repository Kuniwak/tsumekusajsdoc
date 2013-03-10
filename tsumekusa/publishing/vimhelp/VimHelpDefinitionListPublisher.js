// This script licensed under the MIT.
// http://orgachem.mit-license.org


var tsumekusa = require('../../../tsumekusa');
var LineWrapper = require('../../../tsumekusa/publishing/LineWrapper');
var vimhelp = require('../../../tsumekusa/publishing/vimhelp');



/**
 * A class for list publisher for vim help.
 * @constructor
 * @implements {tsumekusa.publishing.ContentPublisher}
 */
var VimHelpDefinitionListPublisher = function() {};
tsumekusa.addSingletonGetter(VimHelpDefinitionListPublisher);


/**
 * Mark symbols.
 * @enum {string}
 */
VimHelpDefinitionListPublisher.MarkSymbol = {
  CIRCLE: 'o',
  CROSS: 'x'
};


/**
 * Returns a symbol used in ordered lists.
 * @param {number} index Index of the list.
 * @return {string} Ordered list symbol.
 */
VimHelpDefinitionListPublisher.prototype.getOrderedSymbol = function(index) {
  return index + ')';
};


/**
 * Returns a symbol used in unordered lists.
 * @return {string} Unordered list symbol.
 */
VimHelpDefinitionListPublisher.prototype.getUnorderedSymbol = function() {
  return VimHelpDefinitionListPublisher.MarkSymbol.CIRCLE;
};



/**
 * Creates a list marker.
 * @param {number} index Index of a content to create the marker.
 * @param {tsumekusa.contents.DefinitionList.ListType} listType List type.
 * @return {string} List marker.
 */
VimHelpDefinitionListPublisher.prototype.createListMarker = function(index,
    listType) {
  var DefinitionList = require('../../../tsumekusa/contents/DefinitionList');
  switch (listType) {
    case DefinitionList.ListType.NO_MARKER:
      return null;
    case DefinitionList.ListType.UNORDERED:
      return this.getUnorderedSymbol();
    case DefinitionList.ListType.ORDERED:
      return this.getOrderedListSymbol(index);
    default:
      throw Error('Illegal list type: ' + listType);
  }
};


/**
 * Returns an indent level by a list.
 * @param {tsumekusa.contents.DefinitionList} list List.
 * @return {number} Indent lebel.
 */
VimHelpDefinitionListPublisher.prototype.getIndentLevel = function(list) {
  return 2;
};


/** @override */
VimHelpDefinitionListPublisher.prototype.publish = function(list) {
  var DefinitionList = require('../../../tsumekusa/contents/DefinitionList');
  var wrapper = LineWrapper.getInstance();
  var markerWidth = 0, indentLv = this.getIndentLevel(list);

  var output = list.getDefinitions().map(function(def, index) {
    var result = [];
    var listType = def.getListType();
    var caption = def.getCaption().getInlineContents();
    var content = def.getContent().getInlineContents();
    var captionIndent, contentIndent;

    // set marker at the head if the list type is not NO_MARKER
    if (listType !== DefinitionList.ListType.NO_MARKER) {
      marker = this.createListMarker(index, listType);
      markerWidth = marker.length + /* white space width */ 1;
      caption.unshift(marker);
      captionIndent = new VimHelpDefinitionListPublisher.Indent(indentLv,
          marker.length);
    }
    else {
      captionIndent = new VimHelpDefinitionListPublisher.Indent(indentLv);
    }

    contentIndent = new VimHelpDefinitionListPublisher.Indent(indentLv + 2);

    result.push(wrapper.wrap(caption, vimhelp.TEXT_WIDTH, captionIndent));
    result.push(wrapper.wrap(content, vimhelp.TEXT_WIDTH, contentIndent));
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
VimHelpDefinitionListPublisher.Indent = function(indent, markerWidth) {
  LineWrapper.Indent.call(this, indent);
  this.markerWidth_ = markerWidth;
};
tsumekusa.inherits(VimHelpDefinitionListPublisher.Indent, LineWrapper.Indent);


/** @override */
VimHelpDefinitionListPublisher.Indent.prototype.getIndentWidth = function(
    lineIdx) {
  var width = LineWrapper.Indent.prototype.getIndentWidth.call(this, lineIdx);
  return width + (lineIdx > 0 ? this.markerWidth_ : 0);
};


// Export the constructor
module.exports = VimHelpDefinitionListPublisher;
