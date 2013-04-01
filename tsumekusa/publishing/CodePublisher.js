// This script licensed under the MIT.
// http://orgachem.mit-license.org

var basePath = '../../tsumekusa';
var tsumekusa = require(basePath);
var string = require(basePath + '/string');
var BlockElementPublisher = require(basePath +
    '/publishing/BlockElementPublisher');


/**
 * A singleton class for inline code publisher for vim help.
 * @constructor
 * @extends {tsumekusa.publishing.BlockElementPublisher}
 */
var CodePublisher = function() {
  BlockElementPublisher.call(this);
};
tsumekusa.inherits(CodePublisher, BlockElementPublisher);
tsumekusa.addSingletonGetter(CodePublisher);


/** @override */
CodePublisher.prototype.publish = function(code) {
  var indentWidth = this.getIndentWidth(code);
  var whites = string.repeat(' ', indentWidth);

  return code.getCode().split('\n').map(function(line) {
    return whites + line;
  }).join('\n');
};


// Exports the constructor.
module.exports = CodePublisher;
