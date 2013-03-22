// This script licensed under the MIT.
// http://orgachem.mit-license.org


var basePath = '../../tsumekusa';
var tsumekusa = require(basePath);
var WordWrapper = require(basePath + '/publishing/WordWrapper');
var Indent = require(basePath + '/publishing/Indent');
var BlockContentPublisher = require(basePath +
    '/publishing/BlockContentPublisher');



/**
 * A class for paragraph publisher for vim help.
 * @constructor
 * @implements {tsumekusa.publishing.IContentPublisher}
 */
var ParagraphPublisher = function() {
  BlockContentPublisher.call(this);
};
tsumekusa.inherits(ParagraphPublisher, BlockContentPublisher);
tsumekusa.addSingletonGetter(ParagraphPublisher);


/** @override */
ParagraphPublisher.prototype.publish = function(paragraph) {
  var indent = new Indent(this.getIndentWidth(paragraph));
  var wrapper = new WordWrapper(this.getDisplayWidth(), indent);

  return wrapper.wrap(paragraph.getInlineContents());
};


// Export the constructor
module.exports = ParagraphPublisher;
