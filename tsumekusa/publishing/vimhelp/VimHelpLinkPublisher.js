// This script licensed under the MIT.
// http://orgachem.mit-license.org


var basePath = '../../../tsumekusa';
var tsumekusa = require(basePath);
var LinkPublisher = require(basePath + '/publishing/LinkPublisher');



/**
 * A class for link publisher for Vim help.
 * @constructor
 * @extends {tsumekusa.publishing.LinkPublisher}
 */
var VimHelpLinkPublisher = function() {
  LinkPublisher.call(this);
};
tsumekusa.inherits(VimHelpLinkPublisher, LinkPublisher);
tsumekusa.addSingletonGetter(VimHelpLinkPublisher);


/** @override */
VimHelpLinkPublisher.prototype.publish = function(link) {
  // Reference converting to a real link
  var ref = link.getTargetReferenceId();
  return '|' + ref + '|';
};


// Exports the constructor.
module.exports = VimHelpLinkPublisher;
