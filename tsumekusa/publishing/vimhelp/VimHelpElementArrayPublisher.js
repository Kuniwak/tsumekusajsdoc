// This script licensed under the MIT.
// http://orgachem.mit-license.org


var basePath = '../../../tsumekusa';
var tsumekusa = require(basePath);
var string = require(basePath + '/string');
var ElementArrayPublisher = require(basePath +
    '/publishing/ElementArrayPublisher');
var vimhelp = require(basePath + '/publishing/vimhelp');


/**
 * A class for element array publisher for vim help.
 * @constructor
 * @extends {tsumekusa.publishing.ElementArrayPublisher}
 */
var VimHelpElementArrayPublisher = function() {
  ElementArrayPublisher.call(this);
  this.setDisplayWidth(vimhelp.TEXT_WIDTH);
};
tsumekusa.inherits(VimHelpElementArrayPublisher, ElementArrayPublisher);
tsumekusa.addSingletonGetter(VimHelpElementArrayPublisher);


/**
 * Paragraph space height.
 * @const
 * @type {number}
 */
VimHelpElementArrayPublisher.PARAGRAPH_SPACE = 1;


/** @override */
VimHelpElementArrayPublisher.prototype.publish = function(elemArr) {
  return this.publishForEachChild(elemArr).join(
      string.repeat('\n', VimHelpElementArrayPublisher.PARAGRAPH_SPACE + 1));
};


// Exports the constructor.
module.exports = VimHelpElementArrayPublisher;
