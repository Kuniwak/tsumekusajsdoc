// This script licensed under the MIT.
// http://orgachem.mit-license.org


var tsumekusa = require('../../node_modules/tsumekusa');
var util = tsumekusa.util;

var basePath = '../../lib';
var SymbolDocument = require(basePath + '/dom/SymbolDocument');
var ConstructorContainer = require(basePath + '/dom/ConstructorContainer');
var StaticMethodsContainer = require(basePath + '/dom/StaticMethodsContainer');
var InstanceMethodsContainer = require(basePath +
    '/dom/InstanceMethodsContainer');
var StaticPropertiesContainer = require(basePath +
    '/dom/StaticPropertiesContainer');
var InstancePropertiesContainer = require(basePath +
    '/dom/InstancePropertiesContainer');



/**
 * A class for document explains a class.
 * @param {tsumekusaJsdoc.dom.DocletWrapper} symbol Class symbol.
 * @param {?tsumekusaJsdoc.dom.DocHelper=} opt_docHelper Optional
 *     document helper.
 * @param {?tsumekusaJsdoc.references.ReferenceHelper=} opt_refHelper Optional
 *     reference helper.
 * @constructor
 * @extends {tsumekusaJsdoc.dom.SymbolDocument}
 */
var ClassDocument = function(symbol, opt_docHelper, opt_refHelper) {
  SymbolDocument.call(this, symbol, ClassDocument.CAPTION + ': ' +
      symbol.longname, opt_docHelper, opt_refHelper);
};
util.inherits(ClassDocument, SymbolDocument);



// TODO: Adapt mutliple languages.
/**
 * Default caption for a class document.
 * @const
 * @type {string}
 */
ClassDocument.CAPTION = 'Class';


/** @override */
ClassDocument.prototype.publish = function() {
  // TODO: Aboid lazy members setting. Or apply builder pattern.
  var document = this.getElement();
  var subContainers = document.getSubContainers();

  subContainers.addChild(this.createConstructorContainer().getElement());

  var instanceMethodsContainer = this.createInstanceMethodsContainer();
  if (instanceMethodsContainer.getMembers().length > 0) {
    subContainers.addChild(instanceMethodsContainer.getElement());
  }

  var instancePropertiesContainer = this.createInstancePropertiesContainer();
  if (instancePropertiesContainer.getMembers().length > 0) {
    subContainers.addChild(instancePropertiesContainer.getElement());
  }

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
 * Creates a constructor definition.
 * @return {tsumekusaJsdoc.dom.MethodDefinition} Method definition.
 * @protected
 */
ClassDocument.prototype.createConstructorContainer = function() {
  return new ConstructorContainer(this.getSymbol(), this.getDocHelper(),
      this.getReferenceHelper());
};


/**
 * Creates a container explains static methods of the class.
 * @return {tsumekusaJsdoc.dom.StaticMethodsContainer} Static methods
 *     container.
 * @protected
 */
ClassDocument.prototype.createStaticMethodsContainer = function() {
  return new StaticMethodsContainer(this.getSymbol(), this.getDocHelper(),
      this.getReferenceHelper());
};


/**
 * Creates a container explains instance methods of the class.
 * @return {tsumekusaJsdoc.dom.InstanceMethodsContainer} Instance methods
 *     container.
 * @protected
 */
ClassDocument.prototype.createInstanceMethodsContainer = function() {
  return new InstanceMethodsContainer(this.getSymbol(), this.getDocHelper(),
      this.getReferenceHelper());
};


/**
 * Creates a container explains static properties of the class.
 * @return {tsumekusaJsdoc.dom.StaticPropertiesContainer} Static
 *     properties container.
 * @protected
 */
ClassDocument.prototype.createStaticPropertiesContainer = function() {
  return new StaticPropertiesContainer(this.getSymbol(), this.getDocHelper(),
      this.getReferenceHelper());
};


/**
 * Creates a container explains instance properties of the class.
 * @return {tsumekusaJsdoc.dom.InstancePropertiesContainer} Instance
       properties container.
 * @protected
 */
ClassDocument.prototype.createInstancePropertiesContainer = function() {
  return new InstancePropertiesContainer(this.getSymbol(), this.getDocHelper(),
      this.getReferenceHelper());
};


// Exports the constructor.
module.exports = ClassDocument;
