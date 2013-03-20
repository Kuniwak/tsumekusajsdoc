// This script licensed under the MIT.
// http://orgachem.mit-license.org


var tsumekusa = require('../../tsumekusa');
var Document = require('../../tsumekusa/contents/Document');
var SymbolDocument = require('./SymbolDocument');
var StaticMethodsContainer = require('./StaticMethodsContainer');
var StaticPropertiesContainer = require('./StaticPropertiesContainer');



/**
 * A class for document explains a namespace.
 * @param {jsdoc.Doclet} symbol Namespace symbol.
 * @param {?Array.<tsumekusa.contents.Paragraph>=} opt_topContents Optional top
 *     contents.
 * @param {?string=} opt_version Optional version identifier.
 * @param {?Date=} opt_date Optional date object.
 * @param {?tsumekusaJsdoc.documents.DocumentHelper=} opt_docHelper Optional
 *     document helper.
 * @param {?tsumekusaJsdoc.references.ReferenceHelper=} opt_refHelper Optional
 *     reference helper.
 * @constructor
 * @extends {tsumekusaJsdoc.documents.SymbolDocument}
 */
var NamespaceDocument = function(symbol, opt_topContents, opt_version, opt_date,
    opt_docHelper, opt_refHelper) {
  SymbolDocument.call(this, symbol, NamespaceDocument.CAPTION, opt_topContents,
      opt_version, opt_date, opt_docHelper, opt_refHelper);
};
tsumekusa.inherits(NamespaceDocument, SymbolDocument);


// TODO: Adapt mutliple languages.
/**
 * Default caption for a class document.
 * @const
 * @type {string}
 */
NamespaceDocument.CAPTION = 'Namespace';


/** @override */
NamespaceDocument.prototype.publish = function() {
  // TODO: Aboid lazy members setting. Or apply builder pattern.
  var document = this.getContent();

  var staticMethods = this.getStaticMethods();
  var staticProperties = this.getStaticProperties();

  if (staticMethods && staticMethods.length > 0) {
    var staticMethodsContainer = this.createStaticMethodsContainer();
    document.appendSubContainer(staticMethodsContainer.getContent());
  }
  if (staticProperties && staticProperties.length > 0) {
    var staticPropertiesContainer = this.createStaticPropertiesContainer();
    document.appendSubContainer(staticPropertiesContainer.getContent());
  }

  return SymbolDocument.prototype.publish.call(this);
};


/**
 * Sets an array of static method doclets.
 * @param {Array.<jsdoc.Doclet>} symbols Static method symbols.
 */
NamespaceDocument.prototype.setStaticMethods = function(symbols) {
  if (this.staticMethods_) {
    throw Error('Static methods were already set.');
  }
  this.staticMethods_ = symbols;
};


/**
 * Sets an array of static method doclets.
 * @return {Array.<jsdoc.Doclet>} Static method symbols.
 * @protected
 */
NamespaceDocument.prototype.getStaticMethods = function() {
  return this.staticMethods_;
};


/**
 * Sets an array of static property doclets.
 * @param {Array.<jsdoc.Doclet>} symbols Static property symbols.
 */
NamespaceDocument.prototype.setStaticProperties = function(symbols) {
  if (this.staticProperties_) {
    throw Error('Static properties were already set.');
  }
  this.staticProperties_ = symbols;
};


/**
 * Sets an array of static property doclets.
 * @return {Array.<jsdoc.Doclet>} Static property symbols.
 * @protected
 */
NamespaceDocument.prototype.getStaticProperties = function() {
  return this.staticProperties_;
};


/**
 * Creates a container explains static methods of the class.
 * @return {tsumekusaJsdoc.documents.StaticMethodsContainer} Static methods
 *     container.
 * @protected
 */
NamespaceDocument.prototype.createStaticMethodsContainer = function() {
  return new StaticMethodsContainer(this.getSymbol(), this.getStaticMethods(),
      null, this.getDocumentHelper(), this.getReferenceHelper());
};


/**
 * Creates a container explains static properties of the class.
 * @return {tsumekusaJsdoc.documents.StaticPropertiesContainer} Static
 *     properties container.
 * @protected
 */
NamespaceDocument.prototype.createStaticPropertiesContainer = function() {
  return new StaticPropertiesContainer(this.getSymbol(),
      this.getStaticProperties(), null, this.getDocumentHelper(),
      this.getReferenceHelper());
};


// Exports the constructor.
module.exports = NamespaceDocument;
