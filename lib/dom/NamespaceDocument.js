// This script licensed under the MIT.
// http://orgachem.mit-license.org

/**
 * @fileoverview A class for documents explain a namespace.
 * @author orga.cham.job@gmail.com (Orga Chem)
 */


var tsumekusa = require('../../node_modules/tsumekusa');
var util = tsumekusa.util;
var Document = tsumekusa.Document;
var DefinitionList = tsumekusa.DefinitionList;

var basePath = '../../lib';
var SymbolDocument = require(basePath + '/dom/SymbolDocument');
var NamespaceContainer = require(basePath + '/dom/NamespaceContainer');
var StaticMethodsContainer = require(basePath + '/dom/StaticMethodsContainer');
var StaticPropertiesContainer = require(basePath +
    '/dom/StaticPropertiesContainer');



/**
 * A class for documents explain a namespace.
 * @param {module:lib/dom/DocletWrapper} symbol Namespace symbol.
 * @param {?module:lib/dom/DocHelper=} opt_docHelper Optional
 *     document helper.
 * @param {?module:lib/references/ReferenceHelper=} opt_refHelper Optional
 *     reference helper.
 * @constructor
 * @extends {module:lib/dom/SymbolDocument}
 * @exports lib/dom/NamespaceDocument
 */
var NamespaceDocument = function(symbol, opt_docHelper, opt_refHelper) {
  SymbolDocument.call(this, symbol, NamespaceDocument.CAPTION + ' ' +
      symbol.longname, opt_docHelper, opt_refHelper);
};
util.inherits(NamespaceDocument, SymbolDocument);


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
 * @return {module:lib/dom/NamespaceContainer} Property definition.
 * @protected
 */
NamespaceDocument.prototype.createNamespaceContainer = function() {
  return new NamespaceContainer(this.getSymbol(), this.getDocHelper(),
      this.getReferenceHelper());
};


/**
 * Creates a container explains static methods of the class.
 * @return {module:lib/dom/StaticMethodsContainer} Static methods
 *     container.
 * @protected
 */
NamespaceDocument.prototype.createStaticMethodsContainer = function() {
  return new StaticMethodsContainer(this.getSymbol(), this.getDocHelper(),
      this.getReferenceHelper());
};


/**
 * Creates a container explains static properties of the class.
 * @return {module:lib/dom/StaticPropertiesContainer} Static
 *     properties container.
 * @protected
 */
NamespaceDocument.prototype.createStaticPropertiesContainer = function() {
  return new StaticPropertiesContainer(this.getSymbol(), this.getDocHelper(),
      this.getReferenceHelper());
};


// Exports the constructor.
module.exports = NamespaceDocument;
