// This script licensed under the MIT.
// http://orgachem.mit-license.org


var basePath = '../../../tsumekusa';
var tsumekusa = require(basePath);
var vimhelp = require(basePath + '/publishing/vimhelp');
var string = require(basePath + '/string');
var BlockContentPublisher = require(basePath +
    '/publishing/BlockContentPublisher');



/**
 * A class for preformatted paragrapg publisher.
 * @constructor
 * @implements {tsumekusa.publishing.ContentPublisher}
 */
var VimHelpPreformattedParagraphPublisher = function() {
  BlockContentPublisher.call(this);
};
tsumekusa.inherits(VimHelpPreformattedParagraphPublisher,
    BlockContentPublisher);
tsumekusa.addSingletonGetter(VimHelpPreformattedParagraphPublisher);


// Exports the constructor.
module.exports = VimHelpPreformattedParagraphPublisher;
