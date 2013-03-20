// This script licensed under the MIT.
// http://orgachem.mit-license.org


var basePath = '../../../tsumekusa';
var tsumekusa = require(basePath);
var string = require(basePath + '/string');
var vimhelp = require(basePath + '/publishing/vimhelp');
var ContainerPublisher = require(basePath + '/publishing/ContainerPublisher');



/**
 * A singleton class for container publisher for vim help.
 * @constructor
 * @extends {tsumekusa.publishing.ContainerPublisher}
 */
var VimHelpContainerPublisher = function() {
  ContainerPublisher.call(this);
  this.setDisplayWidth(vimhelp.TEXT_WIDTH);
};
tsumekusa.inherits(VimHelpContainerPublisher, ContainerPublisher);
tsumekusa.addSingletonGetter(VimHelpContainerPublisher);


/**
 * Height of paragraph bottom margin.
 * @const
 * @type {number}
 */
VimHelpContainerPublisher.PARAGRAPH_BOTTOM_MARGIN = 1;


/**
 * Height of heahder bottom margin.
 * @const
 * @type {number}
 */
VimHelpContainerPublisher.HEADER_BOTTOM_MARGIN = 1;


/**
 * Separator characters.  First char is used in top level container, and second
 * char is used in second level container.
 * @const
 * @type {string}
 */
VimHelpContainerPublisher.SEPARATORS = '=-';


/** @override */
VimHelpContainerPublisher.prototype.publishHeader = function(content) {
  var indexString = this.createIndex(content);
  var tag = content.getTag();
  var tagString = tag.publish();

  var head = indexString + ' ' + content.getCaption();
  var tail = tagString;
  return string.fillMiddle(head, tail, this.getDisplayWidth()) +
      string.repeat('\n', VimHelpContainerPublisher.HEADER_BOTTOM_MARGIN + 1);
};


/** @override */
VimHelpContainerPublisher.prototype.getIndentWidth = function(content) {
  return 0;
};


/**
 * Creates an index string on head of a header.  Index string foemat as: {@code
 * 1.1.2}.
 * @param {tsumekusa.dom.Container} container Contents container.
 * @return {string} Index string.
 */
VimHelpContainerPublisher.prototype.createIndex = function(container) {
  var ancestors = container.getAncestors();
  var depth, idxs;

  if ((depth = container.getDepth()) > 1) {
    ancestors.push(container);
    idxs = ancestors.map(function(content) {
      return content.getIndex() + 1;
    });
    idxs.shift();
    return idxs.join('.');
  }
  else {
    return container.getIndex() + 1 + '.';
  }
};


/** @override */
VimHelpContainerPublisher.prototype.getSubContainerSeparator = function(
    container) {
  var depth = container.getDepth();
  var width = this.getDisplayWidth();
  var sepChar;
  if (sepChar = VimHelpContainerPublisher.SEPARATORS[depth]) {
    var paragraphBtmMargin = string.repeat('\n', VimHelpContainerPublisher.
        PARAGRAPH_BOTTOM_MARGIN + 1);

    return paragraphBtmMargin + string.repeat(sepChar, width) + '\n';
  }
  else {
    return null;
  }
};



// Export the constructor.
module.exports = VimHelpContainerPublisher;
