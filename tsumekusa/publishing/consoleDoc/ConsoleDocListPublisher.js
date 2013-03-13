// This script licensed under the MIT.
// http://orgachem.mit-license.org


var basePath = '../../../tsumekusa';
var tsumekusa = require(basePath);
var ListPublisher = require(basePath + '/publishing/ListPublisher');
var consoleDoc = require(basePath + '/publishing/consoleDoc');



/**
 * A class for list publisher for vim help.
 * @constructor
 * @extends {tsumekusa.publishing.ListPublisher}
 */
var ConsoleDocListPublisher = function() {
  ListPublisher(this, consoleDoc.TEXT_WIDTH);
};
tsumekusa.inherits(ConsoleDocListPublisher, ListPublisher);
tsumekusa.addSingletonGetter(ConsoleDocListPublisher);


// Export the constructor
module.exports = ConsoleDocListPublisher;
