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
 * @param {tsumekusaJsdoc.dom.DocletWrapper} symbol Deprecated symbol.
 * @param {?tsumekusaJsdoc.dom.DocHelper=} opt_docHelper Optional
 *     document helper.
 * @param {?tsumekusaJsdoc.references.ReferenceHelper=} opt_refHelper Optional
 *     reference helper.
 * @constructor
 * @extends {tsumekusaJsdoc.dom.DocElement}
 */
var DeprecationDefinition = function(symbol, opt_docHelper, opt_refHelper) {
  DocElement.call(this, opt_docHelper, opt_refHelper);
  var str = symbol.deprecated;
  var def = new DefinitionList.Definition();
  var dt = new Paragraph();
  var dd = new ElementArray();
  var p = new Paragraph();

  def.setTerm(dt);
  def.setDescriptions(dd);

  dt.addInlineElement(DeprecationDefinition.CAPTION);
  dd.addChild(p);

  var docHelper = this.getDocHelper();
  var elems = docHelper.parseInlineTags(str, symbol);
  elems = elems.map(function(elem) {
    return typeof elem === 'string' ? new Strong(elem) : elem;
  });

  p.addInlineElements(elems);

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
