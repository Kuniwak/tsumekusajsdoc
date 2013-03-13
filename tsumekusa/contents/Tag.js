// This script licensed under the MIT.
// http://orgachem.mit-license.org


var basePath = '../../tsumekusa';
var tsumekusa = require(basePath);
var InlineContent = require(basePath + '/contents/InlineContent');
var TagPublisher = require(basePath + '/publishing/TagPublisher');



/**
 * A class for tag contents.  Do not construct by the constructor.  Instead use
 * {@link tsumekusa.contents.TagFactory.createTag} to construct.
 * @param {string} id Reference ID string.
 * @constructor
 * @extends {tsumekusa.contents.InlineContent}
 */
var Tag = function(id) {
  InlineContent.call(this);
  this.setReferenceId(id);
};
tsumekusa.inherits(Tag, InlineContent);


/**
 * Default content publisher.
 * @type {tsumekusa.publishing.TagPublisher}
 */
Tag.publisher = TagPublisher.getInstance();


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
 * @return {tsumekusa.contents.Tag} This instance.
 */
Tag.prototype.setReferenceId = function(id) {
  this.refId_ = id;
  return this;
};


// Exports the constructor.
module.exports = Tag;
