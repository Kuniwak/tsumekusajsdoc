// This script licensed under the MIT.
// http://orgachem.mit-license.org

/**
 * @fileoverview A class for documents explain a symbol such as class or
 * namespace.
 * @author orga.cham.job@gmail.com (Orga Chem)
 */


var fs = require('fs');
var path = require('path');

var tsumekusa = require('../../node_modules/tsumekusa');
var util = tsumekusa.util;
var Document = tsumekusa.Document;

var basePath = '../../lib';
var DocElement = require(basePath + '/dom/DocElement');



/**
 * A class for documents explain a symbol such as class or namespace.
 * @param {module:lib/dom/DocletWrapper} symbol Symbol.
 * @param {string} caption Caption of the document.
 * @param {?module:lib/dom/DocHelper=} opt_docHelper Optional
 *     document helper.
 * @param {?module:lib/references/ReferenceHelper=} opt_refHelper Optional
 *     reference helper.
 * @constructor
 * @extends {module:lib/dom/DocElement}
 * @exports lib/dom/SymbolDocument
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
 * @type {module:lib/dom/DocletWrapper}
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
 * @return {module:lib/dom/DocletWrapper} Symbol.
 */
SymbolDocument.prototype.getSymbol = function() {
  return this.symbol_;
};


/**
 * Publishes a document to a file.
 */
SymbolDocument.prototype.publishToFile = function() {
  fs.mkPath(this.dirPath_);
  fs.writeFileSync(this.fileName_, this.publish(), 'utf8');
};


/**
 * Publishes a document to the console.
 */
SymbolDocument.prototype.publishToConsole = function() {
  console.log(this.publish());
};


// TODO: Move this method into DocumentPublisher.
/**
 * Generates a file name.
 * @param {module:lib/dom/DocletWrapper} symbol Symbol.
 * @return {string} File name.
 * @protected
 */
SymbolDocument.prototype.generateFileName = function(symbol) {
  var refHelper = this.getReferenceHelper();
  return refHelper.getFileName(symbol);
};


/**
 * Generates a directory path.
 * @param {module:lib/dom/DocletWrapper} symbol Symbol.
 * @return {string} File name.
 * @protected
 */
SymbolDocument.prototype.generateDirectoryPath = function(symbol) {
  var refHelper = this.getReferenceHelper();
  return refHelper.getDirectoryPath(symbol);
};


// Exports the constructor.
module.exports = SymbolDocument;
