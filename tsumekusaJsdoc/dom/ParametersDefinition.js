// This script licensed under the MIT.
// http://orgachem.mit-license.org


var tsumekusaPath = '../../tsumekusa';
var tsumekusa = require(tsumekusaPath);
var ElementArray = require(tsumekusaPath + '/dom/ElementArray');
var InlineCode = require(tsumekusaPath + '/dom/InlineCode');
var Paragraph = require(tsumekusaPath + '/dom/Paragraph');
var DefinitionList = require(tsumekusaPath + '/dom/DefinitionList');

var basePath = '../../tsumekusaJsdoc';
var tsumekusaJsdoc = require(basePath);
var DocElement = require(basePath + '/dom/DocElement');
var Type = require(basePath + '/dom/Type');



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
ParametersDefinition = function(symbol, opt_docHelper, opt_refHelper) {
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
      var paramName = new InlineCode(tsumekusaJsdoc.decorateParamName(tag));
      var caption = new Paragraph(paramName, ':', type.getElement());

      innerDl.addDefinition(caption, desc);
    }, this);
  }

  this.setElement(def);
};
tsumekusa.inherits(ParametersDefinition, DocElement);


/**
 * Default caption for parameter definitions.
 * @const
 * @type {string}
 */
ParametersDefinition.CAPTION = 'Parameters';


/**
 * Retruns a caption of parameter definitions.
 * @return {string} Caption string for parameter definitions.
 */
ParametersDefinition.prototype.getCaption = function() {
  return ParametersDefinition.CAPTION;
};


// Exports the constructor.
module.exports = ParametersDefinition;
