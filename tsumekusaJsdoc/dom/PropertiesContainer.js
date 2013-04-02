// This script licensed under the MIT.
// http://orgachem.mit-license.org


var tsumekusaPath = '../../tsumekusa';
var tsumekusa = require(tsumekusaPath);

var basePath = '../../tsumekusaJsdoc';
var MembersContainer = require(basePath + '/dom/MembersContainer');
var PropertyDefinition = require(basePath + '/dom/PropertyDefinition');



/**
 * A class for properties container.
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
var PropertiesContainer = function(parent, members, caption, modifier,
    opt_docHelper, opt_refHelper) {
  MembersContainer.call(this, parent, members, caption, modifier, opt_docHelper,
      opt_refHelper);
};
tsumekusa.inherits(PropertiesContainer, MembersContainer);


/** @override */
PropertiesContainer.prototype.createMemberDefinition = function(symbol) {
  return new PropertyDefinition(symbol, this.getDocHelper(),
      this.getReferenceHelper());
};


// Exports the constructor.
module.exports = PropertiesContainer;
