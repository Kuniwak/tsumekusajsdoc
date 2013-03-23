// This script licensed under the MIT.
// http://orgachem.mit-license.org

var tsumekusaPath = '../../tsumekusa';
var tsumekusa = require(tsumekusaPath);
var Paragraph = require(tsumekusaPath + '/dom/Paragraph');
var DefinitionList = require(tsumekusaPath + '/dom/DefinitionList');
var ElementArray = require(tsumekusaPath + '/dom/ElementArray');

var basePath = '../../tsumekusaJsdoc';
var tsumekusaJsdoc = require(basePath);
var DocElement = require(basePath +
    '/dom/DocElement');


/**
 * A class for a definition of a member.
 * @param {jsdoc.Doclet} symbol Symbol.
 * @param {?tsumekusaJsdoc.dom.DocHelper=} opt_docHelper Optional
 *     document helper.
 * @param {?tsumekusaJsdoc.references.ReferenceHelper=} opt_refHelper Optional
 *     reference helper.
 * @constructor
 * @extends {tsumekusaJsdoc.dom.DocElement}
 */
var MemberDefinition = function(symbol, opt_docHelper, opt_refHelper) {
  DocElement.call(this, opt_docHelper, opt_refHelper);
  var def = new DefinitionList.Definition();
  var dt = new Paragraph();
  var dd = new ElementArray();

  def.setTerm(dt);
  def.setDescriptions(dd);

  dt.addInlineElement(this.createDigest(symbol));
  dd.addChildren(this.createSummaryBlocks(symbol));

  this.dd_ = dd;
  this.setElement(def);
};
tsumekusa.inherits(MemberDefinition, DocElement);


/**
 * Creates a member digest such as {@code 'foo: string|null'}.
 * @param {jsdoc.Doclet} symbol Symbol.
 * @return {tsumekusaJsdoc.dom.Digest} Member digest.
 */
MemberDefinition.prototype.createDigest = tsumekusa.abstractMethod;


/**
 * Creates contents as a member summary.
 * @param {jsdoc.Doclet} symbol Symbol.
 * @return {Array.<tsumekusa.dom.BlockElement>} Top contents.
 */
MemberDefinition.prototype.createSummaryBlocks = function(symbol) {
  var blocks = this.getDocHelper().parseBlocks(
      symbol.description || tsumekusaJsdoc.NO_DESCRIPTION, symbol);
  return blocks;
};


/**
 * Returns definition descriptions.
 * @return {tsumekusa.dom.ElementArray} Definition description.
 */
MemberDefinition.prototype.getDefinitionDescritions = function() {
  return this.dd_;
};


// Exports the constructor.
module.exports = MemberDefinition;
