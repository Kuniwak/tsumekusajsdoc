// This script licensed under the MIT.
// http://orgachem.mit-license.org


var tsumekusaPath = '../../tsumekusa';
var tsumekusa = require(tsumekusaPath);
var Container = require(tsumekusaPath + '/dom/Container');
var Paragraph = require(tsumekusaPath + '/dom/Paragraph');

var basePath = '../../tsumekusaJsdoc';
var tsumekusaJsdoc = require(basePath);
var DocumentationContent = require(basePath +
    '/dom/DocumentationContent');



/**
 * A class for a container explains any member.
 * @param {jsdoc.Doclet} symbol Symbol.
 * @param {?Array.<tsumekusa.dom.Paragraph>=} opt_topContents Optional top
 *     contents.
 * @param {?tsumekusaJsdoc.dom.DocumentHelper=} opt_docHelper Optional
 *     document helper.
 * @param {?tsumekusaJsdoc.references.ReferenceHelper=} opt_refHelper Optional
 *     reference helper.
 * @constructor
 * @extends {tsumekusaJsdoc.dom.DocumentationContent}
 */
var MemberContainer = function(symbol, opt_topContents, opt_docHelper,
    opt_refHelper) {
  DocumentationContent.call(this, opt_docHelper, opt_refHelper);
  var refId = this.getReferenceHelper().getReferenceId(symbol);
  var container = new Container(symbol.longname, refId, true);
  this.setContent(container);

  var topBlocks = container.getTopContents();

  var blocks = this.createSummaryBlocks(symbol);
  topBlocks.addChildren(blocks);

  if (opt_topContents) {
    topBlocks.addChildren(opt_topContents);
  }
};
tsumekusa.inherits(MemberContainer, DocumentationContent);


/**
 * Creates a top content for a member summary.
 * @param {jsdoc.Doclet} symbol Symbol.
 * @return {Array.<tsumekusa.dom.BlockContent>} Top contents.
 */
MemberContainer.prototype.createSummaryBlocks = function(symbol) {
  var digest = new Paragraph();
  digest.addInlineContent(this.createDigest(symbol));

  var blocks = this.getDocumentHelper().parseBlocks(
      symbol.description || tsumekusaJsdoc.NO_DESCRIPTION, symbol);
  
  return [digest].concat(blocks);
};


/**
 * Creates a member digest such as {@code 'foo: string | null'}.
 * @param {jsdoc.Doclet} symbol Symbol.
 * @return {tsumekusaJsdoc.dom.Digest} Member digest.
 */
MemberContainer.prototype.createDigest = tsumekusa.abstractMethod;


// Exports the constructor.
module.exports = MemberContainer;
