// This script licensed under the MIT.
// http://orgachem.mit-license.org


var tsumekusa = require('../../../tsumekusa');



/**
 * A class for strong word publisher for vim help.
 * @constructor
 * @implements {tsumekusa.publishing.ContentPublisher}
 */
var VimHelpStrongPublisher = function() {};
tsumekusa.addSingletonGetter(VimHelpStrongPublisher);


/** @override */
VimHelpStrongPublisher.prototype.publish = function(strong) {
  return '{' + strong.getWord() + '}';
};


// Export the constructor
module.exports = VimHelpStrongPublisher;
