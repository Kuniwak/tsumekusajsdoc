// This script licensed under the MIT.
// http://orgachem.mit-license.org


var basePath = '../../../tsumekusa';
var tsumekusa = require(basePath);
var string = require(basePath + '/string');
var PreformattedParagraph = require(basePath +
    '/contents/PreformattedParagraph');
var vimhelp = require(basePath + '/publishing/vimhelp');
var WordWrapper = require(basePath + '/publishing/WordWrapper');
var BlockContentPublisher = require(basePath +
    '/publishing/BlockContentPublisher');



/**
 * A class for code publisher for vim help.
 * @constructor
 * @extends {tsumekusa.publishing.BlockContentPublisher}
 */
var VimHelpCodePublisher = function() {
  BlockContentPublisher.call(this);
  this.setDisplayWidth(vimhelp.TEXT_WIDTH);
};
tsumekusa.inherits(VimHelpCodePublisher, BlockContentPublisher);
tsumekusa.addSingletonGetter(VimHelpCodePublisher);


/**
 * Default indent width.
 * @const
 * @type {number}
 */
VimHelpCodePublisher.INDENT_WIDTH = 6;


/** @override */
VimHelpCodePublisher.prototype.getIndentLevel = function(content) {
  return BlockContentPublisher.prototype.getIndentLevel.call(this, content) +
      VimHelpCodePublisher.INDENT_WIDTH;
};


/**
 * Creates an object for indentation.  Override the method if you want to change
 * a strategy to indent.
 * @return {tsumekusa.publishing.WordWrapper.Indent} Created object fot
 *     indentation.
 * @protected
 */
VimHelpCodePublisher.prototype.createIndent = function() {
  return new WordWrapper.Indent(this.getIndentLevel());
};


/** @override */
VimHelpCodePublisher.prototype.publish = function(code) {
  var codeString = string.trim(code.getCode());
  var indent = this.createIndent();
  var wrapper = new WordWrapper(this.getDisplatWidth(), indent);

  return '>' + publishedCode;
};


// Export the constructor
module.exports = VimHelpCodePublisher;
