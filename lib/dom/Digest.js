// This script licensed under the MIT.
// http://orgachem.mit-license.org

/**
 * @fileoverview A class for symbol digests.
 * @author orga.cham.job@gmail.com (Orga Chem)
 */


var tsumekusa = require('../../node_modules/tsumekusa');
var util = tsumekusa.util;

var basePath = '../../lib';
var DocElement = require(basePath + '/dom/DocElement');



/**
 * A class for symbol digests.
 * @param {module:lib/dom/DocletWrapper} symbol Method symbol.
 * @param {?module:lib/dom/DocHelper=} opt_docHelper Optional
 *     document helper.
 * @param {?module:lib/references/ReferenceHelper=} opt_refHelper Optional
 *     reference helper.
 * @constructor
 * @extends {module:lib/dom/DocElement}
 * @exports lib/dom/Digest
 */
var Digest = function(symbol, opt_docHelper, opt_refHelper) {
  DocElement.call(this, opt_docHelper, opt_refHelper);
  this.setElement(null);
  this.symbol_ = symbol;
};
util.inherits(Digest, DocElement);


/**
 * Symbol to create the digest.
 * @type {?module:lib/dom/DocletWrapper}
 * @private
 */
Digest.prototype.symbol_ = null;


/**
 * Returns a symbol.
 * @return {module:lib/dom/DocletWrapper} symbol Symbol.
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
