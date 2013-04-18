// This script licensed under the MIT.
// http://orgachem.mit-license.org

/**
 * @fileoverview A class for properties containers.
 * @author orga.cham.job@gmail.com (Orga Chem)
 */


var tsumekusa = require('../../node_modules/tsumekusa');
var util = tsumekusa.util;

var basePath = '../../lib';
var MembersContainer = require(basePath + '/dom/MembersContainer');
var PropertyDefinition = require(basePath + '/dom/PropertyDefinition');



/**
 * A class for properties containers.
 * @param {module:lib/dom/DocletWrapper} parent Symbol contains
 *     {@code members}.
 * @param {string} caption Caption of the container such as {@code
 *     'Static members'}.
 * @param {string} modifier Modifier of the reference ID.
 * @param {?module:lib/dom/DocHelper=} opt_docHelper Optional
 *     document helper.
 * @param {?module:lib/references/ReferenceHelper=} opt_refHelper Optional
 *     reference helper.
 * @constructor
 * @extends {module:lib/dom/MembersContainer}
 * @exports lib/dom/PropertiesContainer
 */
var PropertiesContainer = function(parent, caption, modifier, opt_docHelper,
    opt_refHelper) {
  MembersContainer.call(this, parent, caption, modifier, opt_docHelper,
      opt_refHelper);
};
util.inherits(PropertiesContainer, MembersContainer);


/** @override */
PropertiesContainer.prototype.createMemberDefinition = function(symbol) {
  return new PropertyDefinition(symbol, this.getDocHelper(),
      this.getReferenceHelper());
};


// Exports the constructor.
module.exports = PropertiesContainer;
