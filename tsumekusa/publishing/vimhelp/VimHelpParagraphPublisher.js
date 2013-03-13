// This script licensed under the MIT.
// http://orgachem.mit-license.org


var basePath = '../../../tsumekusa';
var tsumekusa = require(basePath);
var LineWrapper = require(basePath + '/publishing/LineWrapper');
var vimhelp = require(basePath + '/publishing/vimhelp');
var ParagraphPublisher = require(basePath + '/publishing/ParagraphPublisher');



/**
 * A class for paragraph publisher for vim help.
 * @constructor
 * @implements {tsumekusa.publishing.ParagraphPublisher}
 */
var VimHelpParagraphPublisher = function() {
  ParagraphPublisher.call(this);
};
tsumekusa.inherits(VimHelpParagraphPublisher, ParagraphPublisher);
tsumekusa.addSingletonGetter(VimHelpParagraphPublisher);


/** @override */
VimHelpParagraphPublisher.prototype.publish = function(paragraph) {
  var wrapper = LineWrapper.getInstance();
  var indent = new LineWrapper.Indent(this.getIndentLevel(paragraph));
  var str = wrapper.wrap(inlineContents, vimhelp.TEXT_WIDTH, indent);

  return str;
};


// Export the constructor
module.exports = VimHelpParagraphPublisher;
