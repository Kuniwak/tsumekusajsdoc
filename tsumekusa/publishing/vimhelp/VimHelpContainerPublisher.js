// This script licensed under the MIT.
// http://orgachem.mit-license.org


var basePath = '../../../tsumekusa';
var tsumekusa = require(basePath);
var string = require(basePath + '/string');
var vimhelp = require(basePath + '/publishing/vimhelp');
var BlockContentPublisher = require(basePath + '/publishing/BlockContentPublisher');



/**
 * A class for container publisher for vim help.
 * @constructor
 * @implements {tsumekusa.publishing.IContentPublisher}
 */
var VimHelpContainerPublisher = function() {
  BlockContentPublisher.call(this);
  this.setDisplayWidth(vimhelp.TEXT_WIDTH);
};
tsumekusa.inherits(VimHelpContainerPublisher, BlockContentPublisher);
tsumekusa.addSingletonGetter(VimHelpContainerPublisher);


/**
 * Separator characters.  First char is used in top level container, and second
 * char is used in second level container.
 * @const
 * @type {string}
 */
VimHelpContainerPublisher.SEPARATORS = '=-';


/** @override */
VimHelpContainerPublisher.prototype.getIndentLevel = function(content) {
  var parent = content.getParent();
  return parent ? parent.getPublisher().getIndentLevel(parent) : 0;
};


/**
 * Returns a header content.
 * @param {tsumekusa.contents.Container} container Contents container
 *     to create a header.
 * @return {tsumekusa.contents.Content} Header content.
 */
VimHelpContainerPublisher.prototype.createHeader = function(container) {
  var indexString = this.createIndex(container);
  var tag = container.getTag();
  var tagString = tag.publish();

  var head = indexString + ' ' + container.getCaption();
  var tail = tagString;
  return string.fillMiddle(head, tail, vimhelp.TEXT_WIDTH) + '\n';
};


/**
 * Returns a footer content.
 * @param {tsumekusa.contents.Container} container Contents container
 *     to create a footer.
 * @return {tsumekusa.contents.Content} Footer content.
 */
VimHelpContainerPublisher.prototype.createFooter = function(container) {
  return null;
};


/**
 * Creates an index string on head of a header.  Index string foemat as: {@code
 * 1.1.2}.
 * @param {tsumekusa.contents.Container} container Contents container.
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
    return container.getDepth() + '.';
  }
};


/**
 * Creates a separator between sub contents.
 * @param {tsumekusa.contents.Container} container Contents container.
 * @return {string} Separator.
 */
VimHelpContainerPublisher.prototype.createSubContentSeparator =
    function(container) {
  var i = container.getDepth();
  var SEP = VimHelpContainerPublisher.SEPARATORS;
  var sepChar;

  if (sepChar = SEP[i]) {
    return '';
  }
  else {
    return '\n' + string.repeat(sepChar, vimhelp.TEXT_WIDTH) + '\n';
  }
};


/**
 * Creates a top content.
 * @param {tsumekusa.contents.Container} container Contents container.
 * @return {string} Top content.
 */
VimHelpContainerPublisher.prototype.createTopContents = function(container) {
  var topContents = container.getTopContents();

  if (topContents.getCount() > 0) {
    return topContents.getChildren().map(function(topContent) {
      return topContent.publish();
    }).join('\n') + '\n';
  }

  return null;
};


/**
 * Creates sub contents.
 * @param {tsumekusa.contents.Container} container Contents container.
 * @return {string} Sub contents.
 */
VimHelpContainerPublisher.prototype.createSubContents = function(container) {
  var separator = this.createSubContentSeparator(container);
  var subStrings = this.createSubContentsInternal(container);

  if (subStrings.length > 0) {
    var subsString = subStrings.join(separator);
    return separator + subsString;
  }

  return null;
};


/**
 * Creates a sub contents string internally.
 * @param {tsumekusa.contents.Container} container Contents container.
 * @return {Array.<string>} Sub contents.
 * @protected
 */
VimHelpContainerPublisher.prototype.createSubContentsInternal = function(
    container) {
  return container.getSubContainers().getChildren().map(function(content) {
    return content.publish();
  });
};


/** @override */
VimHelpContainerPublisher.prototype.publish = function(container) {
  var output = [];
  var header = this.createHeader(container);
  if (header) {
    output.push(header);
  }
  var topContent = this.createTopContents(container);
  if (topContent) {
    output.push(topContent);
  }
  else {
    output.push('');
  }
  var subContents = this.createSubContents(container);
  if (subContents) {
    output.push(subContents);
  }
  var footer = this.createFooter(container);
  if (footer) {
    output.push(footer);
  }

  return output.join('\n');
};


// Export the constructor.
module.exports = VimHelpContainerPublisher;
