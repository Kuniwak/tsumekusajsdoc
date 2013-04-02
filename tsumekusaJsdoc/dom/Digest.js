// This script licensed under the MIT.
// http://orgachem.mit-license.org


var tsumekusaPath = '../../tsumekusa';
var tsumekusa = require(tsumekusaPath);

var basePath = '../../tsumekusaJsdoc';
var DocElement = require('./DocElement');



/**
 * A class for a symbol digest.
 * @param {tsumekusaJsdoc.dom.DocletWrapper} symbol Method symbol.
 * @param {?tsumekusaJsdoc.dom.DocHelper=} opt_docHelper Optional
 *     document helper.
 * @param {?tsumekusaJsdoc.references.ReferenceHelper=} opt_refHelper Optional
 *     reference helper.
 * @constructor
 * @extends {tsumekusaJsdoc.dom.DocElement}
 */
var Digest = function(symbol, opt_docHelper, opt_refHelper) {
  DocElement.call(this, opt_docHelper, opt_refHelper);
  this.setElement(null);
  this.symbol_ = symbol;
};
tsumekusa.inherits(Digest, DocElement);


/**
 * Symbol to create the digest.
 * @type {tsumekusaJsdoc.dom.DocletWrapper}
 */
Digest.prototype.symbol_ = null;


/**
 * Returns a symbol.
 * @return {tsumekusaJsdoc.dom.DocletWrapper} symbol Symbol.
 */
Digest.prototype.getSymbol = function() {
  return this.symbol_;
};


/** @override */
Digest.prototype.isBreakable = function() {
  return true;
};


/** @override */
Digest.prototype.publish = tsumekusa.abstractMethod;


// Exports the constructor.
module.exports = Digest;
