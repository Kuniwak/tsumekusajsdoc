// This script licensed under the MIT.
// http://orgachem.mit-license.org


var tsumekusa = require('../../tsumekusa');


/**
 * A singleton class for inline code publisher for vim help.
 * @constructor
 */
var VimHelpInlineCodePublisher = function() {};
tsumekusa.addSingletonGetter(VimHelpInlineCodePublisher);


/** @override */
VimHelpInlineCodePublisher.prototype.publish = function(code) {
  return '{' + code.getCode() + '}';
};


// Exports the constructor.
module.exports = VimHelpInlineCodePublisher;
