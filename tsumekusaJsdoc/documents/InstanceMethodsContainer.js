// This script licensed under the MIT.
// http://orgachem.mit-license.org


var tsumekusa = require('../../tsumekusa');
var MethodsContainer = require('./MethodsContainer');



/**
 * A class for instance methods container.
 * @param {jsdoc.Doclet} parent Symbol contains {@code members}.
 * @param {Array.<jsdoc.Doclet>} members Instance member symbols.
 * @param {?tsumekusaJsdoc.documents.DocumentHelper=} opt_docHelper Optional
 *     document helper.
 * @param {?tsumekusaJsdoc.references.ReferenceHelper=} opt_refHelper Optional
 *     reference helper.
 * @constructor
 * @extends {tsumekusaJsdoc.documents.MethodsContainer}
 */
var InstanceMethodsContainer = function(parent, members, opt_docHelper,
      opt_refHelper) {
  MethodsContainer.call(this, parent, members, InstanceMethodsContainer.CAPTION,
      InstanceMethodsContainer.MODIFIER);
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
