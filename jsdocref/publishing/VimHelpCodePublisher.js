// This script licensed under the MIT.
// http://orgachem.mit-license.org


var jsdocref = require('../../jsdocref');



/**
 * A class for code publisher for vim help.
 * @constructor
 * @implements {jsdocref.publishing.ContentPublisher}
 */
var VimHelpCodePublisher = function() {};
jsdocref.addSingletonGetter(VimHelpCodePublisher);


/**
 * Returns a indent level.
 * @param {jsdocref.publishing.Code} code Code.
 * @return {number} Indent level.
 */
VimHelpCodePublisher.prototype.getIndentLevel = function(code) {
  // TODO: Remove magic number.
  return 6;
};


/** @override */
VimHelpCodePublisher.prototype.publish = function(code) {
  return '>\n\n' + code.getCode() + '\n\n<\n';
};


// Export the constructor
module.exports = VimHelpCodePublisher;
