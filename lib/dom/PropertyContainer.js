// This script licensed under the MIT.
// http://orgachem.mit-license.org


var tsumekusaPath = '../../tsumekusa';
var tsumekusa = require(tsumekusaPath);
var string = require(tsumekusaPath + '/string');

var basePath = '../../tsumekusaJsdoc';
var tsumekusaJsdoc = require(basePath);
var DocElement = require('./DocElement');
var MemberContainer = require('./MemberContainer');
var Type = require('./Type');
var ObjectDigest = require(basePath + '/dom/ObjectDigest');



/**
 * A class for a container explains a property.
 * @param {tsumekusaJsdoc.dom.DocletWrapper} symbol Property symbol.
 * @param {?Array.<tsumekusa.dom.Paragraph>=} opt_topElements Optional top
 *     contents.
 * @param {?tsumekusaJsdoc.dom.DocHelper=} opt_docHelper Optional
 *     document helper.
 * @param {?tsumekusaJsdoc.references.ReferenceHelper=} opt_refHelper Optional
 *     reference helper.
 * @constructor
 * @extends {tsumekusaJsdoc.dom.MemberContainer}
 */
var PropertyContainer = function(symbol, opt_topElements, opt_docHelper,
    opt_refHelper) {
  MemberContainer.call(this, symbol, opt_topElements, opt_docHelper,
      opt_refHelper);
};
tsumekusa.inherits(PropertyContainer, MemberContainer);


/** @override */
PropertyContainer.prototype.createDigest = function(symbol) {
  return new ObjectDigest(symbol);
};


// Exports the constructor.
module.exports = PropertyContainer;
