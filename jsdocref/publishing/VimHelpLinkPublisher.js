// This script licensed under the MIT.
// http://orgachem.mit-license.org



/**
 * A class for link publisher for Vim help.
 * @constructor
 * @implements {jsdocref.publishing.ContentPublisher}
 */
var VimHelpLinkPublisher = function() {
};


/** @override */
VimHelpLinkPublisher.prototype.publish = function(link) {
  var refId = link.getTargetReferenceId();
  return '|' + refId + '|';
};


// Exports the constructor.
module.exports = VimHelpLinkPublisher;
