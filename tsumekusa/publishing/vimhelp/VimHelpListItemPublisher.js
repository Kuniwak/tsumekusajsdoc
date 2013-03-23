// This script licensed under the MIT.
// http://orgachem.mit-license.org

var basePath = '../../../tsumekusa';
var tsumekusa = require(basePath);
var vimhelp = require(basePath + '/publishing/vimhelp');
var ListItemPublisher = require(basePath +
    '/publishing/ListItemPublisher');



/**
 * A class for list item publisher for vim help.
 * @constructor
 * @extends {tsumekusa.publishing.IElementPublisher}
 */
var VimHelpListItemPublisher = function() {
  ListItemPublisher.call(this);
  this.setDisplayWidth(vimhelp.TEXT_WIDTH);
};
tsumekusa.inherits(VimHelpListItemPublisher, ListItemPublisher);
tsumekusa.addSingletonGetter(VimHelpListItemPublisher);


// Export the constructor
module.exports = VimHelpListItemPublisher;
