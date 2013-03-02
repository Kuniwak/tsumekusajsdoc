// This script licensed under the MIT.
// http://orgachem.mit-license.org


var registry = require('./registry');
var Sentence = require('./Sentence');
var Tag = require('./Tag');



/**
 * Base class for publishing container.
 * The structure is:
 * <ul>
 * <li>Header
 * <li>Top content
 * <li>Sub contents
 *   <ul>
 *   <li>sub content 1
 *   <li>Sub content 2
 *   <li>...
 *   </ul>
 * <li>Footer
 * </ul>
 *
 * @param {string} caption Caption.
 * @constructor
 * @implements {jsdocref.publishing.Content}
 */
Container = function(caption) {
  this.caption_ = caption;
  this.tag_ = new Tag(this.getReferenceId());
  this.topContent_ = new Sentence();
  this.subContents_ = [];
};


/**
 * Parent content.
 * @type {jsdocref.publishing.Content}
 * @private
 */
Container.prototype.parent_ = null;


/**
 * Caption of the container.
 * @type {string}
 * @private
 */
Container.prototype.caption_;


/**
 * Tag of the container.
 * @type {jsdocref.publishing.Tag}
 * @private
 */
Container.prototype.tag_;


/**
 * Top content in the container.
 * @type {jsdocref.publishing.Sentence}
 * @private
 */
Container.prototype.topContent_ = null;


/**
 * Sub contents of the container.
 * @type {Array.<jsdocref.publishing.Content>}
 * @private
 */
Container.prototype.subContents_;


/**
 * Returns a tag of the container.
 * @return {jsdocref.publishing.Tag} Tag of the container.
 */
Container.prototype.getTag = function() {
  return this.tag_;
};


/**
 * Returns ancestor contents.
 * @return {Array.<jsdocref.publishing.Content>} Ancestor contents.
 */
Container.prototype.getAncestors = function() {
  var ancestors = [];
  var current = this;

  while (current = current.getParent()) {
    ancestors.shift(current);
  }

  return ancestors;
};


/**
 * Returns a depth of the container.
 * @return {number} Depth of the container.
 */
Container.prototype.getSelfDepth = function() {
  return this.getAncestors().length;
};


/**
 * Sets a parent content.  This method is chainable.
 * @param {jsdocref.publishing.Content} content Parent content.
 * @return {jsdocref.publishing.Container} This instance.
 * @protected
 */
Container.prototype.setParent = function(content) {
  this.parent_ = content;
  return this;
};


/**
 * Returns a parent content.
 * @return {jsdocref.publishing.Content} Parent content.
 */
Container.prototype.getParent = function() {
  return this.parent_;
};


/**
 * Returns a reference ID.
 * @return {string} Caption of the container.
 */
Container.prototype.getCaption = function() {
  return this.caption_;
};


/**
 * Returns an index number of the content.
 * @return {number} Index of the content.
 */
Container.prototype.getSelfIndex = function() {
  var parent;
  if (parent = this.getParent()) {
    return parent.getSubContents().indexOf(this);
  }

  return -1;
};


/**
 * Returns a reference ID.
 * @return {string} Reference ID.
 */
Container.prototype.getReferenceId = function() {
  return this.tag_ ? this.tag_.getReferenceId() : this.getReferenceIdInternal(
      this.getCaption());
};


/**
 * Returns a reference ID by a caption.  This ID is made by the caption.  For
 * example, a caption that is {@code 'The caption example'} becomes {@code
 * 'the-caption-example'}.
 * @param {string} caption Caption.
 * @return {string} Reference ID.
 * @protected
 */
Container.prototype.getReferenceIdInternal = function(caption) {
  return caption.replace(/([a-z])([A-Z])/g, '$1_$2').replace(/\s+/g, '-').
      toLowerCase();
};


/**
 * Sets a top content.  This method is chainable.
 * @param {jsdocref.publishing.Content} content Top content.
 * @return {jsdocref.publishing.Container} This instance.
 */
Container.prototype.setTopContent = function(content) {
  this.topContent_ = content;
  return this;
};


/**
 * Returns a top content.
 * @return {jsdocref.publishing.Content} Top content.
 */
Container.prototype.getTopContent = function() {
  return this.topContent_;
};


/**
 * Returns a sub contents.
 * @return {Array.<jsdocref.publishing.Content>} Sub contents.
 */
Container.prototype.getSubContents = function() {
  return this.subContents_;
};


/**
 * Appends a sub content to last.  This method is chainable.
 * @param {jsdocref.publishing.Content} content Content to append.
 * @return {jsdocref.publishing.Container} This instance.
 */
Container.prototype.appendSubContent = function(content) {
  return this.appendSubContentAt(content, this.subContents_.length);
};


/**
 * Appends a sub content by an index.  This method is chainable.
 * @param {jsdocref.publishing.Content} content Content to append.
 * @param {number} index Index.
 * @return {jsdocref.publishing.Container} This instance.
 */
Container.prototype.appendSubContentAt = function(content, index) {
  this.subContents_.splice(index, 0, content);
  content.setParent(this);
  return this;
};


/**
 * Removes a sub content by a content.
 * @param {jsdocref.publishing.Content} content to remove.
 * @return {?jsdocref.publishing.Content} Content was removed, if any.
 */
Container.prototype.removeSubContent = function(content) {
  var index;
  if ((index = this.subContents_.indexOf(content)) >= 0) {
    return this.removeSubContentAt(index);
  }
  return null;
};


/**
 * Removes a sub content by an index.
 * @param {number} index Index.
 * @return {?jsdocref.publishing.Content} Content was removed, if any.
 */
Container.prototype.removeSubContentAt = function(index) {
  var removed;
  if (this.subContents_[index]) {
    removed = this.subContents_.splice(index, 1)[0];
    removed.setParent(null);
    return removed;
  }
  
  return null;
};


/** @override */
Container.prototype.publish = function() {
  var publisher = registry.getPublisher(this);
  return publisher.publish(this);
};


// Exports the constructor.
module.exports = Container;
