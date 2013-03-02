// This script licensed under the MIT.
// http://orgachem.mit-license.org


var registry = require('./registry');
var ContentSentence = require('./ContentSentence');
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
ContentsContainer = function(caption) {
  this.caption_ = caption;
  this.tag_ = new Tag(this.getReferenceId());
  this.topContent_ = new ContentSentence();
  this.subContents_ = [];
};


/**
 * Parent content.
 * @type {jsdocref.publishing.Content}
 * @private
 */
ContentsContainer.prototype.parent_ = null;


/**
 * Caption of the container.
 * @type {string}
 * @private
 */
ContentsContainer.prototype.caption_;


/**
 * Tag of the container.
 * @type {jsdocref.publishing.Tag}
 * @private
 */
ContentsContainer.prototype.tag_;


/**
 * Header in the container.
 * @type {jsdocref.publishing.Content}
 * @private
 */
ContentsContainer.prototype.header_ = null;


/**
 * Top content in the container.
 * @type {jsdocref.publishing.ContentSentence}
 * @private
 */
ContentsContainer.prototype.topContent_ = null;


/**
 * Sub contents of the container.
 * @type {Array.<jsdocref.publishing.Content>}
 * @private
 */
ContentsContainer.prototype.subContents_;


/**
 * Footer in the container.
 * @type {jsdocref.publishing.Content}
 * @private
 */
ContentsContainer.prototype.footer_ = null;


/**
 * Returns a reference ID.
 * @return {string} Caption of the container.
 */
ContentsContainer.prototype.getCaption = function() {
  return this.caption_;
};


/**
 * Returns a reference ID.
 * @return {string} Reference ID.
 */
ContentsContainer.prototype.getReferenceId = function() {
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
ContentsContainer.prototype.getReferenceIdInternal = function(caption) {
  return caption.replace(/([a-z])([A-Z])/g, '$1_$2').replace(/\s+/g, '-').
      toLowerCase();
};


/**
 * Sets a header content.  This method is chainable.
 * @param {jsdocref.publishing.Content} content Header content.
 * @return {jsdocref.publishing.ContentsContainer} This instance.
 */
ContentsContainer.prototype.setHeaderContent = function(content) {
  this.header_ = content;
  return this;
};


/**
 * Returns a header content.
 * @return {jsdocref.publishing.Content} Header content.
 */
ContentsContainer.prototype.getHeaderContent = function() {
  return this.header_;
};


/**
 * Sets a top content.  This method is chainable.
 * @param {jsdocref.publishing.Content} content Top content.
 * @return {jsdocref.publishing.ContentsContainer} This instance.
 */
ContentsContainer.prototype.setTopContent = function(content) {
  this.topContent_ = content;
  return this;
};


/**
 * Returns a top content.
 * @return {jsdocref.publishing.Content} Top content.
 */
ContentsContainer.prototype.getTopContent = function() {
  return this.topContent_;
};


/**
 * Returns a sub contents.
 * @return {Array.<jsdocref.publishing.Content>} Sub contents.
 */
ContentsContainer.prototype.getSubContents = function() {
  return this.subContents_;
};


/**
 * Appends a sub content to last.  This method is chainable.
 * @param {jsdocref.publishing.Content} content Content to append.
 * @return {jsdocref.publishing.ContentsContainer} This instance.
 */
ContentsContainer.prototype.appendSubContent = function(content) {
  return this.appendSubContentAt(content, this.subContents_.length);
};


/**
 * Appends a sub content by an index.  This method is chainable.
 * @param {jsdocref.publishing.Content} content Content to append.
 * @param {number} index Index.
 * @return {jsdocref.publishing.ContentsContainer} This instance.
 */
ContentsContainer.prototype.appendSubContentAt = function(content, index) {
  this.subContents_.splice(index, 0, content);
  return this;
};


/**
 * Removes a sub content by a content.
 * @param {jsdocref.publishing.Content} content to remove.
 * @return {?jsdocref.publishing.Content} Content was removed, if any.
 */
ContentsContainer.prototype.removeSubContent = function(content) {
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
ContentsContainer.prototype.removeSubContentAt = function(index) {
  return this.subContents_.splice(index, 1)[0] || null;
};


/**
 * Sets a footer content.  This method is chainable.
 * @param {jsdocref.publishing.Content} content Footer content.
 * @return {jsdocref.publishing.ContentsContainer} This instance.
 */
ContentsContainer.prototype.setFooterContent = function(content) {
  this.footer_ = content;
  return this;
};


/**
 * Returns a footer content.
 * @return {jsdocref.publishing.Content} Footer content.
 */
ContentsContainer.prototype.getFooterContent = function() {
  return this.footer_;
};


/** @override */
ContentsContainer.prototype.publish = function() {
  var publisher = registry.getPublisher(this);
  return publisher.publish(this);
};


// Exports the constructor.
module.exports = ContentsContainer;
