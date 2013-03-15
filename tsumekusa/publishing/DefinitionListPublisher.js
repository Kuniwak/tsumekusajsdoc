// This script licensed under the MIT.
// http://orgachem.mit-license.org


var basePath = '../../tsumekusa';
var tsumekusa = require(basePath);
var BlockContentPublisher = require(basePath +
    '/publishing/BlockContentPublisher');



/**
 * A class for list publisher for vim help.
 * @constructor
 * @extends {tsumekusa.publishing.BlockContentPublisher}
 */
var DefinitionListPublisher = function() {
  BlockContentPublisher.call(this);
};
tsumekusa.inherits(DefinitionListPublisher, BlockContentPublisher);
tsumekusa.addSingletonGetter(DefinitionListPublisher);


/**
 * Default indent width.
 * @const
 * @type {number}
 */
DefinitionListPublisher.INDENT_WIDTH = 2;


/** @override */
DefinitionListPublisher.prototype.getIndentWidth = function(content) {
  var indentWidth = this.getParentIndentWidth(content);
  return indentWidth + DefinitionListPublisher.INDENT_WIDTH;
};


/** @override */
DefinitionListPublisher.prototype.publish = function(list) {
  var definitions = list.getDefinitions().getChildren();

  return definitions.map(function(def, index) {
    return def.publish();
  }).join('\n\n');
};


// Export the constructor
module.exports = DefinitionListPublisher;
