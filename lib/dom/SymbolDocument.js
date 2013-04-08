// This script licensed under the MIT.
// http://orgachem.mit-license.org


var fs = require('fs');
var path = require('path');

var tsumekusa = require('../../node_modules/tsumekusa');
var util = tsumekusa.util;
var Document = tsumekusa.Document;

var basePath = '../../lib';
var DocElement = require(basePath + '/dom/DocElement');



/**
 * A class for document explains a symbol such as class or namespace.
 * @param {tsumekusaJsdoc.dom.DocletWrapper} symbol Symbol.
 * @param {string} caption Caption of the document.
 * @param {?tsumekusaJsdoc.dom.DocHelper=} opt_docHelper Optional
 *     document helper.
 * @param {?tsumekusaJsdoc.references.ReferenceHelper=} opt_refHelper Optional
 *     reference helper.
 * @constructor
 * @extends {tsumekusaJsdoc.dom.DocElement}
 */
var SymbolDocument = function(symbol, caption, opt_docHelper, opt_refHelper) {
  DocElement.call(this, opt_docHelper, opt_refHelper);

  this.symbol_ = symbol;
  this.dirPath_ = this.generateDirectoryPath(symbol);
  this.fileName_ = this.generateFileName(symbol);

  var document = new Document(caption, this.fileName_);
  this.setElement(document);
};
util.inherits(SymbolDocument, DocElement);


/**
 * Symbol that the document explains.
 * @type {tsumekusaJsdoc.dom.DocletWrapper}
 * @private
 */
SymbolDocument.prototype.symbol_ = null;


/**
 * File name of the document.
 * @type {?string}
 * @private
 */
SymbolDocument.prototype.fileName_ = null;


/**
 * Directory path of the document.
 * @type {?string}
 * @private
 */
SymbolDocument.prototype.dirPath_ = null;


/**
 * Returns a symbol that the document explains.
 * @return {tsumekusaJsdoc.dom.DocletWrapper} Symbol.
 */
SymbolDocument.prototype.getSymbol = function() {
  return this.symbol_;
};


/**
 * Publishes a document to file.
 */
SymbolDocument.prototype.publishToFile = function() {
  fs.mkPath(this.dirPath_);
  fs.writeFileSync(this.fileName_, this.publishToFileInternal(), 'utf8');
};


/**
 * Returns a document string to publish.
 * @return {string} Document string to be published to a file.
 * @protected
 */
SymbolDocument.prototype.publishToFileInternal = function() {
  return this.publish();
};


// TODO: Move this method into DocumentPublisher.
/**
 * Generates a file name.
 * @return {string} File name.
 * @protected
 */
SymbolDocument.prototype.generateFileName = function(symbol) {
  var refHelper = this.getReferenceHelper();
  return refHelper.getFileName(symbol);
};


/**
 * Generates a directory path.
 * @return {string} File name.
 * @protected
 */
SymbolDocument.prototype.generateDirectoryPath = function(symbol) {
  var refHelper = this.getReferenceHelper();
  return refHelper.getDirectoryPath(symbol);
};


// Exports the constructor.
module.exports = SymbolDocument;
