// This script licensed under the MIT.
// http://orgachem.mit-license.org


var tsumekusa = require('../../../tsumekusa');



/**
 * A class for tag publishers for vim help.
 * @constructor
 * @extends {tsumekusa.publishing.IContentPublisher}
 */
var VimHelpTagPublisher = function() {};
tsumekusa.addSingletonGetter(VimHelpTagPublisher);


/** @override */
VimHelpTagPublisher.prototype.publish = function(tag) {
  return '*' + tag.getReferenceId() + '*';
};


// Exports the constructor.
module.exports = VimHelpTagPublisher;
