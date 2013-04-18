// This script licensed under the MIT.
// http://orgachem.mit-license.org

/**
 * @fileoverview A class for containers explain a property.
 * @author orga.cham.job@gmail.com (Orga Chem)
 */


var tsumekusa = require('../../node_modules/tsumekusa');
var util = tsumekusa.util;
var string = tsumekusa.string;

var basePath = '../../lib';
var tsumekusaJsdoc = require(basePath);
var DocElement = require(basePath + '/dom/DocElement');
var MemberContainer = require('./MemberContainer');
var Type = require(basePath + '/dom/Type');
var ObjectDigest = require(basePath + '/dom/ObjectDigest');



/**
 * A class for containers explain a property.
 * @param {module:lib/dom/DocletWrapper} symbol Property symbol.
 * @param {?Array.<tsumekusa.dom.Paragraph>=} opt_topElements Optional top
 *     contents.
 * @param {?module:lib/dom/DocHelper=} opt_docHelper Optional
 *     document helper.
 * @param {?module:lib/references/ReferenceHelper=} opt_refHelper Optional
 *     reference helper.
 * @constructor
 * @extends {module:lib/dom/MemberContainer}
 * @exports lib/dom/PropertyContainer
 */
var PropertyContainer = function(symbol, opt_topElements, opt_docHelper,
    opt_refHelper) {
  MemberContainer.call(this, symbol, opt_topElements, opt_docHelper,
      opt_refHelper);
};
util.inherits(PropertyContainer, MemberContainer);


/** @override */
PropertyContainer.prototype.createDigest = function(symbol) {
  return new ObjectDigest(symbol);
};


// Exports the constructor.
module.exports = PropertyContainer;
