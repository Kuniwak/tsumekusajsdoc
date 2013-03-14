// This script licensed under the MIT.
// http://orgachem.mit-license.org


var basePath = '../../../tsumekusa';
var tsumekusa = require(basePath);
var vimhelp = require(basePath + '/publishing/vimhelp');
var string = require(basePath + '/string');
var PreformattedParagraphPublisher = require(basePath +
    '/publishing/PreformattedParagraphPublisher');


/**
 * A class for preformatted paragrapg publisher.
 * @constructor
 * @implements {tsumekusa.publishing.PreformattedParagraphPublisher}
 */
var VimHelpPreformattedParagraphPublisher = function() {
  PreformattedParagraphPublisher.call(this);
  this.setDisplayWidth(vimhelp.TEXT_WIDTH);
};
tsumekusa.inherits(VimHelpPreformattedParagraphPublisher,
    PreformattedParagraphPublisher);
tsumekusa.addSingletonGetter(VimHelpPreformattedParagraphPublisher);


// Exports the constructor.
module.exports = VimHelpPreformattedParagraphPublisher;
