// This script licensed under the MIT.
// http://orgachem.mit-license.org


var DocHelper = require('./DocHelper');
var ReferenceHelper = require('../references/ReferenceHelper');


/**
 * A class for a element for Jsdoc with tsumekusa.  This class stores 2 helpers
 * as {@link tsumekusaJsdoc.dom.DocHelper} and {@link
 * tsumekusaJsdoc.references.ReferenceHelper}. These helpers make strategy
 * changes such as: parsing inline tag, generating references.
 * @param {?tsumekusaJsdoc.dom.DocHelper=} opt_docHelper Optional
 *     document helper.
 * @param {?tsumekusaJsdoc.references.ReferenceHelper=} opt_refHelper Optional
 *     reference helper.
 * @constructor
 * @implements {tsumekusa.dom.IElement}
 */
var DocElement = function(opt_docHelper, opt_refHelper) {
  this.docHelper_ = opt_docHelper || DocHelper.getInstance();
  this.refHelper_ = opt_refHelper || ReferenceHelper.getInstance();
};


/**
 * Returns a document helper.
 * @return {tsumekusaJsdoc.dom.DocHelper}
 */
DocElement.prototype.getDocHelper = function() {
  return this.docHelper_;
};


/**
 * Returns a renference helper.
 * @return {tsumekusaJsdoc.references.ReferenceHelper}
 */
DocElement.prototype.getReferenceHelper = function() {
  return this.refHelper_;
};


/**
 * Sets a element.  The method is chainable.
 * @param {tsumekusa.dom.IElement} element Element.
 * @return {tsumekusaJsdoc.dom.DocElement} This instance.
 * @protected
 */
DocElement.prototype.setElement = function(element) {
  this.element_ = element;
  return this;
};


/**
 * Returns a element.
 * @return {tsumekusa.dom.IElement} Element.
 * @protected
 */
DocElement.prototype.getElement = function() {
  return this.element_;
};


/** @override */
DocElement.prototype.publish = function() {
  // Borrow tsumekusa publishing system.
  return this.getElement().publish();
};


// Exports the constructor
module.exports = DocElement;
