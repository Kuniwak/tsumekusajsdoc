// This script licensed under the MIT.
// http://orgachem.mit-license.org


var tsumekusa = require('../../tsumekusa');



/**
 * A singleton class for reference helper.  You can change behavior of strategy
 * of generating of reference ID, and then you should call
 * {@link tsumekusa.addSingletonGetter}, it helps to prevent different helper
 * used.
 * @constructor
 */
var ReferenceHelper = function() {};
tsumekusa.addSingletonGetter(DocReferenceHelper);


/**
 * Returns a reference ID of the symbol.  The method allows to add a modifier
 * that is set by {@code opt_modifier}.
 * @param {jsdoc.Doclet} symbol Symbol to make a reference ID.
 * @param {?string=} opt_modifier A modifier to be appended to the reference ID.
 * @return {string} Reference ID.
 */
ReferenceHelper.prototype.getReferenceId = function(symbol, opt_modifier) {
  return symbol.longname + '-' + opt_modifier;
};


// Exports the constructor.
module.exports = ReferenceHelper;
