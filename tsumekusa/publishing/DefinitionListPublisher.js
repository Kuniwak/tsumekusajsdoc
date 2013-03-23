// This script licensed under the MIT.
// http://orgachem.mit-license.org


var basePath = '../../tsumekusa';
var tsumekusa = require(basePath);
var BlockElementPublisher = require(basePath +
    '/publishing/BlockElementPublisher');



/**
 * A class for list publisher for vim help.
 * @constructor
 * @extends {tsumekusa.publishing.BlockElementPublisher}
 */
var DefinitionListPublisher = function() {
  BlockElementPublisher.call(this);
};
tsumekusa.inherits(DefinitionListPublisher, BlockElementPublisher);
tsumekusa.addSingletonGetter(DefinitionListPublisher);


/** @override */
DefinitionListPublisher.prototype.publish = function(list) {
  return list.getDefinitions().publish();
};


// Export the constructor
module.exports = DefinitionListPublisher;
