// This script licensed under the MIT.
// http://orgachem.mit-license.org


var tsumekusa = require('../../tsumekusa');
var Content = require('./Content');



/**
 * An abstract class for block content.
 * @constructor
 * @extends {tsumekusa.dom.Content}
 */
var BlockContent = function() {
  Content.call(this);
};
tsumekusa.inherits(BlockContent, Content);


/**
 * Block content as a parent of the content.
 * @type {tsumekusa.dom.Content}
 * @private
 */
BlockContent.prototype.parent_ = null;


/**
 * Returns a block content as a parent of the content.
 * @return {tsumekusa.dom.IContent} Parent content.
 */
BlockContent.prototype.getParent = function() {
  return this.parent_;
};


/**
 * Sets a block content as parent.  This method is chainable.
 * @param {tsumekusa.dom.BlockContent} parent Parent.
 * @return {tsumekusa.dom.BlockContent} This instance.
 */
BlockContent.prototype.setParent = function(parent) {
  this.parent_ = parent;
  return this;
};


/**
 * Returns ancestor block contents.
 * @return {Array.<tsumekusa.publishing.BlockContent>} Ancestor block contents.
 */
BlockContent.prototype.getAncestors = function() {
  var ancestors = [];
  var current = this;

  while (current = current.getParent()) {
    ancestors.unshift(current);
  }

  return ancestors;
};


// Exports the constructor.
module.exports = BlockContent;
