// This script licensed under the MIT.
// http://orgachem.mit-license.org


var tsumekusaPath = '../../tsumekusa';
var tsumekusa = require(tsumekusaPath);

var basePath = '../../tsumekusaJsdoc';
var DocumentationContent = require('./DocumentationContent');



/**
 * A class for a symbol digest.
 * @param {jsdoc.Doclet} symbol Method symbol.
 * @param {?tsumekusaJsdoc.components.DocumentHelper=} opt_docHelper Optional
 *     document helper.
 * @param {?tsumekusaJsdoc.references.ReferenceHelper=} opt_refHelper Optional
 *     reference helper.
 * @constructor
 * @extends {tsumekusaJsdoc.components.DocumentationContent}
 */
var Digest = function(symbol, opt_docHelper, opt_refHelper) {
  DocumentationContent.call(this, opt_docHelper, opt_refHelper);
  this.setContent(null);
  this.symbol_ = symbol;
};
tsumekusa.inherits(Digest, DocumentationContent);


/**
 * Symbol to create the digest.
 * @type {jsdoc.Doclet}
 */
Digest.prototype.symbol_ = null;


/**
 * Returns a symbol.
 * @return {jsdoc.Doclet} symbol Symbol.
 */
Digest.prototype.getSymbol = function() {
  return this.symbol_;
};


Digest.prototype.isBreakable = function() {
  return false;
};


/** @override */
Digest.prototype.publish = tsumekusa.abstractMethod;


// Exports the constructor.
module.exports = Digest;
