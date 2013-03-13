// This script licensed under the MIT.
// http://orgachem.mit-license.org


var basePath = '../../../tsumekusa';
var tsumekusa = require(basePath);
var DefinitionListPublisher = require(basePath +
    '/publishing/DefinitionListPublisher');
var consoleDoc = require(basePath + '/publishing/consoleDoc');



/**
 * A class for list publisher for vim help.
 * @constructor
 * @extends {tsumekusa.publishing.DefinitionListPublisher}
 */
var ConsoleDocDefinitionListPublisher = function() {
  DefinitionListPublisher.call(this, consoleDoc.TEXT_WIDTH);
};
tsumekusa.inherits(ConsoleDocDefinitionListPublisher, DefinitionListPublisher);
tsumekusa.addSingletonGetter(ConsoleDocDefinitionListPublisher);


// Export the constructor
module.exports = ConsoleDocDefinitionListPublisher;
