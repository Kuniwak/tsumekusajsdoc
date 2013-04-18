// This script licensed under the MIT.
// http://orgachem.mit-license.org

/**
 * @fileoverview A class for static methods containers.
 * @author orga.cham.job@gmail.com (Orga Chem)
 */


var tsumekusa = require('../../node_modules/tsumekusa');
var util = tsumekusa.util;

var basePath = '../../lib';
var MethodsContainer = require(basePath + '/dom/MethodsContainer');



/**
 * A class for static methods containers.
 * @param {module:lib/dom/DocletWrapper} parent Symbol contains
 *     {@code members}.
 * @param {?module:lib/dom/DocHelper=} opt_docHelper Optional
 *     document helper.
 * @param {?module:lib/references/ReferenceHelper=} opt_refHelper Optional
 *     reference helper.
 * @constructor
 * @extends {module:lib/dom/MethodsContainer}
 * @exports lib/dom/StaticMethodsContainer
 */
var StaticMethodsContainer = function(parent, opt_docHelper, opt_refHelper) {
  MethodsContainer.call(this, parent, StaticMethodsContainer.CAPTION,
      StaticMethodsContainer.MODIFIER, opt_docHelper, opt_refHelper);
};
util.inherits(StaticMethodsContainer, MethodsContainer);


// TODO: Adapt mutliple languages.
/**
 * Default caption for a static methods chapter.
 * @const
 * @type {string}
 */
StaticMethodsContainer.CAPTION = 'Static Methods';


/**
 * Default modifier for a static methods chapter.
 * @const
 * @type {string}
 */
StaticMethodsContainer.MODIFIER = 'static-methods';


/** @override */
StaticMethodsContainer.prototype.getMembers = function() {
  var parent = this.getSymbol();
  return parent.staticMethods;
};


// Exports the constructor.
module.exports = StaticMethodsContainer;
