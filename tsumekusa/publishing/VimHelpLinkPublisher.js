// This script licensed under the MIT.
// http://orgachem.mit-license.org


var tsumekusa = require('../../tsumekusa');



/**
 * A class for link publisher for Vim help.
 * @constructor
 * @implements {tsumekusa.publishing.ContentPublisher}
 */
var VimHelpLinkPublisher = function() {};
tsumekusa.addSingletonGetter(VimHelpLinkPublisher);


/** @override */
VimHelpLinkPublisher.prototype.publish = function(link) {
  var refId = link.getTargetReferenceId();
  return '|' + refId + '|';
};


// Exports the constructor.
module.exports = VimHelpLinkPublisher;
