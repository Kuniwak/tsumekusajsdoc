// This script licensed under the MIT.
// http://orgachem.mit-license.org


var tsumekusaPath = '../../tsumekusa';
var tsumekusa = require(tsumekusaPath);
var string = require(tsumekusaPath + '/string');
var Container = require(tsumekusaPath + '/contents/Container');
var ContentArray = require(tsumekusaPath + '/contents/ContentArray');
var Paragraph = require(tsumekusaPath + '/contents/Paragraph');
var DefinitionList = require(tsumekusaPath + '/contents/DefinitionList');

var basePath = '../../tsumekusaJsdoc';
var tsumekusaJsdoc = require(basePath);
var DocumentationContent = require(basePath +
    '/documents/DocumentationContent');
var MemberContainer = require(basePath + '/documents/MemberContainer');
var Type = require(basePath + '/documents/Type');
var FunctionDigest = require(basePath + '/documents/FunctionDigest');



/**
 * A class for a container explains a method.
 * @param {jsdoc.Doclet} symbol Method symbol.
 * @param {?Array.<tsumekusa.dom.Paragraph>=} opt_topContents Optional top
 *     contents.
 * @param {?tsumekusaJsdoc.documents.DocumentHelper=} opt_docHelper Optional
 *     document helper.
 * @param {?tsumekusaJsdoc.references.ReferenceHelper=} opt_refHelper Optional
 *     reference helper.
 * @constructor
 * @extends {tsumekusaJsdoc.documents.MemberContainer}
 */
var MethodContainer = function(symbol, opt_topContents, opt_docHelper,
    opt_refHelper) {
  MemberContainer.call(this, symbol, opt_topContents, opt_docHelper,
      opt_refHelper);

  var container = this.getContent();
  var subContainers = container.getSubContainers();

  if (tsumekusaJsdoc.hasParam(symbol)) {
    subContainers.addChild(this.createParametersContainer(symbol));
  }
  if (tsumekusaJsdoc.hasReturn(symbol)) {
    subContainers.addChild(this.createReturnsContainer(symbol));
  }
};
tsumekusa.inherits(MethodContainer, MemberContainer);


/**
 * Default modifier for parameters section.
 * @const
 * @type {string}
 */
MethodContainer.PARAMS_MODIFIER = 'params';


/**
 * Default modifier for returns section.
 * @const
 * @type {string}
 */
MethodContainer.RETURNS_MODIFIER = 'returns';


/**
 * Default caption for parameters section.
 * @const
 * @type {string}
 */
MethodContainer.PARAMS_CAPTION = 'Parameters';


/**
 * Default caption for returns section.
 * @const
 * @type {string}
 */
MethodContainer.RETURNS_CAPTION = 'Returns';


/**
 * Whether document verbose parameters enabled.
 * @const
 * @type {boolean}
 */
MethodContainer.VERBOSE_PARAM = false;


/** @override */
MethodContainer.prototype.createDigest = function(symbol) {
  return new FunctionDigest(symbol, this.getDocumentHelper(),
      this.getReferenceHelper());
};


/**
 * Creates a parameters container.
 * @param {jsdoc.Doclet} symbol Method symbol.
 * @return {tsumekusaJsdoc.documents.MethodContainer.ParametersContainer}
 *     Created parameters container.
 */
MethodContainer.prototype.createParametersContainer = function(symbol) {
  return new MethodContainer.ParametersContainer(symbol, this,
      this.getDocumentHelper(), this.getReferenceHelper());
};


/**
 * Creates a parameters container.
 * @param {jsdoc.Doclet} symbol Method symbol.
 * @return {tsumekusaJsdoc.documents.MethodContainer.ReturnsContainer}
 *     Created returns container.
 */
MethodContainer.prototype.createReturnsContainer = function(symbol) {
  return new MethodContainer.ReturnsContainer(symbol, this,
      this.getDocumentHelper(), this.getReferenceHelper());
};



/**
 * A class for a container explains method parameters.
 * @param {jsdoc.Doclet} symbol Symbol.
 * @param {tsumekusaJsdoc.documents.MethodContainer} parent Parent container.
 * @param {?tsumekusaJsdoc.documents.DocumentHelper=} opt_docHelper Optional
 *     document helper.
 * @param {?tsumekusaJsdoc.references.ReferenceHelper=} opt_refHelper Optional
 *     reference helper.
 * @constructor
 * @extends {tsumekusaJsdoc.documents.DocumentationContent}
 */
MethodContainer.ParametersContainer = function(symbol, parent, opt_docHelper,
    opt_refHelper) {
  DocumentationContent.call(this, opt_docHelper, opt_refHelper);
  var docHelper = this.getDocumentHelper();

  var refId = this.getReferenceHelper().getReferenceId(symbol, MethodContainer.
      PARAMS_MODIFIER);

  var container = new Container(MethodContainer.PARAMS_CAPTION, refId);
  var topContents = container.getTopContents();
  var defs = new DefinitionList(DefinitionList.ListType.UNORDERED);
  topContents.addChild(defs);

  if (symbol.params) {
    symbol.params.forEach(function(tag) {
      var desc = new ContentArray();
      desc.addChildren(docHelper.parseBlocks(tag.text || tsumekusaJsdoc.
          NO_DESCRIPTION));

      var type = new Type(tag);
      var paramName = tsumekusaJsdoc.decorateParamName(tag);
      var caption = new Paragraph(paramName + ':', type);

      defs.addDefinition(caption, desc);
    }, this);
  }

  this.setContent(container);
};
tsumekusa.inherits(MethodContainer.ParametersContainer, DocumentationContent);



/**
 * A class for a container explains method returns.
 * @param {jsdoc.Doclet} symbol Symbol.
 * @param {tsumekusaJsdoc.documents.MethodContainer} parent Parent container.
 * @param {?tsumekusaJsdoc.documents.DocumentHelper=} opt_docHelper Optional
 *     document helper.
 * @param {?tsumekusaJsdoc.references.ReferenceHelper=} opt_refHelper Optional
 *     reference helper.
 * @constructor
 * @extends {tsumekusaJsdoc.documents.DocumentationContent}
 */
MethodContainer.ReturnsContainer = function(symbol, parent, opt_docHelper,
    opt_refHelper) {
  DocumentationContent.call(this, opt_docHelper, opt_refHelper);
  var docHelper = this.getDocumentHelper();

  var refId = this.getReferenceHelper().getReferenceId(symbol, MethodContainer.
      RETURNS_MODIFIER);

  var container = new Container(MethodContainer.RETURNS_CAPTION, refId);
  var defs = new DefinitionList(DefinitionList.ListType.UNORDERED);

  if (symbol.returns) {
    symbol.returns.forEach(function(tag) {
      var desc = new ContentArray();
      desc.addChildren(docHelper.parseBlocks(tag.text || tsumekusaJsdoc.
          NO_DESCRIPTION));

      var type = new Type(tag);
      var caption = new Paragraph(type);

      defs.addDefinition(caption, desc);
    }, this);
  }

  container.addTopContent(defs);
  this.setContent(container);
};
tsumekusa.inherits(MethodContainer.ReturnsContainer, DocumentationContent);


// Exports the constructor.
module.exports = MethodContainer;
