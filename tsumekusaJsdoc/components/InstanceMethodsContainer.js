// This script licensed under the MIT.
// http://orgachem.mit-license.org


var tsumekusa = require('../../tsumekusa');
var MethodsContainer = require('./MethodsContainer');



/**
 * A class for instance methods container.
 * @param {jsdoc.Doclet} parent Symbol contains {@code members}.
 * @param {Array.<jsdoc.Doclet>} members Instance member symbols.
 * @param {?Array.<tsumekusa.dom.Paragraph>=} opt_topContents Optional top
 *     contents.
 * @param {?tsumekusaJsdoc.components.DocumentHelper=} opt_docHelper Optional
 *     document helper.
 * @param {?tsumekusaJsdoc.references.ReferenceHelper=} opt_refHelper Optional
 *     reference helper.
 * @constructor
 * @extends {tsumekusaJsdoc.components.MethodsContainer}
 */
var InstanceMethodsContainer = function(parent, members, opt_topContents,
      opt_docHelper, opt_refHelper) {
  MethodsContainer.call(this, parent, members, InstanceMethodsContainer.CAPTION,
      InstanceMethodsContainer.MODIFIER, opt_topContents, opt_docHelper,
      opt_refHelper);
};
tsumekusa.inherits(InstanceMethodsContainer, MethodsContainer);


// TODO: Adapt mutliple languages.
/**
 * Default caption for a instance methods chapter.
 * @const
 * @type {string}
 */
InstanceMethodsContainer.CAPTION = 'Instance Methods';


// TODO: Adapt mutliple languages.
/**
 * Default modifier for a instance methods chapter.
 * @const
 * @type {string}
 */
InstanceMethodsContainer.MODIFIER = 'instance-methods';


// Exports the constructor.
module.exports = InstanceMethodsContainer;
