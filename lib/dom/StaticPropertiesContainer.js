// This script licensed under the MIT.
// http://orgachem.mit-license.org

/**
 * @fileoverview A class for static properties containers.
 * @author orga.cham.job@gmail.com (Orga Chem)
 */


var tsumekusa = require('../../node_modules/tsumekusa');
var util = tsumekusa.util;

var basePath = '../../lib';
var PropertiesContainer = require(basePath + '/dom/PropertiesContainer');



/**
 * A class for static properties containers.
 * @param {module:lib/dom/DocletWrapper} parent Symbol contains
 *     {@code members}.
 * @param {?module:lib/dom/DocHelper=} opt_docHelper Optional
 *     document helper.
 * @param {?module:lib/references/ReferenceHelper=} opt_refHelper Optional
 *     reference helper.
 * @constructor
 * @extends {module:lib/dom/PropertiesContainer}
 * @exports lib/dom/StaticPropertiesContainer
 */
var StaticPropertiesContainer = function(parent, opt_docHelper, opt_refHelper) {
  PropertiesContainer.call(this, parent, StaticPropertiesContainer.CAPTION,
      StaticPropertiesContainer.MODIFIER, opt_docHelper, opt_refHelper);
};
util.inherits(StaticPropertiesContainer, PropertiesContainer);


// TODO: Adapt mutliple languages.
/**
 * Default caption for a static properties chapter.
 * @const
 * @type {string}
 */
StaticPropertiesContainer.CAPTION = 'Static Properties';


/**
 * Default modifier for a static properties chapter.
 * @const
 * @type {string}
 */
StaticPropertiesContainer.MODIFIER = 'static-properties';


/** @override */
StaticPropertiesContainer.prototype.getMembers = function() {
  var parent = this.getSymbol();
  return parent.staticProperties;
};


// Exports the constructor.
module.exports = StaticPropertiesContainer;
