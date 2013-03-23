// This script licensed under the MIT.
// http://orgachem.mit-license.org


var basePath = '../../tsumekusa';
var tsumekusa = require(basePath);
var BlockElementPublisher = require(basePath +
    '/publishing/BlockElementPublisher');



/**
 * A class for list publisher for vim help.
 * @constructor
 * @implements {tsumekusa.publishing.IElementPublisher}
 */
var ListPublisher = function() {
  BlockElementPublisher.call(this);
};
tsumekusa.inherits(ListPublisher, BlockElementPublisher);
tsumekusa.addSingletonGetter(ListPublisher);


/**
 * Indent width for children.
 * @const
 * @type {number}
 */
ListPublisher.INDENT_WIDTH_FOR_CHILD = 2;


/** @override */
ListPublisher.prototype.getIndentWidthForChild = function(elem) {
  return this.getIndentWidth(elem) + ListPublisher.INDENT_WIDTH_FOR_CHILD;
};


/** @override */
ListPublisher.prototype.publish = function(list) {
  return list.getListItems().publish();
};


// Export the constructor
module.exports = ListPublisher;
