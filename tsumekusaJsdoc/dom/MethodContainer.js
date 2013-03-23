// This script licensed under the MIT.
// http://orgachem.mit-license.org


var tsumekusaPath = '../../tsumekusa';
var tsumekusa = require(tsumekusaPath);
var DefinitionList = require(tsumekusaPath + '/dom/DefinitionList');

var basePath = '../../tsumekusaJsdoc';
var tsumekusaJsdoc = require(basePath);
var DocElement = require(basePath + '/dom/DocElement');
var MemberContainer = require(basePath + '/dom/MemberContainer');
var FunctionDigest = require(basePath + '/dom/FunctionDigest');
var ParametersDefinition = require(basePath + '/dom/ParametersDefinition');
var ReturnsDefinition = require(basePath + '/dom/ReturnsDefinition');



/**
 * A class for a container explains a method.
 * @param {jsdoc.Doclet} symbol Method symbol.
 * @param {?tsumekusaJsdoc.dom.DocHelper=} opt_docHelper Optional
 *     document helper.
 * @param {?tsumekusaJsdoc.references.ReferenceHelper=} opt_refHelper Optional
 *     reference helper.
 * @constructor
 * @extends {tsumekusaJsdoc.dom.MemberContainer}
 */
var MethodContainer = function(symbol, opt_docHelper, opt_refHelper) {
  MemberContainer.call(this, symbol, opt_docHelper, opt_refHelper);
};
tsumekusa.inherits(MethodContainer, MemberContainer);


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
 * @param {jsdoc.Doclet} symbol Method symbol.
 * @return {tsumekusaJsdoc.dom.ParametersDefinition}
 *     Created parameters container.
 */
MethodContainer.prototype.createParametersDefinition = function(symbol) {
  return new ParametersDefinition(symbol, this.getDocHelper(),
      this.getReferenceHelper());
};


/**
 * Creates a parameters container.
 * @param {jsdoc.Doclet} symbol Method symbol.
 * @return {tsumekusaJsdoc.dom.ReturnsDefinition}
 *     Created returns container.
 */
MethodContainer.prototype.createReturnsDefinition = function(symbol) {
  return new ReturnsDefinition(symbol, this.getDocHelper(),
      this.getReferenceHelper());
};


// Exports the constructor.
module.exports = MethodContainer;
