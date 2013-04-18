// This script licensed under the MIT.
// http://orgachem.mit-license.org

/**
 * @fileoverview A class for definitions of a visility tag.
 * @author orga.chem.job@gmail.com (OrgaChem)
 */


var tsumekusa = require('../../node_modules/tsumekusa');
var util = tsumekusa.util;
var DefinitionList = tsumekusa.DefinitionList;
var Strong = tsumekusa.Strong;
var ElementArray = tsumekusa.ElementArray;
var Paragraph = tsumekusa.Paragraph;

var basePath = '../../lib';
var DocElement = require(basePath + '/dom/DocElement');



/**
 * A class for definitions of a visility tag.
 * @param {string} visility Visibility such as protected, private, public.
 * @param {?module:lib/dom/DocHelper=} opt_docHelper Optional
 *     document helper.
 * @param {?module:lib/references/ReferenceHelper=} opt_refHelper Optional
 *     reference helper.
 * @constructor
 * @extends {module:lib/dom/DocElement}
 * @exports lib/dom/VisibilityDefinition
 */
var VisibilityDefinition = function(visility, opt_docHelper, opt_refHelper) {
  DocElement.call(this, opt_docHelper, opt_refHelper);
  var def = new DefinitionList.Definition();
  var dt = new Paragraph();
  var dd = new ElementArray();
  var p = new Paragraph();

  def.setTerm(dt);
  def.setDescriptions(dd);

  dt.addInlineElement(VisibilityDefinition.CAPTION);
  dd.addChild(p);

  p.addInlineElement(new Strong(visility));

  this.setElement(def);
};
util.inherits(VisibilityDefinition, DocElement);


/**
 * Caption of a deprecation definition.
 * @const
 * @type {string}
 */
VisibilityDefinition.CAPTION = 'Visibility';


// Exports the constructor.
module.exports = VisibilityDefinition;
