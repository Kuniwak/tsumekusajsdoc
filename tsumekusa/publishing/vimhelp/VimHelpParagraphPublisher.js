// This script licensed under the MIT.
// http://orgachem.mit-license.org


var basePath = '../../../tsumekusa';
var tsumekusa = require(basePath);
var WordWrapper = require(basePath + '/publishing/WordWrapper');
var vimhelp = require(basePath + '/publishing/vimhelp');
var ParagraphPublisher = require(basePath + '/publishing/ParagraphPublisher');



/**
 * A class for paragraph publisher for vim help.
 * @constructor
 * @implements {tsumekusa.publishing.ParagraphPublisher}
 */
var VimHelpParagraphPublisher = function() {
  ParagraphPublisher.call(this);
  this.setDisplayWidth(vimhelp.TEXT_WIDTH);
};
tsumekusa.inherits(VimHelpParagraphPublisher, ParagraphPublisher);
tsumekusa.addSingletonGetter(VimHelpParagraphPublisher);


// Export the constructor
module.exports = VimHelpParagraphPublisher;
