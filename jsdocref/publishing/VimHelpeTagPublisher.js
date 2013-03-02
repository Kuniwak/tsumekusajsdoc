// This script licensed under the MIT.
// http://orgachem.mit-license.org



/**
 * Base class for tag publisher.
 * @constructor
 * @extends {jsdocref.publishing.ContentPublisher}
 */
var VimHelpTagPublisher = function() {};


/** @override */
VimHelpTagPublisher.prototype.publish = function(tag) {
  return '*' + tag.getReferenceId() + '*';
};


// Exports the constructor.
module.exports = VimHelpTagPublisher;
