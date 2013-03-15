// This script licensed under the MIT.
// http://orgachem.mit-license.org


var basePath = '../../tsumekusa';
var tsumekusa = require(basePath);
var BlockContentPublisher = require(basePath +
    '/publishing/BlockContentPublisher');



/**
 * A class for list publisher for vim help.
 * @constructor
 * @implements {tsumekusa.publishing.IContentPublisher}
 */
var ListPublisher = function() {
  BlockContentPublisher.call(this);
};
tsumekusa.inherits(ListPublisher, BlockContentPublisher);
tsumekusa.addSingletonGetter(ListPublisher);


/**
 * Default indent width.
 * @const
 * @type {number}
 */
ListPublisher.INDENT_WIDTH = 2;


/** @override */
ListPublisher.prototype.getIndentWidth = function(content) {
  var indentWidth = this.getParentIndentWidth(content);
  return indentWidth + ListPublisher.INDENT_WIDTH;
};


/** @override */
ListPublisher.prototype.publish = function(list) {
  var items = list.getListItems().getChildren();

  return items.map(function(item, index) {
    return item.publish();
  }).join('\n\n');
};


// Export the constructor
module.exports = ListPublisher;
