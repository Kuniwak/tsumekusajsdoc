// This script licensed under the MIT.
// http://orgachem.mit-license.org


var tsumekusa = require('../../tsumekusa');
var PropertiesContainer = require('./PropertiesContainer');



/**
 * A class for static properties container.
 * @param {jsdoc.Doclet} parent Symbol contains {@code members}.
 * @param {Array.<jsdoc.Doclet>} members Static member symbols.
 * @param {?Array.<tsumekusa.dom.Paragraph>=} opt_topElements Optional top
 *     contents.
 * @param {?tsumekusaJsdoc.dom.DocHelper=} opt_docHelper Optional
 *     document helper.
 * @param {?tsumekusaJsdoc.references.ReferenceHelper=} opt_refHelper Optional
 *     reference helper.
 * @constructor
 * @extends {tsumekusaJsdoc.dom.PropertiesContainer}
 */
var StaticPropertiesContainer = function(parent, members, opt_topElements,
      opt_docHelper, opt_refHelper) {
  PropertiesContainer.call(this, parent, members, StaticPropertiesContainer.
      CAPTION, StaticPropertiesContainer.MODIFIER, opt_topElements,
      opt_docHelper, opt_refHelper);
};
tsumekusa.inherits(StaticPropertiesContainer, PropertiesContainer);


// TODO: Adapt mutliple languages.
/**
 * Default caption for a static properties chapter.
 * @const
 * @type {string}
 */
StaticPropertiesContainer.CAPTION = 'Static Properties';


// TODO: Adapt mutliple languages.
/**
 * Default modifier for a static properties chapter.
 * @const
 * @type {string}
 */
StaticPropertiesContainer.MODIFIER = 'static-properties';


// Exports the constructor.
module.exports = StaticPropertiesContainer;
