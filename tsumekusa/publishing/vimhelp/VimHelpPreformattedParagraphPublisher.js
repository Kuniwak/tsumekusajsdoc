// This script licensed under the MIT.
// http://orgachem.mit-license.org


var tsumekusa = require('../../../tsumekusa');



/**
 * A class for preformatted paragrapg publisher.
 * @constructor
 * @implements {tsumekusa.publishing.ContentPublisher}
 */
var VimHelpPreformattedParagraphPublisher = function() {};
tsumekusa.addSingletonGetter(VimHelpPreformattedParagraphPublisher);


/** @override */
VimHelpPreformattedParagraphPublisher.prototype.publish = function(pre) {
  return '\n' + pre.getContent() + '\n';
};


// Exports the constructor.
module.exports = VimHelpPreformattedParagraphPublisher;
