// This script licensed under the MIT.
// http://orgachem.mit-license.org

/**
 * @fileoverview A class for containers explain a constructor.
 * @author orga.cham.job@gmail.com (Orga Chem)
 */


var tsumekusa = require('../../node_modules/tsumekusa');
var util = tsumekusa.util;

var basePath = '../../lib';
var MethodsContainer = require(basePath + '/dom/MethodsContainer');
var InheritanceHierarchyChart = require(basePath +
    '/dom/InheritanceHierarchyChart');



/**
 * A class for containers explains a constructor.
 * @param {module:lib/dom/DocletWrapper} symbol Symbol.
 * @param {?module:lib/dom/DocHelper=} opt_docHelper Optional
 *     document helper.
 * @param {?module:lib/references/ReferenceHelper=} opt_refHelper Optional
 *     reference helper.
 * @constructor
 * @extends {module:lib/dom/MethodsContainer}
 * @exports lib/dom/ConstructorContainer
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
 * @return {module:lib/dom/InheritanceHierarchyChart} Chart.
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
