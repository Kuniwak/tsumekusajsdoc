// This script licensed under the MIT.
// http://orgachem.mit-license.org


var tsumekusa = require('../../tsumekusa');
var string = require('../../tsumekusa/string');
var Sentence = require('../../tsumekusa/contents/Sentence');
var DocumentationContent = require('./DocumentationContent');
var MemberContainer = require('./MemberContainer');
var TypeSentence = require('./TypeSentence');



/**
 * A class for a container explains a method.
 * @param {jsdoc.Doclet} symbol Method symbol.
 * @param {?Array.<tsumekusa.contents.Paragraph>=} opt_topContents Optional top
 *     contents.
 * @param {?tsumekusaJsdoc.documents.DocumentHelper=} opt_docHelper Optional
 *     document helper.
 * @param {?tsumekusaJsdoc.references.ReferenceHelper=} opt_refHelper Optional
 *     reference helper.
 * @constructor
 * @extends {tsumekusaJsDoc.documents.MemberContainer}
 */
var PropertyContainer = function(symbol, opt_topContents, opt_docHelper,
    opt_refHelper) {
  MemberContainer.call(this, symbol, opt_topContents, opt_docHelper,
      opt_refHelper);
};
tsumekusa.inherits(PropertyContainer, MemberContainer);


/** @override */
PropertyContainer.prototype.createDigestSentence = function(symbol) {
  var sentence = new Sentence();

  if (symbol.type) {
    sentence.appendInlineContent('>> ' + symbol.longname + ':');

    var links = new TypeSentence(symbol.type);
    sentence.extend(links);
  }

  return sentence;
};


// Exports the constructor.
module.exports = PropertyContainer;
