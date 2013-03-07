// This script licensed under the MIT.
// http://orgachem.mit-license.org


var tsumekusa = require('../../tsumekusa');
var DocumentationContent = require('./DocumentationContent');



/**
 * A class for document explains a class.
 * @param {jsdoc.Doclet} symbol Class symbol.
 * @param {?string=} opt_version Optional version identifier.
 * @param {?Date=} opt_date Optional date object.
 * @param {?tsumekusaJsdoc.documents.DocumentHelper=} opt_docHelper Optional
 *     document helper.
 * @param {?tsumekusaJsdoc.references.ReferenceHelper=} opt_refHelper Optional
 *     reference helper.
 * @constructor
 * @extends {tsumekusaJsDoc.documents.DocumentationContent}
 */
var SymbolDocument = function(symbol, caption, opt_version, opt_date,
    opt_docHelper, opt_refHelper) {
  DocumentationContent.call(this, opt_docHelper, opt_refHelper);

  this.symbol_ = symbol;

  this.fileName_ = this.generateFileName(symbol);
  var document = new Document(caption, this.fileName_, opt_version, opt_date);

  this.setContent(document);
};
tsumekusa.inherits(SymbolDocument, DocumentationContent);


/**
 * Symbol that the document explains.
 * @type {jsdoc.Doclet}
 * @private
 */
SymbolDocument.prototype.symbol_ = null;


/**
 * File name of the document.
 * @type {string}
 * @private
 */
SymbolDocument.prototype.fileName_ = null;


/**
 * Returns a symbol that the document explains.
 * @return {jsdoc.Doclet} Symbol.
 */
SymbolDocument.prototype.getSymbol = function() {
  return this.symbol_;
};


/**
 * Publishes a document to file.
 */
SymbolDocument.prototype.publishToFile = function() {
  // TODO: ansynchronize
  //fs.writeFileSync(this.fileName_, this.publishToFileInternal(), 'utf8');
  console.log(this.publishToFileInternal());
};


/**
 * Returns a document string to publish.
 * @return {string} Document string to be published to a file.
 * @protected
 */
SymbolDocument.prototype.publishToFileInternal = function() {
  return this.publish();
};


/**
 * Generates a file name of the document to publish.
 * @return {string} File name.
 * @protected
 */
SymbolDocument.prototype.generateFileName = function(symbol) {
  var refHelper = this.getReferenceHelper();
  return fileName = refHelper.getFileName(symbol);
};
