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
 * A class for a definition of a deprecation tag.
 * @param {string} str Deprecation description.
 * @param {?tsumekusaJsdoc.dom.DocHelper=} opt_docHelper Optional
 *     document helper.
 * @param {?tsumekusaJsdoc.references.ReferenceHelper=} opt_refHelper Optional
 *     reference helper.
 * @constructor
 * @extends {tsumekusaJsdoc.dom.DocElement}
 */
var DeprecationDefinition = function(str, opt_docHelper, opt_refHelper) {
  DocElement.call(this, opt_docHelper, opt_refHelper);
  var def = new DefinitionList.Definition();
  var dt = new Paragraph();
  var dd = new ElementArray();

  def.setTerm(dt);
  def.setDescriptions(dd);

  dt.addInlineElement(new Strong(DeprecationDefinition.CAPTION));
  dd.addChild(new Paragraph(str));

  this.setElement(def);
};
tsumekusa.inherits(DeprecationDefinition, DocElement);


/**
 * Caption of a deprecation definition.
 * @const
 * @type {string}
 */
DeprecationDefinition.CAPTION = 'Deprecated';


// Exports the constructor.
module.exports = DeprecationDefinition;
