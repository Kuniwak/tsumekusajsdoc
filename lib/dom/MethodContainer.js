// This script licensed under the MIT.
// http://orgachem.mit-license.org

/**
 * @fileoverview A class for containers explain a method.
 * @author orga.cham.job@gmail.com (Orga Chem)
 */


var tsumekusa = require('../../node_modules/tsumekusa');
var util = tsumekusa.util;
var DefinitionList = tsumekusa.DefinitionList;

var basePath = '../../lib';
var tsumekusaJsdoc = require(basePath);
var DocElement = require(basePath + '/dom/DocElement');
var MemberContainer = require(basePath + '/dom/MemberContainer');
var FunctionDigest = require(basePath + '/dom/FunctionDigest');
var ParametersDefinition = require(basePath + '/dom/ParametersDefinition');
var ReturnsDefinition = require(basePath + '/dom/ReturnsDefinition');



/**
 * A class for containers explain a method.
 * @param {module:lib/dom/DocletWrapper} symbol Method symbol.
 * @param {?module:lib/dom/DocHelper=} opt_docHelper Optional
 *     document helper.
 * @param {?module:lib/references/ReferenceHelper=} opt_refHelper Optional
 *     reference helper.
 * @constructor
 * @extends {module:lib/dom/MemberContainer}
 * @exports lib/dom/MethodContainer
 */
var MethodContainer = function(symbol, opt_docHelper, opt_refHelper) {
  MemberContainer.call(this, symbol, opt_docHelper, opt_refHelper);
};
util.inherits(MethodContainer, MemberContainer);


/** @override */
MethodContainer.prototype.createSummaryBlocks = function(symbol) {
  var blocks = MemberContainer.prototype.createSummaryBlocks.call(this, symbol);
  var hasParam = tsumekusaJsdoc.hasParam(symbol);
  var hasReturn = tsumekusaJsdoc.hasReturn(symbol);

  if (hasParam || hasReturn) {
    var dl = new DefinitionList(DefinitionList.ListType.NO_MARKER);
    var defs = dl.getDefinitions();
    if (hasParam) {
      defs.addChild(this.createParametersDefinition(symbol).getElement());
    }
    if (hasReturn) {
      defs.addChild(this.createReturnsDefinition(symbol).getElement());
    }
    return blocks.concat(dl);
  }
  else {
    return blocks;
  }
};


/** @override */
MethodContainer.prototype.createDigest = function(symbol) {
  return new FunctionDigest(symbol, this.getDocHelper(),
      this.getReferenceHelper());
};


/**
 * Creates a parameters container.
 * @param {module:lib/dom/DocletWrapper} symbol Method symbol.
 * @return {module:lib/dom/ParametersDefinition}
 *     Created parameters container.
 */
MethodContainer.prototype.createParametersDefinition = function(symbol) {
  return new ParametersDefinition(symbol, this.getDocHelper(),
      this.getReferenceHelper());
};


/**
 * Creates a parameters container.
 * @param {module:lib/dom/DocletWrapper} symbol Method symbol.
 * @return {module:lib/dom/ReturnsDefinition}
 *     Created returns container.
 */
MethodContainer.prototype.createReturnsDefinition = function(symbol) {
  return new ReturnsDefinition(symbol, this.getDocHelper(),
      this.getReferenceHelper());
};


// Exports the constructor.
module.exports = MethodContainer;
