// This script licensed under the MIT.
// http://orgachem.mit-license.org


var tsumekusa = require('../../tsumekusa');
var MembersContainer = require('./MembersContainer');
var MethodContainer = require('./MethodContainer');



/**
 * A class for methods container.
 * @param {jsdoc.Doclet} parent Symbol contains {@code members}.
 * @param {Array.<jsdoc.Doclet>} members Member symbols.
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
var MethodsContainer = function(parent, members, caption, modifier,
    opt_docHelper, opt_refHelper) {
  MembersContainer.call(this, parent, members, caption, modifier, opt_docHelper,
      opt_refHelper);
};
tsumekusa.inherits(MethodsContainer, MembersContainer);


/** @override */
MethodsContainer.prototype.createMemberContainer = function(symbol) {
  return new MethodContainer(symbol, this.getDocHelper(),
      this.getReferenceHelper());
};


// Exports the constructor.
module.exports = MethodsContainer;
