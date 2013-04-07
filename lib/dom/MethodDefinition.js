// This script licensed under the MIT.
// http://orgachem.mit-license.org


var tsumekusa = require('tsumekusa');
var util = tsumekusa.util;

var basePath = '../../lib';
var tsumekusaJsdoc = require(basePath);
var MemberDefinition = require(basePath + '/dom/MemberDefinition');
var FunctionDigest = require(basePath + '/dom/FunctionDigest');
var ParametersDefinition = require(basePath + '/dom/ParametersDefinition');
var ReturnsDefinition = require(basePath + '/dom/ReturnsDefinition');



/**
 * A class for a definition of a method.
 * @param {tsumekusaJsdoc.dom.DocletWrapper} symbol Symbol.
 * @param {?tsumekusaJsdoc.dom.DocHelper=} opt_docHelper Optional
 *     document helper.
 * @param {?tsumekusaJsdoc.references.ReferenceHelper=} opt_refHelper Optional
 *     reference helper.
 * @constructor
 * @extends {tsumekusaJsdoc.dom.DocElement}
 */
var MethodDefinition = function(symbol, opt_docHelper, opt_refHelper) {
  MemberDefinition.call(this, symbol, opt_docHelper, opt_refHelper);
  var dd = this.getDefinitionDescritions();

  if (tsumekusaJsdoc.hasParam(symbol)) {
    var paramsDefinition = this.createParametersDefinition(symbol);
    dd.addChild(paramsDefinition.getElement());
  }
  if (tsumekusaJsdoc.hasReturn(symbol)) {
    var returnsDefinition = this.createReturnsDefinition(symbol);
    dd.addChild(returnsDefinition.getElement());
  }
};
util.inherits(MethodDefinition, MemberDefinition);


/** @override */
MethodDefinition.prototype.createDigest = function(symbol) {
  return new FunctionDigest(symbol, this.getDocHelper(),
      this.getReferenceHelper());
};


/**
 * Creates a parameters definition.
 * @param {tsumekusaJsdoc.dom.DocletWrapper} symbol Method symbol.
 * @return {tsumekusaJsdoc.dom.ParametersDefinition} Created parameters
 *     definition.
 */
MethodDefinition.prototype.createParametersDefinition = function(symbol) {
  return new ParametersDefinition(symbol, this.getDocHelper(),
      this.getReferenceHelper());
};


/**
 * Creates a returns definition.
 * @param {tsumekusaJsdoc.dom.DocletWrapper} symbol Method symbol.
 * @return {tsumekusaJsdoc.dom.ReturnsDefinition} Created returns definition.
 */
MethodDefinition.prototype.createReturnsDefinition = function(symbol) {
  return new ReturnsDefinition(symbol, this.getDocHelper(),
      this.getReferenceHelper());
};


// Exports the constructor.
module.exports = MethodDefinition;
