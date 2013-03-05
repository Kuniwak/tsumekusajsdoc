// This script licensed under the MIT.
// http://orgachem.mit-license.org


var jsdocref = require('../../jsdocref');



/**
 * A class for preformatted paragrapg publisher.
 * @constructor
 * @implements {jsdocref.publishing.ContentPublisher};
 */
var VimHelpPreformattedParagraphPublisher = function() {};
jsdocref.addSingletonGetter(VimHelpPreformattedParagraphPublisher);


/** @override */
VimHelpPreformattedParagraphPublisher.prototype.publish = function(pre) {
  return '\n' + pre.getContent() + '\n';
};


// Exports the constructor.
module.exports = VimHelpPreformattedParagraphPublisher;
