// This script licensed under the MIT.
// http://orgachem.mit-license.org

/**
 * @fileoverview A class for definitions of a see tag.
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
 * A class for definitions of a see tag.
 * @param {module:lib/dom/DocletWrapper} symbol Symbol.
 * @param {?module:lib/dom/DocHelper=} opt_docHelper Optional
 *     document helper.
 * @param {?module:lib/references/ReferenceHelper=} opt_refHelper Optional
 *     reference helper.
 * @constructor
 * @extends {module:lib/dom/DocElement}
 * @exports lib/dom/SeeDefinition
 */
var SeeDefinition = function(symbol, opt_docHelper, opt_refHelper) {
  DocElement.call(this, opt_docHelper, opt_refHelper);
  var refHelper = this.getReferenceHelper();
  var def = new DefinitionList.Definition();
  var dt = new Paragraph();
  var dd = new ElementArray();
  var p = new Paragraph();

  def.setTerm(dt);
  def.setDescriptions(dd);

  dt.addInlineElement(SeeDefinition.CAPTION);
  dd.addChild(p);

  symbol.see.forEach(function(lnk) {
    p.addInlineElement(new Link(lnk));
  });

  this.setElement(def);
};
util.inherits(SeeDefinition, DocElement);


/**
 * Caption of a deprecation definition.
 * @const
 * @type {string}
 */
SeeDefinition.CAPTION = 'See';


// Exports the constructor.
module.exports = SeeDefinition;
