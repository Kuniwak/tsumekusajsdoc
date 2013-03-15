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
VimHelpCodePublisher.prototype.getIndentWidth = function(content) {
  var indentWidth = this.getParentIndentWidth(content);
  return indentWidth + VimHelpCodePublisher.INDENT_WIDTH;
};


/** @override */
VimHelpCodePublisher.prototype.publish = function(code) {
  var codeString = string.trim(code.getCode());
  var wrapper = this.getWordWrapper(code);
  codeString = string.trimRight(wrapper.wrap([codeString], true));

  // TODO: Keep indent

  return '>\n' + codeString;
};


// Export the constructor
module.exports = VimHelpCodePublisher;
