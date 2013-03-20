// This script licensed under the MIT.
// http://orgachem.mit-license.org


var tsumekusaPath = '../../tsumekusa';
var tsumekusa = require(tsumekusaPath);
var string = require(tsumekusaPath + '/string');

var basePath = '../../tsumekusaJsdoc';
var tsumekusaJsdoc = require(basePath);
var DocumentationContent = require('./DocumentationContent');
var MemberContainer = require('./MemberContainer');
var Type = require('./Type');
var ObjectDigest = require(basePath + '/documents/ObjectDigest');



/**
 * A class for a container explains a property.
 * @param {tsumekusaJsdoc.documents.DocletWrapper} symbol Property symbol.
 * @param {?Array.<tsumekusa.contents.Paragraph>=} opt_topContents Optional top
 *     contents.
 * @param {?tsumekusaJsdoc.documents.DocumentHelper=} opt_docHelper Optional
 *     document helper.
 * @param {?tsumekusaJsdoc.references.ReferenceHelper=} opt_refHelper Optional
 *     reference helper.
 * @constructor
 * @extends {tsumekusaJsdoc.documents.MemberContainer}
 */
var PropertyContainer = function(symbol, opt_topContents, opt_docHelper,
    opt_refHelper) {
  MemberContainer.call(this, symbol, opt_topContents, opt_docHelper,
      opt_refHelper);
};
tsumekusa.inherits(PropertyContainer, MemberContainer);


/** @override */
PropertyContainer.prototype.createDigest = function(symbol) {
  return new ObjectDigest(symbol);
};


// Exports the constructor.
module.exports = PropertyContainer;
