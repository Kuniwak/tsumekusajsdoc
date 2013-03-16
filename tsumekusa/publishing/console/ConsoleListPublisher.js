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
var ConsoleListPublisher = function() {
  ListPublisher(this, consoleDoc.TEXT_WIDTH);
};
tsumekusa.inherits(ConsoleListPublisher, ListPublisher);
tsumekusa.addSingletonGetter(ConsoleListPublisher);


// Export the constructor
module.exports = ConsoleListPublisher;
