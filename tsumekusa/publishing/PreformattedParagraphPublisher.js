// This script licensed under the MIT.
// http://orgachem.mit-license.org


var basePath = '../../tsumekusa';
var tsumekusa = require(basePath);
var string = require(basePath + '/string');
var WordWrapper = require(basePath + '/publishing/WordWrapper');
var Indent = require(basePath + '/publishing/Indent');
var BlockElementPublisher = require(basePath +
    '/publishing/BlockElementPublisher');



/**
 * A class for preformatted paragrapg publisher.
 * @constructor
 * @extends {tsumekusa.publishing.BlockElementPublisher}
 */
var PreformattedParagraphPublisher = function(width) {
  BlockElementPublisher.call(this);
};
tsumekusa.inherits(PreformattedParagraphPublisher, BlockElementPublisher);
tsumekusa.addSingletonGetter(PreformattedParagraphPublisher);


/** @override */
PreformattedParagraphPublisher.prototype.publish = function(pre) {
  var indentWidth = this.getIndentWidth(pre);
  var whites = string.repeat(' ', indentWidth);

  return pre.getElement().split('\n').map(function(line) {
    return whites + line;
  }).join('\n');
};


// Exports the constructor.
module.exports = PreformattedParagraphPublisher;
