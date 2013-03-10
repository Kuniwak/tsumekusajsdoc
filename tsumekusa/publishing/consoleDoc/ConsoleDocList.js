// This script licensed under the MIT.
// http://orgachem.mit-license.org


var tsumekusa = require('../../../tsumekusa');
var consoleDoc = require('../../../tsumekusa/publishing/consoleDoc');
var LineWrapper = require('../../../tsumekusa/publishing/LineWrapper');



/**
 * A class for list publisher for vim help.
 * @constructor
 * @implements {tsumekusa.publishing.ContentPublisher}
 */
var ConsoleDocListPublisher = function() {};
tsumekusa.addSingletonGetter(ConsoleDocListPublisher);


/**
 * Creates a list marker.
 * @param {number} index Index of a content to create the marker.
 * @param {tsumekusa.contents.List.ListType} listType List type.
 * @return {string} List marker.
 */
ConsoleDocListPublisher.prototype.createListMarker = function(index, listType) {
  var List = require('../../../tsumekusa/contents/List');
  switch (listType) {
    case List.ListType.UNORDERED:
      return '*';
    case List.ListType.ORDERED:
      return index + ')';
    default:
      throw Error('Illegal list type: ' + listType);
  }
};


/**
 * Returns an indent level by a list.
 * @param {tsumekusa.contents.List} list List.
 * @return {number} Indent lebel.
 */
ConsoleDocListPublisher.prototype.getIndentLevel = function(list) {
  return 2;
};


/** @override */
ConsoleDocListPublisher.prototype.publish = function(list) {
  var marker, listType = list.getListType(), inlineContents, indent;
  var indentLv = this.getIndentLevel();
  var wrapper = LineWrapper.getInstance();

  var listeds = list.getListedContents().map(function(sentence, index) {
    marker = this.createListMarker(index, listType);
    indent = new ConsoleDocContainerPublisher.Indent(indentLv, marker.length);

    inlineContents = sentence.getInlineContents();

    // set marker at the head
    inlineContents.unshift(marker);

    return wrapper.wrap(inlineContents, consoleDoc.TEXT_WIDTH, indent);
  }, this);

  return listeds.join('\n\n');
};



/**
 * A class for list indent.
 * @param {number} indent Indent width of a list.
 * @param {number} markerWidth List marker width.
 * @constructor
 * @extends {tsumekusa.publishing.LineWrapper}
 */
ConsoleDocListPublisher.Indent = function(indent, markerWidth) {
  LineWrapper.Indent.call(this, indent);
  this.markerWidth_ = markerWidth_;
};
tsumekusa.inherits(ConsoleDocListPublisher.Indent, LineWrapper.Indent);


/** @override */
ConsoleDocListPublisher.Indent.prototype.getIndentWidth = function(
    lineIdx) {
  var width = LineWrapper.Indent.prototype.getIndentWidth.call(this, lineIdx);
  return width + (lineIdx > 0 ? this.markerWidth_ : 0);
};


// Export the constructor
module.exports = ConsoleDocListPublisher;
