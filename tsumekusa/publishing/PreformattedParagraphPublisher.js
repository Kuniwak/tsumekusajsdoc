// This script licensed under the MIT.
// http://orgachem.mit-license.org


var basePath = '../../tsumekusa';
var tsumekusa = require(basePath);
var string = require(basePath + '/string');
var WordWrapper = require(basePath + '/publishing/WordWrapper');
var Indent = require(basePath + '/publishing/Indent');
var BlockContentPublisher = require(basePath +
    '/publishing/BlockContentPublisher');



/**
 * A class for preformatted paragrapg publisher.
 * @constructor
 * @extends {tsumekusa.publishing.BlockContentPublisher}
 */
var PreformattedParagraphPublisher = function(width) {
  BlockContentPublisher.call(this);
};
tsumekusa.inherits(PreformattedParagraphPublisher, BlockContentPublisher);
tsumekusa.addSingletonGetter(PreformattedParagraphPublisher);


/** @override */
PreformattedParagraphPublisher.prototype.publish = function(pre) {
  var indent = new Indent(this.getIndentWidth(pre));
  var wrapper = new WordWrapper(this.getDisplayWidth(), indent);

  return '\n' + wrapper.wrap([pre.getContent()], true) + '\n';
};


// Exports the constructor.
module.exports = PreformattedParagraphPublisher;
