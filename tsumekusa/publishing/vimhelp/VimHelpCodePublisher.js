// This script licensed under the MIT.
// http://orgachem.mit-license.org


var basePath = '../../../tsumekusa';
var tsumekusa = require(basePath);
var string = require(basePath + '/string');
var PreformattedParagraph = require(basePath +
    '/contents/PreformattedParagraph');
var vimhelp = require(basePath + '/publishing/vimhelp');
var BlockContentPublisher = require(basePath +
    '/publishing/BlockContentPublisher');
var PreformattedParagraphPublisher = require(basePath +
    '/PreformattedParagraphPublisher');



/**
 * A class for code publisher for vim help.
 * @constructor
 * @extends {tsumekusa.publishing.BlockContentPublisher}
 */
var VimHelpCodePublisher = function() {
  BlockContentPublisher.call(this);
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


/** @override */
VimHelpCodePublisher.prototype.publish = function(code) {
  var codeString = string.trim(code.getCode());

  // Borrow preformatted paragraph publisher
  var pre = new PreformattedParagraph(codeString);
  var prePublisher = PreformattedParagraph.getInstance();
  var publishedCode = prePublisher.publish(pre);

  return '>' + publishedCode;
};


// Export the constructor
module.exports = VimHelpCodePublisher;
