// This script licensed under the MIT.
// http://orgachem.mit-license.org


var jsdocref = require('../../jsdocref');



/**
 * A class for strong word publisher for vim help.
 * @constructor
 * @implements {jsdocref.publishing.ContentPublisher}
 */
var VimHelpStrongPublisher = function() {};
jsdocref.addSingletonGetter(VimHelpStrongPublisher);


/** @override */
VimHelpStrongPublisher.prototype.publish = function(strong) {
  return '{' + strong.getWord() + '}';
};


// Export the constructor
module.exports = VimHelpStrongPublisher;
