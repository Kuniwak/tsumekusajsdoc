// This script licensed under the MIT.
// http://orgachem.mit-license.org


var tsumekusa = require('../../tsumekusa');



/**
 * A class for code publisher for vim help.
 * @constructor
 * @implements {tsumekusa.publishing.ContentPublisher}
 */
var VimHelpCodePublisher = function() {};
tsumekusa.addSingletonGetter(VimHelpCodePublisher);


/**
 * Returns a indent level.
 * @param {tsumekusa.publishing.Code} code Code.
 * @return {number} Indent level.
 */
VimHelpCodePublisher.prototype.getIndentLevel = function(code) {
  // TODO: Remove magic number.
  return 6;
};


/** @override */
VimHelpCodePublisher.prototype.publish = function(code) {
  return '>\n\n' + code.getCode() + '\n';
};


// Export the constructor
module.exports = VimHelpCodePublisher;
