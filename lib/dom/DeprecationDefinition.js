// This script licensed under the MIT.
// http://orgachem.mit-license.org


var tsumekusa = require('../../node_modules/tsumekusa');
var util = tsumekusa.util;

var basePath = '../../lib';
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
