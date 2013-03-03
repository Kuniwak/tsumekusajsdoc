// This script licensed under the MIT.
// http://orgachem.mit-license.org


var jsdocref = require('../../jsdocref');



/**
 * A class for link publisher for Vim help.
 * @constructor
 * @implements {jsdocref.publishing.ContentPublisher}
 */
var VimHelpLinkPublisher = function() {};
jsdocref.addSingletonGetter(VimHelpLinkPublisher);


/** @override */
VimHelpLinkPublisher.prototype.publish = function(link) {
  var refId = link.getTargetReferenceId();
  return '|' + refId + '|';
};


// Exports the constructor.
module.exports = VimHelpLinkPublisher;
