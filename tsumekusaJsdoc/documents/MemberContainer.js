// This script licensed under the MIT.
// http://orgachem.mit-license.org


var tsumekusa = require('../../tsumekusa');
var Container = require('../../tsumekusa/contents/Container');
var Paragraph = require('../../tsumekusa/contents/Paragraph');

var tsumekusaJsdoc = require('../../tsumekusaJsdoc');
var DocumentationContent = require('./DocumentationContent');



/**
 * A class for a container explains any member.
 * @param {jsdoc.Doclet} symbol Symbol.
 * @param {?Array.<tsumekusa.contents.Paragraph>=} opt_topContents Optional top
 *     contents.
 * @param {?tsumekusaJsdoc.documents.DocumentHelper=} opt_docHelper Optional
 *     document helper.
 * @param {?tsumekusaJsdoc.references.ReferenceHelper=} opt_refHelper Optional
 *     reference helper.
 * @constructor
 * @extends {tsumekusaJsDoc.documents.DocumentationContent}
 */
var MemberContainer = function(symbol, opt_topContents, opt_docHelper,
    opt_refHelper) {
  DocumentationContent.call(this, opt_docHelper, opt_refHelper);
  var refId = this.getReferenceHelper().getReferenceId(symbol);
  var container = new Container(symbol.longname, refId, true);

  this.setContent(container);

  var paragraphs = this.createSummaryParagraphs(symbol);
  container.setTopContents(paragraphs);

  if (opt_topContents) {
    container.setTopContents(opt_topContents);
  }
};
tsumekusa.inherits(MemberContainer, DocumentationContent);


/**
 * Creates a top content for a property summary.
 * @param {jsdoc.Doclet} symbol Symbol.
 * @return {Array.<tsumekusa.contents.Paragraph>} Top contents.
 */
MemberContainer.prototype.createSummaryParagraphs = function(symbol) {
  var p1 = new Paragraph();
  var format = this.createDigestSentence(symbol);
  p1.appendSentence(format);

  var p2 = new Paragraph();
  var desc = this.getDocumentHelper().createSentence(symbol.description ||
      tsumekusaJsdoc.NO_DESCRIPTION);
  p2.appendSentence(desc);

  return [p1, p2];
};


/**
 * Creates a property format.  For example, {@code 'foo: string | null'}.
 * @param {jsdoc.Doclet} symbol Symbol.
 * @return {tsumekusa.publishing.Setence} Property detail sentence.
 */
MemberContainer.prototype.createDigestSentence = tsumekusa.abstractMethod;


// Exports the constructor.
module.exports = MemberContainer;
