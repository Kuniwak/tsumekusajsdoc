// This script licensed under the MIT.
// http://orgachem.mit-license.org


var basePath = '../../../tsumekusa';
var tsumekusa = require(basePath);
var WordWrapper = require(basePath + '/publishing/WordWrapper');
var ListPublisher = require(basePath + '/publishing/ListPublisher');
var vimhelp = require(basePath + '/publishing/vimhelp');



/**
 * A class for list publisher for vim help.
 * @constructor
 * @implements {tsumekusa.publishing.IElementPublisher}
 */
var VimHelpListPublisher = function() {
  ListPublisher.call(this);
  this.setDisplayWidth(vimhelp.TEXT_WIDTH);
};
tsumekusa.inherits(VimHelpListPublisher, ListPublisher);
tsumekusa.addSingletonGetter(VimHelpListPublisher);


// Export the constructor
module.exports = VimHelpListPublisher;
