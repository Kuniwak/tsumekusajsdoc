// This script licensed under the MIT.
// http://orgachem.mit-license.org

var basePath = '../../tsumekusa';
var tsumekusa = require(basePath);
var BlockContentPublisher = require(basePath +
    '/publishing/BlockContentPublisher');



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
 * Paragraph space height.
 * @const
 * @type {number}
 */
ContainerPublisher.PARAGRAPH_SPACE = 1;


/**
 * Paragraph space height.
 * @const
 * @type {number}
 */
ContainerPublisher.PARAGRAPH_BOTTOM_MARGIN = 1;


/**
 * Bottom margin on a header.
 * @const
 * @type {number}
 */
ContainerPublisher.HEADER_BOTTOM_MARGIN = 1;


/**
 * Publishes a header content string.
 * @param {tsumekusa.contents.Container} container Container content.
 * @return {?string} Header content string, if any.
 */
ContainerPublisher.prototype.publishHeader = function(container) {
  var wrapper = this.getWordWrapper(container);
  return wrapper.wrap([container.getCaption()]) +
      string.repeat('\n', ContainerPublisher.HEADER_BOTTOM_MARGIN + 1 -
      ContainerPublisher.PARAGRAPH_BOTTOM_MARGIN);
};


/**
 * Publishes top contents string.
 * @param {tsumekusa.contents.Container} container Container content.
 * @return {?string} Sub containers string, if any.
 */
ContainerPublisher.prototype.publishTopContents = function(container) {
  var topContents = container.getTopContents().getChildren();
  if (topContents.length > 0) {
    return topContents.map(function(topContent) {
      return topContent.publish();
    }).join(string.repeat('\n', ContainerPublisher.PARAGRAPH_SPACE + 1));
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
  var subContainers = container.getSubContainers().getChildren();
  var subContainerSeparator = this.getSubContainerSeparator(container) || '\n';
  if (subContainers.length > 0) {
    var subContainersString = subContainers.map(function(subContainer) {
      return subContainer.publish();
    }).join(subContainerSeparator);

    return [
      subContainerSeparator,
      subContainersString,
      string.repeat('\n', ContainerPublisher.PARAGRAPH_BOTTOM_MARGIN)
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
ContainerPublisher.prototype.getIndentWidthInternal = function(content, width) {
  return width + 2;
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
    output[outputIdx++] = [
      subContainerSeparator,
      footer
    ].join('');
  }

  return output.join(string.repeat('\n',
      ContainerPublisher.PARAGRAPH_BOTTOM_MARGIN));
};


// Exports the constructor
module.exports = ContainerPublisher;
