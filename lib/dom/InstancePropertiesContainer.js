// This script licensed under the MIT.
// http://orgachem.mit-license.org


var tsumekusa = require('../../node_modules/tsumekusa');
var util = tsumekusa.util;

var basePath = '../../lib';
var PropertiesContainer = require(basePath + '/dom/PropertiesContainer');



/**
 * A class for instance properties container.
 * @param {tsumekusaJsdoc.dom.DocletWrapper} parent Symbol contains
 *     {@code members}.
 * @param {?tsumekusaJsdoc.dom.DocHelper=} opt_docHelper Optional
 *     document helper.
 * @param {?tsumekusaJsdoc.references.ReferenceHelper=} opt_refHelper Optional
 *     reference helper.
 * @constructor
 * @extends {tsumekusaJsdoc.dom.PropertiesContainer}
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
