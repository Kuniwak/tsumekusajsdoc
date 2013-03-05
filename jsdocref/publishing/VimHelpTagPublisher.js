// This script licensed under the MIT.
// http://orgachem.mit-license.org


var jsdocref = require('../../jsdocref');



/**
 * A class for tag publishers for vim help.
 * @constructor
 * @extends {jsdocref.publishing.ContentPublisher}
 */
var VimHelpTagPublisher = function() {};
jsdocref.addSingletonGetter(VimHelpTagPublisher);


/** @override */
VimHelpTagPublisher.prototype.publish = function(tag) {
  return '*' + tag.getReferenceId() + '*';
};


// Exports the constructor.
module.exports = VimHelpTagPublisher;
