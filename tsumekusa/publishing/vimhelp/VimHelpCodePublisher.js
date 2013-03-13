// This script licensed under the MIT.
// http://orgachem.mit-license.org


var basePath = '../../../tsumekusa';
var tsumekusa = require(basePath);
var vimhelp = require(basePath + '/publishing/vimhelp');
var string = require(basePath + '/string');
var BlockContentPublisher = require(basePath +
    '/publishing/BlockContentPublisher');



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
  // TODO: Wrap if the cord line is too long.
  var codeLines = string.trim(code.getCode()).split('\n');
  var publishedCode = codeLines.map(function(line) {
    return string.repeat(' ', VimHelpCodePublisher.INDENT_WIDTH) + line;
  }).join('\n');

  return '>\n' + publishedCode + '\n';
};


// Export the constructor
module.exports = VimHelpCodePublisher;
