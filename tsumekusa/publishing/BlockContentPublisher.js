// This script licensed under the MIT.
// http://orgachem.mit-license.org


/**
 * An abstract class for block content publisher.
 * @constructor
 * @implements {tsumekusa.publishing.ContentPublisher}
 */
var BlockContentPublisher = function() {};


/**
 * Returns an indent level of the content.
 * @param {tsumekusa.contents.BlockContent} content Block content.
 */
BlockContentPublisher.prototype.getIndentLevel = function(content) {
  var parent = content.getParent();
  return parent ? parent.getPublisher().getIndentLevel(parent) : 0;
};


// Exports the constructor
module.exports = BlockContentPublisher;
