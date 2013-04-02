// This script licensed under the MIT.
// http://orgachem.mit-license.org


var tsumekusa = require('../../tsumekusa');
var PropertiesContainer = require('./PropertiesContainer');



/**
 * A class for instance properties container.
 * @param {jsdoc.Doclet} parent Symbol contains {@code members}.
 * @param {Array.<jsdoc.Doclet>} members Instance member symbols.
 * @param {?Array.<tsumekusa.dom.Paragraph>=} opt_topElements Optional top
 *     contents.
 * @param {?tsumekusaJsdoc.dom.DocHelper=} opt_docHelper Optional
 *     document helper.
 * @param {?tsumekusaJsdoc.references.ReferenceHelper=} opt_refHelper Optional
 *     reference helper.
 * @constructor
 * @extends {tsumekusaJsdoc.dom.PropertiesContainer}
 */
var InstancePropertiesContainer = function(parent, members, opt_topElements,
      opt_docHelper, opt_refHelper) {
  PropertiesContainer.call(this, parent, members, InstancePropertiesContainer.
      CAPTION, InstancePropertiesContainer.MODIFIER, opt_topElements,
      opt_docHelper, opt_refHelper);
};
tsumekusa.inherits(InstancePropertiesContainer, PropertiesContainer);


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


// Exports the constructor.
module.exports = InstancePropertiesContainer;
