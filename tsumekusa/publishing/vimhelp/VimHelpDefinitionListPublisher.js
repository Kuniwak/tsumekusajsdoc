// This script licensed under the MIT.
// http://orgachem.mit-license.org


var tsumekusa = require('../../../tsumekusa');
var LineWrapper = require('../../../tsumekusa/publishing/LineWrapper');



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
  return 4;
};


/** @override */
VimHelpDefinitionListPublisher.prototype.publish = function(list) {
  var DefinitionList = require('../../../tsumekusa/contents/DefinitionList');
  var wrapper = LineWrapper.getInstance();
  var markerWidth = 0, indentLevel = this.getIndentLevel(list);

  var output = list.getDefinitions().map(function(def, index) {
    var result = [];
    var listType = def.getListType();
    var caption = def.getCaption().getInlineContents();
    var content = def.getContent().getInlineContents();

    // set marker at the head if the list type is not NO_MARKER
    if (listType !== DefinitionList.ListType.NO_MARKER) {
      marker = this.createListMarker(index, listType);
      markerWidth = marker.length + /* white space width */ 1;
      caption.unshift(marker);
    }

    result.push(wrapper.wrap(caption, tsumekusa.TEXT_WIDTH, indentLevel));
    result.push(wrapper.wrap(content, tsumekusa.TEXT_WIDTH, markerWidth +
                           indentLevel));
    return result.join('\n');
  }, this);

  return output.join('\n\n');
};


// Export the constructor
module.exports = VimHelpDefinitionListPublisher;
