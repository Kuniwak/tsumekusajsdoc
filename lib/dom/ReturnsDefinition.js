// This script licensed under the MIT.
// http://orgachem.mit-license.org

/**
 * @fileoverview A class for definitions of a method returns.
 * @author orga.cham.job@gmail.com (Orga Chem)
 */


var tsumekusa = require('../../node_modules/tsumekusa');
var util = tsumekusa.util;
var DefinitionList = tsumekusa.DefinitionList;
var ElementArray = tsumekusa.ElementArray;
var Paragraph = tsumekusa.Paragraph;

var basePath = '../../lib';
var tsumekusaJsdoc = require(basePath);
var DocElement = require(basePath + '/dom/DocElement');
var Type = require(basePath + '/dom/Type');



/**
 * A class for definitions of a method returns.
 * @param {module:lib/dom/DocletWrapper} symbol Symbol.
 * @param {?module:lib/dom/DocHelper=} opt_docHelper Optional
 *     document helper.
 * @param {?module:lib/references/ReferenceHelper=} opt_refHelper Optional
 *     reference helper.
 * @constructor
 * @extends {module:lib/dom/DocElement}
 * @exports lib/dom/ReturnsDefinition
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
          NO_DESCRIPTION, symbol));

      var type = new Type(tag);
      var caption = new Paragraph(type.getElement());

      innerDl.addDefinition(caption, desc);
    }, this);
  }

  this.setElement(def);
};
util.inherits(ReturnsDefinition, DocElement);


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
  return ReturnsDefinition.CAPTION + ':';
};


// Exports the constructor.
module.exports = ReturnsDefinition;
