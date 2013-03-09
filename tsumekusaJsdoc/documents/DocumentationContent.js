// This script licensed under the MIT.
// http://orgachem.mit-license.org


var DocumentHelper = require('./DocumentHelper');
var ReferenceHelper = require('../references/ReferenceHelper');


/**
 * A class for a content for Jsdoc with tsumekusa.  This class stores 2 helpers
 * as {@link tsumekusaJsdoc.documents.DocumentHelper} and {@link
 * tsumekusaJsdoc.references.ReferenceHelper}. These helpers make strategy
 * changes such as: parsing inline tag, generating references.
 * @param {?tsumekusaJsdoc.documents.DocumentHelper=} opt_docHelper Optional
 *     document helper.
 * @param {?tsumekusaJsdoc.references.ReferenceHelper=} opt_refHelper Optional
 *     reference helper.
 * @constructor
 * @implements {tsumekusa.contents.IContent}
 */
var DocumentationContent = function(opt_docHelper, opt_refHelper) {
  this.docHelper_ = opt_docHelper || DocumentHelper.getInstance();
  this.refHelper_ = opt_refHelper || ReferenceHelper.getInstance();
};


/**
 * Returns a document helper.
 * @return {tsumekusaJsDoc.documents.DocumentHelper}
 */
DocumentationContent.prototype.getDocumentHelper = function() {
  return this.docHelper_;
};


/**
 * Returns a renference helper.
 * @return {tsumekusaJsDoc.references.ReferenceHelper}
 */
DocumentationContent.prototype.getReferenceHelper = function() {
  return this.refHelper_;
};


/**
 * Sets a content.  The method is chainable.
 * @param {tsumekusa.contents.Content} content Content.
 * @return {tsumekusaJsdoc.documents.DocumentationContent} This instance.
 * @protected
 */
DocumentationContent.prototype.setContent = function(content) {
  this.content_ = content;
  return this;
};


/**
 * Returns a content.
 * @return {tsumekusa.contents.Content} Content.
 * @protected
 */
DocumentationContent.prototype.getContent = function() {
  return this.content_;
};


/** @override */
DocumentationContent.prototype.publish = function() {
  // Borrow tsumekusa publishing system.
  return this.getContent().publish();
};


// Exports the constructor
module.exports = DocumentationContent;