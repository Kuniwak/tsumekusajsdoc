// This script licensed under the MIT.
// http://orgachem.mit-license.org

var basePath = '../../../tsumekusa';
var tsumekusa = require(basePath);
var vimhelp = require(basePath + '/publishing/vimhelp');
var DefinitionPublisher = require(basePath +
    '/publishing/DefinitionPublisher');



/**
 * A class for list item publisher for vim help.
 * @constructor
 * @extends {tsumekusa.publishing.IContentPublisher}
 */
var VimHelpDefinitionPublisher = function() {
  DefinitionPublisher.call(this);
  this.setDisplayWidth(vimhelp.TEXT_WIDTH);
};
tsumekusa.inherits(VimHelpDefinitionPublisher, DefinitionPublisher);
tsumekusa.addSingletonGetter(VimHelpDefinitionPublisher);


// Export the constructor
module.exports = VimHelpDefinitionPublisher;
