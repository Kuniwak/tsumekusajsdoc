// This script licensed under the MIT.
// http://orgachem.mit-license.org

var basePath = '../../tsumekusa';
var tsumekusa = require(basePath);
var BlockContentPublisher = require(basePath +
    '/publishing/BlockContentPublisher');
var WordWrapper = require(basePath + '/publishing/WordWrapper');



/**
 * A singleton class for container publisher.
 * @constructor
 * @extends {tsumekusa.contents.BlockContentPublisher}
 */
var ContainerPublisher = function() {
  BlockContentPublisher.call(this);
};
tsumekusa.inherits(ContainerPublisher, BlockContentPublisher);
tsumekusa.addSingletonGetter(ContainerPublisher);


/**
 * Indent width to be increased by a parent indent width.
 * @const
 * @type {number}
 */
ContainerPublisher.INDENT_WIDTH = 2;


/**
 * Width of indent before a caption to be increased by a parent indent width.
 * @const
 * @type {number}
 */
ContainerPublisher.CAPTION_INDENT_WIDTH = 0;


/**
 * Paragraph space height.
 * @const
 * @type {number}
 */
ContainerPublisher.PARAGRAPH_SPACE = 1;


/**
 * Height of paragraph bottom margin.
 * @const
 * @type {number}
 */
ContainerPublisher.PARAGRAPH_BOTTOM_MARGIN = 1;


/**
 * Height of heahder bottom margin.
 * @const
 * @type {number}
 */
ContainerPublisher.HEADER_BOTTOM_MARGIN = 0;


/**
 * Returns an indent width of the content caption.
 * @param {tsumekusa.contents.BlockContent} content Block content to get an
 *     indent width.
 * @return {number} Indent width.
 */
ContainerPublisher.prototype.getCaptionIndentWidth = function(content) {
  var indentWidth = this.getParentIndentWidth(content);
  return indentWidth + ContainerPublisher.CAPTION_INDENT_WIDTH;
};


/** @override */
ContainerPublisher.prototype.getIndentWidth = function(content) {
  var indentWidth = this.getCaptionIndentWidth(content);
  return indentWidth + ContainerPublisher.INDENT_WIDTH;
};


/**
 * Returns an indent width of the content caption.
 * @param {tsumekusa.contents.BlockContent} content Block content to get an
 *     indent width.
 * @return {number} Indent width.
 */
ContainerPublisher.prototype.getCaptionIndent = function(content, idxLen) {
  var capIndentWidth = this.getCaptionIndentWidth(content);
  var indentWidth = this.getIndentWidth(content);
  return new WordWrapper.Indent(capIndentWidth, indentWidth);
};


/**
 * Creates an index string on head of a header.  Index string foemat as: {@code
 * 1.1.2}.
 * @param {tsumekusa.contents.Container} container Contents container.
 * @return {string} Index string.
 */
ContainerPublisher.prototype.createIndex = function(container) {
  var ancestors = container.getAncestors();
  var depth, idxs;

  if ((depth = container.getDepth()) > 1) {
    ancestors = ancestors.concat(container);
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


/**
 * Publishes a header content string.
 * @param {tsumekusa.contents.Container} container Container content.
 * @return {?string} Header content string, if any.
 */
ContainerPublisher.prototype.publishHeader = function(container) {
  var indent = this.getCaptionIndent(container);
  var width = this.getDisplayWidth();
  var wrapper = new WordWrapper(width, indent);
  var index = this.createIndex(container);
  var caption = container.getCaption();

  return wrapper.wrap([index, caption]) +
      string.repeat('\n', ContainerPublisher.HEADER_BOTTOM_MARGIN + 1);
};


/**
 * Returns an array of block contents as top contents.  You can override the
 * method, if you want to add/remove any top contents.
 * @param {tsumekusa.contents.Container} container Container content.
 * @return {?Array.<string>} Top contents strings, if any.
 * @protected
 */
ContainerPublisher.prototype.publishTopContentsInternal = function(container) {
  var topContents = container.getTopContents().getChildren();
  if (topContents.length > 0) {
    return topContents.map(function(topContent) {
      return topContent.publish();
    });
  }
  else {
    return null;
  }
};


/**
 * Publishes top contents string.
 * @param {tsumekusa.contents.Container} container Container content.
 * @return {?string} Sub containers string, if any.
 */
ContainerPublisher.prototype.publishTopContents = function(container) {
  var topContents;
  if (topContents = this.publishTopContentsInternal(container)) {
    return topContents.join(string.repeat('\n',
        ContainerPublisher.PARAGRAPH_SPACE + 1));
  }
  else {
    return null;
  }
};


/**
 * Returns an array of block contents as sub containers.  You can override the
 * method, if you want to add/remove any sub containers.
 * @param {tsumekusa.contents.Container} container Container content.
 * @return {?Array.<string>} Sub containers strings, if any.
 * @protected
 */
ContainerPublisher.prototype.publishSubContainersInternal = function(
    container) {
  var subContainers = container.getSubContainers().getChildren();
  if (subContainers.length > 0) {
    return subContainers.map(function(subContainer) {
      return subContainer.publish();
    });
  }
  else {
    return null;
  }
};


/**
 * Publishes sub containers string.
 * @param {tsumekusa.contents.Container} container Container content.
 * @return {?string} Sub containers string, if any.
 */
ContainerPublisher.prototype.publishSubContainers = function(container) {
  var subContainerSeparator = this.getSubContainerSeparator(container) ||
      string.repeat('\n', ContainerPublisher.PARAGRAPH_BOTTOM_MARGIN + 1);
  var subContainersStrings = this.publishSubContainersInternal(container);

  if (subContainersStrings) {
    var subContainersString = subContainersStrings.join(subContainerSeparator);

    return [
      subContainerSeparator,
      subContainersString,
    ].join('');
  }
  else {
    return null;
  }
};


/**
 * Publishes a footer content string.
 * @param {tsumekusa.contents.Container} container Container content.
 * @return {?string} Footer content string, if any.
 */
ContainerPublisher.prototype.publishFooter = function(container) {
  return null;
};


/**
 * Returns a saparator string that is insereted between sub containers.
 * @param {tsumekusa.contents.Container} container Container content.
 * @return {?string} Separator string, if any.
 */
ContainerPublisher.prototype.getSubContainerSeparator = function(container) {
  return null;
};


/** @override */
ContainerPublisher.prototype.publish = function(content) {
  var output = [], outputIdx = 0;
  var wrapper = this.getWordWrapper(content);

  var header;
  if (header = this.publishHeader(content)) {
    output[outputIdx++] = header;
  }

  var topContents;
  if (topContents = this.publishTopContents(content)) {
    output[outputIdx++] = topContents;
  }

  var subContainers;
  if (subContainers = this.publishSubContainers(content)) {
    output[outputIdx++] = subContainers;
  }

  var footer;
  if (footer = this.publishFooter(content)) {
    var subContainerSeparator = this.getSubContainerSeparator(content) ||
        string.repeat('\n', ContainerPublisher.PARAGRAPH_BOTTOM_MARGIN + 1);

    output[outputIdx++] = [
      subContainerSeparator,
      footer
    ].join('');
  }

  return output.join('');
};


// Exports the constructor
module.exports = ContainerPublisher;
