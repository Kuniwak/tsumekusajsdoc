// This script licensed under the MIT.
// http://orgachem.mit-license.org


var tsumekusa = require('../../tsumekusa');
var Sentence = require('../../tsumekusa/contents/Sentence');
var DocumentationContent = require('./DocumentationContent');
var MemberContainer = require('./MemberContainer');
var TypeSentence = require('./TypeSentence');



/**
 * A class for a container explains a method.
 * @param {jsdoc.Doclet} symbol Method symbol.
 * @param {?tsumekusaJsdoc.documents.DocumentHelper=} opt_docHelper Optional
 *     document helper.
 * @param {?tsumekusaJsdoc.references.ReferenceHelper=} opt_refHelper Optional
 *     reference helper.
 * @constructor
 * @extends {tsumekusaJsDoc.documents.MemberContainer}
 */
var PropertyContainer = function(symbol, opt_docHelper, opt_refHelper) {
  MemberContainer.call(this, symbol, opt_docHelper, opt_refHelper);
};
tsumekusa.inherits(PropertyContainer, MemberContainer);


/** @override */
PropertyContainer.prototype.createDetailSentence = function(symbol) {
  var sentence = new Sentence();
  var typeMax;

  if (symbol.type) {
    typeMax = symbol.type.length - 1;

    sentence.appendInlineContent(symbol.longname + ':');

    var links = new TypeSentence(symbol.type);
    sentence.appendInlineContents(links);
  }

  return sentence;
};


// Exports the constructor.
module.exports = PropertyContainer;
