// This script licensed under the MIT.
// http://orgachem.mit-license.org


var tsumekusaPath = '../../tsumekusa';
var tsumekusa = require(tsumekusaPath);
var Container = require(tsumekusaPath + '/dom/Container');
var Paragraph = require(tsumekusaPath + '/dom/Paragraph');

var basePath = '../../tsumekusaJsdoc';
var tsumekusaJsdoc = require(basePath);
var DocElement = require(basePath + '/dom/DocElement');



/**
 * A class for a container explains any member.
 * @param {tsumekusaJsdoc.dom.DocletWrapper} symbol Symbol.
 * @param {?tsumekusaJsdoc.dom.DocHelper=} opt_docHelper Optional
 *     document helper.
 * @param {?tsumekusaJsdoc.references.ReferenceHelper=} opt_refHelper Optional
 *     reference helper.
 * @constructor
 * @extends {tsumekusaJsdoc.dom.DocElement}
 */
var MemberContainer = function(symbol, opt_docHelper, opt_refHelper) {
  DocElement.call(this, opt_docHelper, opt_refHelper);
  var refId = this.getReferenceHelper().getReferenceId(symbol);
  var container = new Container(symbol.longname, refId, true);
  this.setElement(container);

  var topBlocks = container.getTopElements();

  var blocks = this.createSummaryBlocks(symbol);
  topBlocks.addChildren(blocks);
};
tsumekusa.inherits(MemberContainer, DocElement);


/**
 * Creates a top content for a member summary.
 * @param {tsumekusaJsdoc.dom.DocletWrapper} symbol Symbol.
 * @return {Array.<tsumekusa.dom.BlockElement>} Top contents.
 */
MemberContainer.prototype.createSummaryBlocks = function(symbol) {
  var digest = new Paragraph();
  digest.addInlineElement(this.createDigest(symbol));

  var blocks = this.getDocHelper().parseBlocks(
      symbol.description || tsumekusaJsdoc.NO_DESCRIPTION, symbol);
  
  return [digest].concat(blocks);
};


/**
 * Creates a member digest such as {@code 'foo: string | null'}.
 * @param {tsumekusaJsdoc.dom.DocletWrapper} symbol Symbol.
 * @return {tsumekusaJsdoc.dom.Digest} Member digest.
 */
MemberContainer.prototype.createDigest = tsumekusa.abstractMethod;


// Exports the constructor.
module.exports = MemberContainer;
