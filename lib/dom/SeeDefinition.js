// This script licensed under the MIT.
// http://orgachem.mit-license.org


var tsumekusa = require('tsumekusa');
var util = tsumekusa.util;
var DefinitionList = tsumekusa.DefinitionList;
var Link = tsumekusa.Link;
var ElementArray = tsumekusa.ElementArray;
var Paragraph = tsumekusa.Paragraph;

var basePath = '../../lib';
var DocElement = require(basePath + '/dom/DocElement');



/**
 * A class for a definition of a see tag.
 * @param {jsdoc.Tag} see See tag.
 * @param {?tsumekusaJsdoc.dom.DocHelper=} opt_docHelper Optional
 *     document helper.
 * @param {?tsumekusaJsdoc.references.ReferenceHelper=} opt_refHelper Optional
 *     reference helper.
 * @constructor
 * @extends {tsumekusaJsdoc.dom.DocElement}
 */
var SeeDefinition = function(see, opt_docHelper, opt_refHelper) {
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

  see.forEach(function(lnk) {
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
