// This script licensed under the MIT.
// http://orgachem.mit-license.org


var basePath = '../../tsumekusa';
var tsumekusa = require(basePath);
var LineWrapper = require(basePath + '/publishing/LineWrapper');
var BlockContentPublisher = require(basePath +
    '/publishing/BlockContentPublisher');



/**
 * A class for paragraph publisher for vim help.
 * @param {number} width Text width for the paragraph.
 * @constructor
 * @implements {tsumekusa.publishing.ContentPublisher}
 */
var ParagraphPublisher = function(width) {
  BlockContentPublisher.call(this);
  this.textWidth_ = width;
};
tsumekusa.inherits(ParagraphPublisher, BlockContentPublisher);
tsumekusa.addSingletonGetter(ParagraphPublisher);


/** @override */
ParagraphPublisher.prototype.publish = function(paragraph) {
  var wrapper = LineWrapper.getInstance();
  var indent = new LineWrapper.Indent(this.getIndentLevel(paragraph));
  var str = wrapper.wrap(paragraph.getInlineContents(), this.textWidth_,
      indent);

  return str;
};


// Export the constructor
module.exports = ParagraphPublisher;
