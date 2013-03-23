// This script licensed under the MIT.
// http://orgachem.mit-license.org


var tsumekusaPath = '../../tsumekusa';
var tsumekusa = require(tsumekusaPath);
var ElementArray = require(tsumekusaPath + '/dom/ElementArray');
var Paragraph = require(tsumekusaPath + '/dom/Paragraph');
var DefinitionList = require(tsumekusaPath + '/dom/DefinitionList');

var basePath = '../../tsumekusaJsdoc';
var tsumekusaJsdoc = require(basePath);
var DocElement = require(basePath + '/dom/DocElement');
var MemberDefinition = require(basePath + '/dom/MemberDefinition');
var FunctionDigest = require(basePath + '/dom/FunctionDigest');
var Type = require(basePath + '/dom/Type');



/**
 * A class for a definition of a member.
 * @param {jsdoc.Doclet} symbol Symbol.
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
tsumekusa.inherits(MethodDefinition, MemberDefinition);


/** @override */
MethodDefinition.prototype.createDigest = function(symbol) {
  return new FunctionDigest(symbol, this.getDocHelper(),
      this.getReferenceHelper());
};


/**
 * Creates a parameters container.
 * @param {jsdoc.Doclet} symbol Method symbol.
 * @return {tsumekusaJsdoc.dom.MethodDefinition.ParametersDefinition}
 *     Created parameters container.
 */
MethodDefinition.prototype.createParametersDefinition = function(symbol) {
  return new MethodDefinition.ParametersDefinition(symbol,
      this.getDocHelper(), this.getReferenceHelper());
};


/**
 * Creates a parameters container.
 * @param {jsdoc.Doclet} symbol Method symbol.
 * @return {tsumekusaJsdoc.dom.MethodDefinition.ReturnsDefinition}
 *     Created returns container.
 */
MethodDefinition.prototype.createReturnsDefinition = function(symbol) {
  return new MethodDefinition.ReturnsDefinition(symbol,
      this.getDocHelper(), this.getReferenceHelper());
};



// Parameters definition {{{
/**
 * A class for a definition of a method parameters.
 * @param {jsdoc.Doclet} symbol Symbol.
 * @param {?tsumekusaJsdoc.dom.DocHelper=} opt_docHelper Optional
 *     document helper.
 * @param {?tsumekusaJsdoc.references.ReferenceHelper=} opt_refHelper Optional
 *     reference helper.
 * @constructor
 * @extends {tsumekusaJsdoc.dom.DocElement}
 */
MethodDefinition.ParametersDefinition = function(symbol, opt_docHelper,
    opt_refHelper) {
  DocElement.call(this, opt_docHelper, opt_refHelper);
  var docHelper = this.getDocHelper();
  var def = new DefinitionList.Definition();

  var dt = this.getCaption();
  var dd = new ElementArray();

  def.setTerm(dt);
  def.setDescriptions(dd);

  var innerDl = new DefinitionList(DefinitionList.ListType.NO_MARKER);
  dd.addChild(innerDl);

  if (symbol.params) {
    symbol.params.forEach(function(tag) {
      var desc = new ElementArray();
      desc.addChildren(docHelper.parseBlocks(tag.text || tsumekusaJsdoc.
          NO_DESCRIPTION));

      var type = new Type(tag);
      var paramName = tsumekusaJsdoc.decorateParamName(tag);
      var caption = new Paragraph(paramName + ':', type.getElement());

      innerDl.addDefinition(caption, desc);
    }, this);
  }

  this.setElement(def);
};
tsumekusa.inherits(MethodDefinition.ParametersDefinition, DocElement);


/**
 * Default caption for parameter definitions.
 * @const
 * @type {string}
 */
MethodDefinition.ParametersDefinition.CAPTION = 'Parameters';


/**
 * Retruns a caption of parameter definitions.
 * @return {string} Caption string for parameter definitions.
 */
MethodDefinition.ParametersDefinition.prototype.getCaption = function() {
  return MethodDefinition.ParametersDefinition.CAPTION;
};
//}}}



// Returns definition {{{
/**
 * A class for a definition of a method returns.
 * @param {jsdoc.Doclet} symbol Symbol.
 * @param {?tsumekusaJsdoc.dom.DocHelper=} opt_docHelper Optional
 *     document helper.
 * @param {?tsumekusaJsdoc.references.ReferenceHelper=} opt_refHelper Optional
 *     reference helper.
 * @constructor
 * @extends {tsumekusaJsdoc.dom.DocElement}
 */
MethodDefinition.ReturnsDefinition = function(symbol, opt_docHelper,
    opt_refHelper) {
  DocElement.call(this, opt_docHelper, opt_refHelper);
  var docHelper = this.getDocHelper();
  var def = new DefinitionList.Definition();

  var dt = this.getCaption();
  var dd = new ElementArray();

  def.setTerm(dt);
  def.setDescriptions(dd);

  var innerDl = new DefinitionList(DefinitionList.ListType.NO_MARKER);
  dd.addChild(innerDl);

  if (symbol.returns) {
    symbol.returns.forEach(function(tag) {
      var desc = new ElementArray();
      desc.addChildren(docHelper.parseBlocks(tag.text || tsumekusaJsdoc.
          NO_DESCRIPTION));

      var type = new Type(tag);
      var caption = new Paragraph(type.getElement());

      innerDl.addDefinition(caption, desc);
    }, this);
  }

  this.setElement(def);
};
tsumekusa.inherits(MethodDefinition.ReturnsDefinition, DocElement);


/**
 * Default caption for parameter definitions.
 * @const
 * @type {string}
 */
MethodDefinition.ReturnsDefinition.CAPTION = 'Returns';


/**
 * Retruns a caption of parameter definitions.
 * @return {string} Caption string for parameter definitions.
 */
MethodDefinition.ReturnsDefinition.prototype.getCaption = function() {
  return MethodDefinition.ReturnsDefinition.CAPTION;
};
//}}}


// Exports the constructor.
module.exports = MethodDefinition;
