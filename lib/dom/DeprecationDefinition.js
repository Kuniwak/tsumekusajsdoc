// This script licensed under the MIT.
// http://orgachem.mit-license.org

/**
 * @fileoverview A class for definitions of a deprecation tag.
 * @author orga.cham.job@gmail.com (Orga Chem)
 */


var tsumekusa = require('../../node_modules/tsumekusa');
var util = tsumekusa.util;

var basePath = '../../lib';
var DocElement = require(basePath + '/dom/DocElement');



/**
 * A class for definitions of a deprecation tag.
 * @param {module:lib/dom/DocletWrapper} symbol Deprecated symbol.
 * @param {?module:lib/dom/DocHelper=} opt_docHelper Optional
 *     document helper.
 * @param {?module:lib/references/ReferenceHelper=} opt_refHelper Optional
 *     reference helper.
 * @constructor
 * @extends {module:lib/dom/DocElement}
 * @exports lib/dom/DeprecationDefinition
 */
var DeprecationDefinition = function(symbol, opt_docHelper, opt_refHelper) {
  DocElement.call(this, opt_docHelper, opt_refHelper);
  var str = symbol.deprecated;
  var def = new tsumekusa.DefinitionList.Definition();
  var dt = new tsumekusa.Paragraph();
  var dd = new tsumekusa.ElementArray();
  var p = new tsumekusa.Paragraph();

  def.setTerm(dt);
  def.setDescriptions(dd);

  dt.addInlineElement(DeprecationDefinition.CAPTION);
  dd.addChild(p);

  var docHelper = this.getDocHelper();
  var elems = docHelper.parseInlineTags(str, symbol);
  elems = elems.map(function(elem) {
    return typeof elem === 'string' ? new tsumekusa.Strong(elem) : elem;
  });

  p.addInlineElements(elems);

  this.setElement(def);
};
util.inherits(DeprecationDefinition, DocElement);


/**
 * Caption of a deprecation definition.
 * @const
 * @type {string}
 */
DeprecationDefinition.CAPTION = 'Deprecated';


// Exports the constructor.
module.exports = DeprecationDefinition;
