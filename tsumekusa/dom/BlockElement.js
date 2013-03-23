// This script licensed under the MIT.
// http://orgachem.mit-license.org


var tsumekusa = require('../../tsumekusa');
var Element = require('./Element');



/**
 * An abstract class for block content.
 * @constructor
 * @extends {tsumekusa.dom.Element}
 */
var BlockElement = function() {
  Element.call(this);
};
tsumekusa.inherits(BlockElement, Element);


/**
 * Block content as a parent of the content.
 * @type {tsumekusa.dom.Element}
 * @private
 */
BlockElement.prototype.parent_ = null;


/**
 * Returns a block content as a parent of the content.
 * @return {tsumekusa.dom.IElement} Parent content.
 */
BlockElement.prototype.getParent = function() {
  return this.parent_;
};


/**
 * Sets a block content as parent.  This method is chainable.
 * @param {tsumekusa.dom.BlockElement} parent Parent.
 * @return {tsumekusa.dom.BlockElement} This instance.
 */
BlockElement.prototype.setParent = function(parent) {
  this.parent_ = parent;
  return this;
};


/**
 * Returns ancestor block contents.
 * @return {Array.<tsumekusa.publishing.BlockElement>} Ancestor block contents.
 */
BlockElement.prototype.getAncestors = function() {
  var ancestors = [];
  var current = this;

  while (current = current.getParent()) {
    ancestors.unshift(current);
  }

  return ancestors;
};


// Exports the constructor.
module.exports = BlockElement;
