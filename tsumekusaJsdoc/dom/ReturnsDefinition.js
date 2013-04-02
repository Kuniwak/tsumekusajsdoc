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
var Type = require(basePath + '/dom/Type');



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
ReturnsDefinition = function(symbol, opt_docHelper, opt_refHelper) {
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
      desc.addChildren(docHelper.parseBlocks(tag.description || tsumekusaJsdoc.
          NO_DESCRIPTION));

      var type = new Type(tag);
      var caption = new Paragraph(type.getElement());

      innerDl.addDefinition(caption, desc);
    }, this);
  }

  this.setElement(def);
};
tsumekusa.inherits(ReturnsDefinition, DocElement);


/**
 * Default caption for parameter definitions.
 * @const
 * @type {string}
 */
ReturnsDefinition.CAPTION = 'Returns';


/**
 * Retruns a caption of parameter definitions.
 * @return {string} Caption string for parameter definitions.
 */
ReturnsDefinition.prototype.getCaption = function() {
  return ReturnsDefinition.CAPTION;
};


// Exports the constructor.
module.exports = ReturnsDefinition;
