// This script licensed under the MIT.
// http://orgachem.mit-license.org


var basePath = '../../../tsumekusa';
var tsumekusa = require(basePath);
var vimhelp = require(basePath + '/publishing/vimhelp');
var DefinitionListPublisher = require(basePath +
    '/publishing/DefinitionListPublisher');



/**
 * A class for list publisher for vim help.
 * @constructor
 * @extends {tsumekusa.publishing.IContentPublisher}
 */
var VimHelpDefinitionListPublisher = function() {
  DefinitionListPublisher.call(this);
  this.setDisplayWidth(vimhelp.TEXT_WIDTH);
};
tsumekusa.inherits(VimHelpDefinitionListPublisher, DefinitionListPublisher);
tsumekusa.addSingletonGetter(VimHelpDefinitionListPublisher);


// Export the constructor
module.exports = VimHelpDefinitionListPublisher;
