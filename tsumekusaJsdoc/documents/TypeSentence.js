// This script licensed under the MIT.
// http://orgachem.mit-license.org


var tsumekusa = require('../../tsumekusa');
var Link = require('../../tsumekusa/contents/Link');
var Sentence = require('../../tsumekusa/contents/Sentence');
var DocumentationContent = require('./DocumentationContent');



/**
 * A class for type notation.
 * @param {jsdoc.Tag} tag Tag.
 * @param {?tsumekusaJsdoc.documents.DocumentHelper=} opt_docHelper Optional
 *     document helper.
 * @param {?tsumekusaJsdoc.references.ReferenceHelper=} opt_refHelper Optional
 *     reference helper.
 * @constructor
 * @extends {tsumekusaJsDoc.documents.DocumentationContent}
 */
var TypeSentence = function(tag, opt_docHelper, opt_refHelper) {
  DocumentationContent.call(this, opt_docHelper, opt_refHelper);

  var typeContents, typeContentsIdx = 0;

  if (tag.type && tag.type.names) {
    typeContents = [];

    tag.type.names.forEach(function(type) {
      typeContents[typeContentsIdx++] = new Link(type);
    }, this);

    if (tag.nullable) {
      typeContents[typeContentsIdx++] = 'null';
    }
  }
  else {
    typeContents = ['?'];
  }

  var sentence = new Sentence();
  var orOperatorChar = this.getOrOperatorChar();

  typeContents.forEach(function(type) {
    sentence.appendInlineContent(type);
    sentence.appendInlineContent(orOperatorChar);
  });

  // Remove a last OR operator.
  sentence.removeInlineContentAt(sentence.getCount());

  this.setContent(sentence);
};
tsumekusa.inherits(TypeSentence, DocumentationContent);


/**
 * Returns a Type operator character for OR.
 * @return {string} Type operator character for OR.
 * @protected
 */
TypeSentence.prototype.getOrOperatorChar = function() {
  return '|';
};


/** @override */
TypeSentence.prototype.isBreakable = function() {
  return this.getContent().isBreakable();
};


// Exports the constructor.
module.exports = TypeSentence;
