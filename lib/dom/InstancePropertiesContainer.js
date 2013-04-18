// This script licensed under the MIT.
// http://orgachem.mit-license.org

/**
 * @fileoverview A class for instance properties containers.
 * @author orga.cham.job@gmail.com (Orga Chem)
 */


var tsumekusa = require('../../node_modules/tsumekusa');
var util = tsumekusa.util;

var basePath = '../../lib';
var PropertiesContainer = require(basePath + '/dom/PropertiesContainer');



/**
 * A class for instance properties containers.
 * @param {module:lib/dom/DocletWrapper} parent Symbol contains
 *     {@code members}.
 * @param {?module:lib/dom/DocHelper=} opt_docHelper Optional
 *     document helper.
 * @param {?module:lib/references/ReferenceHelper=} opt_refHelper Optional
 *     reference helper.
 * @constructor
 * @extends {module:lib/dom/PropertiesContainer}
 * @exports lib/dom/InstancePropertiesContainer
 */
var InstancePropertiesContainer = function(parent, opt_docHelper,
    opt_refHelper) {
  PropertiesContainer.call(this, parent, InstancePropertiesContainer.CAPTION,
      InstancePropertiesContainer.MODIFIER, opt_docHelper, opt_refHelper);
};
util.inherits(InstancePropertiesContainer, PropertiesContainer);


// TODO: Adapt mutliple languages.
/**
 * Default caption for a instance properties chapter.
 * @const
 * @type {string}
 */
InstancePropertiesContainer.CAPTION = 'Instance Properties';


/**
 * Default modifier for a instance properties chapter.
 * @const
 * @type {string}
 */
InstancePropertiesContainer.MODIFIER = 'instance-properties';


/** @override */
InstancePropertiesContainer.prototype.getMembers = function() {
  var parent = this.getSymbol();
  return parent.instanceProperties;
};


// Exports the constructor.
module.exports = InstancePropertiesContainer;
