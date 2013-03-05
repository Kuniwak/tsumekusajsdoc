// This script licensed under the MIT.
// http://orgachem.mit-license.org


var jsdocref = require('../../jsdocref');
var List = require('./List');
var LineWrapper = require('./LineWrapper');



/**
 * A class for list publisher for vim help.
 * @constructor
 * @implements {jsdocref.publishing.ContentPublisher}
 */
var VimHelpListPublisher = function() {};
jsdocref.addSingletonGetter(VimHelpListPublisher);


/**
 * Creates a list marker.
 * @param {number} index Index of a content to create the marker.
 * @param {jsdocref.publishing.List.ListType} listType List type.
 * @return {string} List marker.
 */
VimHelpListPublisher.prototype.createListMarker = function(index, listType) {
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
 * @param {jsdocref.publishing.List} list List.
 * @return {number} Indent lebel.
 */
VimHelpListPublisher.prototype.getIndentLevel = function(list) {
  return 4;
};


/** @override */
VimHelpListPublisher.prototype.publish = function(list) {
  var marker, listType = list.getListType(), inlineContents;
  var listeds = list.getListedContents().map(function(sentence, index) {
    marker = this.createListMarker(index, listType);
    inlineContents = sentence.getInlineContents();
    // set marker at the head
    inlineContents.shift(marker);
    return LineWrapper.getInstance().wrap(inlineContents,
        jsdocref.TEXT_WIDTH, this.getIndentLevel(list));
  }, this);

  return listeds.join('\n\n');
};


// Export the constructor
module.exports = VimHelpListPublisher;
