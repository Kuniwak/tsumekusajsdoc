// This script licensed under the MIT.
// http://orgachem.mit-license.org


var tsumekusaPath = '../../tsumekusa';
var tsumekusa = require(tsumekusaPath);
var Strong = require(tsumekusaPath + '/dom/Strong');
var ElementArray = require(tsumekusaPath + '/dom/ElementArray');
var Paragraph = require(tsumekusaPath + '/dom/Paragraph');
var DefinitionList = require(tsumekusaPath + '/dom/DefinitionList');

var basePath = '../../tsumekusaJsdoc';
var DocElement = require(basePath + '/dom/DocElement');



/**
 * A class for a definition of a visility tag.
 * @param {string} visility Visibility such as protected, private, public.
 * @param {?tsumekusaJsdoc.dom.DocHelper=} opt_docHelper Optional
 *     document helper.
 * @param {?tsumekusaJsdoc.references.ReferenceHelper=} opt_refHelper Optional
 *     reference helper.
 * @constructor
 * @extends {tsumekusaJsdoc.dom.DocElement}
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
tsumekusa.inherits(VisibilityDefinition, DocElement);


/**
 * Caption of a deprecation definition.
 * @const
 * @type {string}
 */
VisibilityDefinition.CAPTION = 'Visibility';


// Exports the constructor.
module.exports = VisibilityDefinition;
