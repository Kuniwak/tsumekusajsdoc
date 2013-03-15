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
 * Returns a header content string.
 * @param {tsumekusa.contents.Container} container Container content.
 * @return {?string} Header content string, if any.
 */
ContainerPublisher.prototype.getHeader = function(container) {
  var wrapper = this.getWordWrapper(container);
  return wrapper.wrap([container.getCaption()]) + '\n';
};


/**
 * Returns a footer content string.
 * @param {tsumekusa.contents.Container} container Container content.
 * @return {?string} Footer content string, if any.
 */
ContainerPublisher.prototype.getFooter = function(container) {
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
  if (header = this.getHeader(content)) {
    output[outputIdx++] = header;
  }

  var topContents = content.getTopContents().getChildren();
  if (topContents.length > 0) {
    output[outputIdx++] = topContents.map(function(topContent) {
      return topContent.publish();
    }).join('\n\n');
  }

  var subContainers = content.getSubContainers().getChildren();
  var subContainerSeparator = this.getSubContainerSeparator(content) || '\n';
  if (subContainers.length > 0) {
    var subContainersString = subContainers.map(function(subContainer) {
      return subContainer.publish();
    }).join(subContainerSeparator);

    output[outputIdx++] = [
      subContainerSeparator,
      subContainersString,
      '\n',
    ].join('');
  }

  var footer;
  if (footer = this.getFooter(content)) {
    output[outputIdx++] = [
      subContainerSeparator,
      footer
    ].join('');
  }

  return output.join('\n');
};


// Exports the constructor
module.exports = ContainerPublisher;
