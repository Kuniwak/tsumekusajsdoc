// This script licensed under the MIT.
// http://orgachem.mit-license.org


var tsumekusa = require('../../tsumekusa');
var MethodsContainer = require('./MethodsContainer');



/**
 * A class for static methods container.
 * @param {jsdoc.Doclet} parent Symbol contains {@code members}.
 * @param {Array.<jsdoc.Doclet>} members Static member symbols.
 * @param {?Array.<tsumekusa.dom.Paragraph>=} opt_topContents Optional top
 *     contents.
 * @param {?tsumekusaJsdoc.components.DocumentHelper=} opt_docHelper Optional
 *     document helper.
 * @param {?tsumekusaJsdoc.references.ReferenceHelper=} opt_refHelper Optional
 *     reference helper.
 * @constructor
 * @extends {tsumekusaJsdoc.components.MethodsContainer}
 */
var StaticMethodsContainer = function(parent, members, opt_topContents,
      opt_docHelper, opt_refHelper) {
  MethodsContainer.call(this, parent, members, StaticMethodsContainer.CAPTION,
      StaticMethodsContainer.MODIFIER, opt_topContents, opt_docHelper,
      opt_refHelper);
};
tsumekusa.inherits(StaticMethodsContainer, MethodsContainer);


// TODO: Adapt mutliple languages.
/**
 * Default caption for a static methods chapter.
 * @const
 * @type {string}
 */
StaticMethodsContainer.CAPTION = 'Static Methods';


// TODO: Adapt mutliple languages.
/**
 * Default modifier for a static methods chapter.
 * @const
 * @type {string}
 */
StaticMethodsContainer.MODIFIER = 'static-methods';


// Exports the constructor.
module.exports = StaticMethodsContainer;
