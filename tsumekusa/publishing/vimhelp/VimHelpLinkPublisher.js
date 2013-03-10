// This script licensed under the MIT.
// http://orgachem.mit-license.org


var tsumekusa = require('../../../tsumekusa');



/**
 * A class for link publisher for Vim help.
 * @constructor
 * @implements {tsumekusa.publishing.ContentPublisher}
 */
var VimHelpLinkPublisher = function() {};
tsumekusa.addSingletonGetter(VimHelpLinkPublisher);


/** @override */
VimHelpLinkPublisher.prototype.publish = function(link) {
  // Reference converting to a real link
  var ref = link.getTargetReferenceId();
  return '|' + ref + '|';
};


// Exports the constructor.
module.exports = VimHelpLinkPublisher;
