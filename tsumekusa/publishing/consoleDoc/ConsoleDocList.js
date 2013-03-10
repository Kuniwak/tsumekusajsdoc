// This script licensed under the MIT.
// http://orgachem.mit-license.org


var tsumekusa = require('../../../tsumekusa');
var LineWrapper = require('../../../tsumekusa/LineWrapper');



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
  return 4;
};


/** @override */
ConsoleDocListPublisher.prototype.publish = function(list) {
  var marker, listType = list.getListType(), inlineContents;

  var listeds = list.getListedContents().map(function(sentence, index) {
    marker = this.createListMarker(index, listType);
    inlineContents = sentence.getInlineContents();
    // set marker at the head
    inlineContents.unshift(marker);
    return LineWrapper.getInstance().wrap(inlineContents,
        tsumekusa.TEXT_WIDTH, this.getIndentLevel(list));
  }, this);

  return listeds.join('\n\n');
};


// Export the constructor
module.exports = ConsoleDocListPublisher;
