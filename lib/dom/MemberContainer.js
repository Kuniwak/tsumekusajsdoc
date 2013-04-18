// This script licensed under the MIT.
// http://orgachem.mit-license.org

/**
 * @fileoverview A class for containers explain any member.
 * @author orga.cham.job@gmail.com (Orga Chem)
 */


var tsumekusa = require('../../node_modules/tsumekusa');
var util = tsumekusa.util;
var Container = tsumekusa.Container;
var Paragraph = tsumekusa.Paragraph;

var basePath = '../../lib';
var tsumekusaJsdoc = require(basePath);
var DocElement = require(basePath + '/dom/DocElement');



/**
 * A class for containers explain any member.
 * @param {module:lib/dom/DocletWrapper} symbol Symbol.
 * @param {?module:lib/dom/DocHelper=} opt_docHelper Optional
 *     document helper.
 * @param {?module:lib/references/ReferenceHelper=} opt_refHelper Optional
 *     reference helper.
 * @constructor
 * @extends {module:lib/dom/DocElement}
 * @exports lib/dom/MemberContainer
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
util.inherits(MemberContainer, DocElement);


/**
 * Creates a top content for a member summary.
 * @param {module:lib/dom/DocletWrapper} symbol Symbol.
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
 * @param {module:lib/dom/DocletWrapper} symbol Symbol.
 * @return {module:lib/dom/Digest} Member digest.
 */
MemberContainer.prototype.createDigest = tsumekusa.abstractMethod;


// Exports the constructor.
module.exports = MemberContainer;
