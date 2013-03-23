// This script licensed under the MIT.
// http://orgachem.mit-license.org


var basePath = '../../tsumekusa';
var tsumekusa = require(basePath);
var InlineElement = require(basePath + '/dom/InlineElement');



/**
 * A class for tag contents.  Do not construct by the constructor.  Instead use
 * {@link tsumekusa.dom.TagFactory.createTag} to construct.
 * @param {string} id Reference ID string.
 * @constructor
 * @extends {tsumekusa.dom.InlineElement}
 */
var Tag = function(id) {
  InlineElement.call(this);
  this.setReferenceId(id);
};
tsumekusa.inherits(Tag, InlineElement);


/**
 * Default content publisher.
 * @type {tsumekusa.publishing.TagPublisher}
 */
Tag.publisher = null;


/**
 * Reference ID of the tag.
 * @type {string}
 * @private
 */
Tag.prototype.refId_;


/** @override */
Tag.prototype.isBreakable = function() {
  return false;
};


/**
 * Returns a context text.
 * @return {string} Context string.
 */
Tag.prototype.getReferenceId = function() {
  return this.refId_;
};


/**
 * Sets a context text.  The method is chainable.
 * @param {string} id Reference ID string.
 * @return {tsumekusa.dom.Tag} This instance.
 */
Tag.prototype.setReferenceId = function(id) {
  this.refId_ = id;
  return this;
};


// Exports the constructor.
module.exports = Tag;
