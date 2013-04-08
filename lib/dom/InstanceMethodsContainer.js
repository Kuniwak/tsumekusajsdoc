// This script licensed under the MIT.
// http://orgachem.mit-license.org


var tsumekusa = require('../../node_modules/tsumekusa');
var util = tsumekusa.util;

var basePath = '../../lib';
var MethodsContainer = require(basePath + '/dom/MethodsContainer');



/**
 * A class for instance methods container.
 * @param {tsumekusaJsdoc.dom.DocletWrapper} parent Symbol contains
 *     {@code members}.
 * @param {?tsumekusaJsdoc.dom.DocHelper=} opt_docHelper Optional
 *     document helper.
 * @param {?tsumekusaJsdoc.references.ReferenceHelper=} opt_refHelper Optional
 *     reference helper.
 * @constructor
 * @extends {tsumekusaJsdoc.dom.MethodsContainer}
 */
var InstanceMethodsContainer = function(parent, opt_docHelper, opt_refHelper) {
  MethodsContainer.call(this, parent, InstanceMethodsContainer.CAPTION,
      InstanceMethodsContainer.MODIFIER, opt_docHelper, opt_refHelper);
};
util.inherits(InstanceMethodsContainer, MethodsContainer);


// TODO: Adapt mutliple languages.
/**
 * Default caption for a instance methods chapter.
 * @const
 * @type {string}
 */
InstanceMethodsContainer.CAPTION = 'Instance Methods';


/**
 * Default modifier for a instance methods chapter.
 * @const
 * @type {string}
 */
InstanceMethodsContainer.MODIFIER = 'instance-methods';


/** @override */
InstanceMethodsContainer.prototype.getMembers = function() {
  var parent = this.getSymbol();
  return parent.instanceMethods;
};


// Exports the constructor.
module.exports = InstanceMethodsContainer;
