// This script licensed under the MIT.
// http://orgachem.mit-license.org


var tsumekusa = require('../../tsumekusa');
var Container = require('../../tsumekusa/contents/Container');
var Sentence = require('../../tsumekusa/contents/Sentence');
var DefinitionList = require('../../tsumekusa/contents/DefinitionList');

var tsumekusaJsdoc = require('../../tsumekusaJsdoc');
var DocumentationContent = require('./DocumentationContent');
var MemberContainer = require('./MemberContainer');
var TypeSentence = require('./TypeSentence');



/**
 * A class for a container explains a method.
 * @param {jsdoc.Doclet} symbol Method symbol.
 * @param {?tsumekusaJsdoc.documents.DocumentHelper=} opt_docHelper Optional
 *     document helper.
 * @param {?tsumekusaJsdoc.references.ReferenceHelper=} opt_refHelper Optional
 *     reference helper.
 * @constructor
 * @extends {tsumekusaJsDoc.documents.MemberContainer}
 */
var MethodContainer = function(symbol, opt_docHelper, opt_refHelper) {
  MemberContainer.call(this, symbol, opt_docHelper, opt_refHelper);
  var container = this.getContent();
  var params = this.createParametersContainer(symbol);
  var returns = this.createReturnsContainer(symbol);

  container.appendSubContainer(params);
  container.appendSubContainer(returns);
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


/** @override */
MethodContainer.prototype.createDetailSentence = function(symbol) {
  var sentence = new Sentence();
  var paramsMax, returnsMax;

  // current detail string as: foobar(
  sentence.appendInlineContent(symbol.longname + '(');

  if (symbol.params) {
    paramsMax = symbol.params.length - 1;
    // current detail string as: foobar( arg1, arg2, arg3
    symbol.params.forEach(function(tag, index) {
      var links = new TypeSentence(tag);
      var paramName = this.createParameterNameString(tag.name);
      sentence.extend(links.getContent());
      sentence.appendInlineContent(paramName + (index < paramsMax ? ',' : ''));
    }, this);
  }

  // current detail string as: foobar( arg1, arg2, arg3 )
  sentence.appendInlineContent(')');

  if (symbol.returns) {
    returnsMax = symbol.returns.length - 1;
    // current detail string as: foobar( arg1, arg2, arg3 ) =>
    sentence.appendInlineContent('=>');

    // current detail string as: foobar( arg1, arg2, arg3 ) => val
    symbol.returns.forEach(function(tag, index) {
      var links = new TypeSentence(tag);
      sentence.extend(links);
      if (index < returnsMax) {
        sentence.appendInlineContent(',');
      }
    }, this);
  }

  return sentence;
};


/**
 * Creates a parameter name string.
 * @param {jsdoc.Tag} tag Parameter tag.
 * @return {string} Parameter name.
 */
MethodContainer.prototype.createParameterNameString = function(tag) {
  var name = tag.name;

  // display 'foo...' as the tag name if the parameter is variable.
  if (tag.variable) {
    name += '...';
  }

  // display '[foo]' as the tag name if the parameter is optional.
  if (tag.optional) {
    name = '[' + name + ']';
  }

  return name;
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
 * @extends {tsumekusaJsDoc.documents.DocumentationContent}
 */
MethodContainer.ParametersContainer = function(symbol, parent, opt_docHelper,
    opt_refHelper) {
  DocumentationContent.call(this, opt_docHelper, opt_refHelper);
  var docHelper = this.getDocumentHelper();

  var refId = this.getReferenceHelper().getReferenceId(symbol, MethodContainer.
      PARAMS_MODIFIER);

  var container = new Container(MethodContainer.PARAMS_CAPTION, refId);
  var defs = new DefinitionList(DefinitionList.ListType.UNORDERED);

  if (symbol.params) {
    symbol.params.forEach(function(tag) {
      var desc = docHelper.createSentence(tag.text || tsumekusaJsdoc.
          NO_DESCRIPTION);

      var signature = new TypeSentence(tag);
      var paramName = parent.createParameterNameString(tag);

      // Add the type name to head.
      signature.getContent().appendInlineContentAt(paramName + ':', 0);

      defs.appendDefinition(signature, desc);
    }, this);
  }

  container.appendTopContent(defs);
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
 * @extends {tsumekusaJsDoc.documents.DocumentationContent}
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
      var desc = docHelper.createSentence(tag.text || tsumekusaJsdoc.
          NO_DESCRIPTION);

      var signature = new TypeSentence(tag);

      defs.appendDefinition(signature, desc);
    }, this);
  }

  container.appendTopContent(defs);
  this.setContent(container);
};
tsumekusa.inherits(MethodContainer.ReturnsContainer, DocumentationContent);


// Exports the constructor.
module.exports = MethodContainer;
