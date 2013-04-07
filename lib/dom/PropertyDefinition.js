// This script licensed under the MIT.
// http://orgachem.mit-license.org


var tsumekusa = require('tsumekusa');
var util = tsumekusa.util;

var basePath = '../../lib';
var tsumekusaJsdoc = require(basePath);
var MemberDefinition = require(basePath + '/dom/MemberDefinition');
var ObjectDigest = require(basePath + '/dom/ObjectDigest');



/**
 * A class for a definition of a property.
 * @param {tsumekusaJsdoc.dom.DocletWrapper} symbol Symbol.
 * @param {?tsumekusaJsdoc.dom.DocHelper=} opt_docHelper Optional
 *     document helper.
 * @param {?tsumekusaJsdoc.references.ReferenceHelper=} opt_refHelper Optional
 *     reference helper.
 * @constructor
 * @extends {tsumekusaJsdoc.dom.DocElement}
 */
var PropertyDefinition = function(symbol, opt_docHelper, opt_refHelper) {
  MemberDefinition.call(this, symbol, opt_docHelper, opt_refHelper);
};
util.inherits(PropertyDefinition, MemberDefinition);


/** @override */
PropertyDefinition.prototype.createDigest = function(symbol) {
  return new ObjectDigest(symbol, this.getDocHelper(),
      this.getReferenceHelper());
};


// Exports the constructor.
module.exports = PropertyDefinition;
