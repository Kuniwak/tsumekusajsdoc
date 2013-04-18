// This script licensed under the MIT.
// http://orgachem.mit-license.org

/**
 * @fileoverview A class for definitions of an inherits tag.
 * @author orga.cham.job@gmail.com (Orga Chem)
 */


var tsumekusa = require('../../node_modules/tsumekusa');
var util = tsumekusa.util;
var DefinitionList = tsumekusa.DefinitionList;
var Link = tsumekusa.Link;
var ElementArray = tsumekusa.ElementArray;
var Paragraph = tsumekusa.Paragraph;

var basePath = '../../lib';
var DocElement = require(basePath + '/dom/DocElement');



/**
 * A class for definitions of an inherits tag.
 * @param {module:lib/dom/DocletWrapper} symbol Symbol.
 * @param {?module:lib/dom/DocHelper=} opt_docHelper Optional
 *     document helper.
 * @param {?module:lib/references/ReferenceHelper=} opt_refHelper Optional
 *     reference helper.
 * @constructor
 * @extends {module:lib/dom/DocElement}
 * @exports lib/dom/InheritsDefinition
 */
var InheritsDefinition = function(symbol, opt_docHelper, opt_refHelper) {
  DocElement.call(this, opt_docHelper, opt_refHelper);
  var refHelper = this.getReferenceHelper();
  var def = new DefinitionList.Definition();
  var dt = new Paragraph();
  var dd = new ElementArray();
  var p = new Paragraph(new Link(symbol.inherits));

  def.setTerm(dt);
  def.setDescriptions(dd);

  dt.addInlineElement(InheritsDefinition.CAPTION);
  dd.addChild(p);

  this.setElement(def);
};
util.inherits(InheritsDefinition, DocElement);


/**
 * Caption of a deprecation definition.
 * @const
 * @type {string}
 */
InheritsDefinition.CAPTION = 'Inherits from:';


// Exports the constructor.
module.exports = InheritsDefinition;
