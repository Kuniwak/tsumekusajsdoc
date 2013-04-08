// This script licensed under the MIT.
// http://orgachem.mit-license.org


var tsumekusa = require('../../node_modules/tsumekusa');
var util = tsumekusa.util;

var basePath = '../../lib';
var MethodsContainer = require(basePath + '/dom/MethodsContainer');
var InheritanceHierarchyChart = require(basePath +
    '/dom/InheritanceHierarchyChart');



/**
 * A class for a container explains any member.
 * @param {tsumekusaJsdoc.dom.DocletWrapper} symbol Symbol.
 * @param {?tsumekusaJsdoc.dom.DocHelper=} opt_docHelper Optional
 *     document helper.
 * @param {?tsumekusaJsdoc.references.ReferenceHelper=} opt_refHelper Optional
 *     reference helper.
 * @constructor
 * @extends {tsumekusaJsdoc.dom.MethodsContainer}
 */
var ConstructorContainer = function(symbol, opt_docHelper, opt_refHelper) {
  MethodsContainer.call(this, symbol, ConstructorContainer.CAPTION,
      ConstructorContainer.MODIFIER, opt_docHelper, opt_refHelper);
  var container = this.getElement();
  var tops = container.getTopElements();
  tops.addChildAt(this.getInheritanceHierarchyChart().getElement(), 0);
};
util.inherits(ConstructorContainer, MethodsContainer);


// TODO: Adapt mutliple languages.
/**
 * Default caption for a class document.
 * @const
 * @type {string}
 */
ConstructorContainer.CAPTION = 'Constructor';


/**
 * Default modifier for a constructor chapter.
 * @const
 * @type {string}
 */
ConstructorContainer.MODIFIER = 'constructor';


/**
 * Returns an inheritance hierarchy chart.
 * @return {tsumekusaJsdoc.dom.InheritanceHierarchyChart} Chart.
 */
ConstructorContainer.prototype.getInheritanceHierarchyChart = function() {
  return new InheritanceHierarchyChart(this.getSymbol());
};


/** @override */
ConstructorContainer.prototype.getMembers = function() {
  var parent = this.getSymbol();
  return [parent];
};


// Exports the constructor.
module.exports = ConstructorContainer;
