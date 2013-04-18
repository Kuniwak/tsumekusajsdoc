// This script licensed under the MIT.
// http://orgachem.mit-license.org

/**
 * @fileoverview A class for definitions of a method.
 * @author orga.cham.job@gmail.com (Orga Chem)
 */


var tsumekusa = require('../../node_modules/tsumekusa');
var util = tsumekusa.util;

var basePath = '../../lib';
var tsumekusaJsdoc = require(basePath);
var MemberDefinition = require(basePath + '/dom/MemberDefinition');
var FunctionDigest = require(basePath + '/dom/FunctionDigest');
var ParametersDefinition = require(basePath + '/dom/ParametersDefinition');
var ReturnsDefinition = require(basePath + '/dom/ReturnsDefinition');



/**
 * A class for definitions of a method.
 * @param {module:lib/dom/DocletWrapper} symbol Symbol.
 * @param {?module:lib/dom/DocHelper=} opt_docHelper Optional
 *     document helper.
 * @param {?module:lib/references/ReferenceHelper=} opt_refHelper Optional
 *     reference helper.
 * @constructor
 * @extends {module:lib/dom/DocElement}
 * @exports lib/dom/MethodDefinition
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
 * @param {module:lib/dom/DocletWrapper} symbol Method symbol.
 * @return {module:lib/dom/ParametersDefinition} Created parameters
 *     definition.
 */
MethodDefinition.prototype.createParametersDefinition = function(symbol) {
  return new ParametersDefinition(symbol, this.getDocHelper(),
      this.getReferenceHelper());
};


/**
 * Creates a returns definition.
 * @param {module:lib/dom/DocletWrapper} symbol Method symbol.
 * @return {module:lib/dom/ReturnsDefinition} Created returns definition.
 */
MethodDefinition.prototype.createReturnsDefinition = function(symbol) {
  return new ReturnsDefinition(symbol, this.getDocHelper(),
      this.getReferenceHelper());
};


// Exports the constructor.
module.exports = MethodDefinition;
