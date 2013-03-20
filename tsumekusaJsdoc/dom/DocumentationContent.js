// This script licensed under the MIT.
// http://orgachem.mit-license.org


var DocumentHelper = require('./DocumentHelper');
var ReferenceHelper = require('../references/ReferenceHelper');


/**
 * A class for a content for Jsdoc with tsumekusa.  This class stores 2 helpers
 * as {@link tsumekusaJsdoc.dom.DocumentHelper} and {@link
 * tsumekusaJsdoc.references.ReferenceHelper}. These helpers make strategy
 * changes such as: parsing inline tag, generating references.
 * @param {?tsumekusaJsdoc.dom.DocumentHelper=} opt_docHelper Optional
 *     document helper.
 * @param {?tsumekusaJsdoc.references.ReferenceHelper=} opt_refHelper Optional
 *     reference helper.
 * @constructor
 * @implements {tsumekusa.dom.IContent}
 */
var DocumentationContent = function(opt_docHelper, opt_refHelper) {
  this.docHelper_ = opt_docHelper || DocumentHelper.getInstance();
  this.refHelper_ = opt_refHelper || ReferenceHelper.getInstance();
};


/**
 * Returns a document helper.
 * @return {tsumekusaJsdoc.dom.DocumentHelper}
 */
DocumentationContent.prototype.getDocumentHelper = function() {
  return this.docHelper_;
};


/**
 * Returns a renference helper.
 * @return {tsumekusaJsdoc.references.ReferenceHelper}
 */
DocumentationContent.prototype.getReferenceHelper = function() {
  return this.refHelper_;
};


/**
 * Sets a content.  The method is chainable.
 * @param {tsumekusa.dom.IContent} content Content.
 * @return {tsumekusaJsdoc.dom.DocumentationContent} This instance.
 * @protected
 */
DocumentationContent.prototype.setContent = function(content) {
  this.content_ = content;
  return this;
};


/**
 * Returns a content.
 * @return {tsumekusa.dom.IContent} Content.
 * @protected
 */
DocumentationContent.prototype.getContent = function() {
  return this.content_;
};


/**
 * Sets a parent content to a wrapped content.
 * @param {tsumekusaJsdoc.dom.IContent} parent Parent to set.
 */
DocumentationContent.prototype.setParent = function(parent) {
  this.content_.setParent(parent);
};


/** @override */
DocumentationContent.prototype.publish = function() {
  // Borrow tsumekusa publishing system.
  return this.getContent().publish();
};


// Exports the constructor
module.exports = DocumentationContent;
