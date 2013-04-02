// This script licensed under the MIT.
// http://orgachem.mit-license.org


var tsumekusaPath = '../../tsumekusa';
var tsumekusa = require(tsumekusaPath);
var Document = require(tsumekusaPath + '/dom/Document');
var DefinitionList = require(tsumekusaPath + '/dom/DefinitionList');

var basePath = '../../tsumekusaJsdoc';
var SymbolDocument = require(basePath + '/dom/SymbolDocument');
var NamespaceContainer = require(basePath + '/dom/NamespaceContainer');
var StaticMethodsContainer = require(basePath + '/dom/StaticMethodsContainer');
var StaticPropertiesContainer = require(basePath +
    '/dom/StaticPropertiesContainer');



/**
 * A class for document explains a namespace.
 * @param {tsumekusaJsdoc.dom.DocletWrapper} symbol Namespace symbol.
 * @param {?tsumekusaJsdoc.dom.DocHelper=} opt_docHelper Optional
 *     document helper.
 * @param {?tsumekusaJsdoc.references.ReferenceHelper=} opt_refHelper Optional
 *     reference helper.
 * @constructor
 * @extends {tsumekusaJsdoc.dom.SymbolDocument}
 */
var NamespaceDocument = function(symbol, opt_docHelper, opt_refHelper) {
  SymbolDocument.call(this, symbol, NamespaceDocument.CAPTION + ' ' +
      symbol.longname, opt_docHelper, opt_refHelper);
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
  var document = this.getElement();
  var subContainers = document.getSubContainers();

  subContainers.addChild(this.createNamespaceContainer().getElement());

  var staticMethodsContainer = this.createStaticMethodsContainer();
  if (staticMethodsContainer.getMembers().length > 0) {
    subContainers.addChild(staticMethodsContainer.getElement());
  }

  var staticPropertiesContainer = this.createStaticPropertiesContainer();
  if (staticPropertiesContainer.getMembers().length > 0) {
    subContainers.addChild(staticPropertiesContainer.getElement());
  }

  return SymbolDocument.prototype.publish.call(this);
};


/**
 * Creates a definition explains the namespace.
 * @return {tsumekusaJsdoc.dom.NamespaceContainer} Property definition.
 * @protected
 */
NamespaceDocument.prototype.createNamespaceContainer = function() {
  return new NamespaceContainer(this.getSymbol(), this.getDocHelper(),
      this.getReferenceHelper());
};


/**
 * Creates a container explains static methods of the class.
 * @return {tsumekusaJsdoc.dom.StaticMethodsContainer} Static methods
 *     container.
 * @protected
 */
NamespaceDocument.prototype.createStaticMethodsContainer = function() {
  return new StaticMethodsContainer(this.getSymbol(), this.getDocHelper(),
      this.getReferenceHelper());
};


/**
 * Creates a container explains static properties of the class.
 * @return {tsumekusaJsdoc.dom.StaticPropertiesContainer} Static
 *     properties container.
 * @protected
 */
NamespaceDocument.prototype.createStaticPropertiesContainer = function() {
  return new StaticPropertiesContainer(this.getSymbol(), this.getDocHelper(),
      this.getReferenceHelper());
};


// Exports the constructor.
module.exports = NamespaceDocument;
