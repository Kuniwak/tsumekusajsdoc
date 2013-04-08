// This script licensed under the MIT.
// http://orgachem.mit-license.org


var tsumekusa = require('../../node_modules/tsumekusa');
var util = tsumekusa.util;

var basePath = '../../lib';
var MembersContainer = require(basePath + '/dom/MembersContainer');
var MethodDefinition = require(basePath + '/dom/MethodDefinition');



/**
 * A class for methods container.
 * @param {tsumekusaJsdoc.dom.DocletWrapper} parent Symbol contains
 *     {@code members}.
 * @param {string} caption Caption of the container such as {@code
 *     'Static members'}.
 * @param {string} modifier Modifier of the reference ID.
 * @param {?tsumekusaJsdoc.dom.DocHelper=} opt_docHelper Optional
 *     document helper.
 * @param {?tsumekusaJsdoc.references.ReferenceHelper=} opt_refHelper Optional
 *     reference helper.
 * @constructor
 * @extends {tsumekusaJsdoc.dom.MembersContainer}
 */
var MethodsContainer = function(parent, caption, modifier, opt_docHelper,
    opt_refHelper) {
  MembersContainer.call(this, parent, caption, modifier, opt_docHelper,
      opt_refHelper);
};
util.inherits(MethodsContainer, MembersContainer);


/** @override */
MethodsContainer.prototype.createMemberDefinition = function(symbol) {
  return new MethodDefinition(symbol, this.getDocHelper(),
      this.getReferenceHelper());
};


// Exports the constructor.
module.exports = MethodsContainer;
