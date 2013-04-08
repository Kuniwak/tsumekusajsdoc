// This script licensed under the MIT.
// http://orgachem.mit-license.org


var tsumekusa = require('../../node_modules/tsumekusa');
var util = tsumekusa.util;

var basePath = '../../lib';
var MethodsContainer = require(basePath + '/dom/MethodsContainer');



/**
 * A class for static methods container.
 * @param {tsumekusaJsdoc.dom.DocletWrapper} parent Symbol contains
 *     {@code members}.
 * @param {?tsumekusaJsdoc.dom.DocHelper=} opt_docHelper Optional
 *     document helper.
 * @param {?tsumekusaJsdoc.references.ReferenceHelper=} opt_refHelper Optional
 *     reference helper.
 * @constructor
 * @extends {tsumekusaJsdoc.dom.MethodsContainer}
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
