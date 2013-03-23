// This script licensed under the MIT.
// http://orgachem.mit-license.org

var basePath = '../../tsumekusa';
var tsumekusa = require(basePath);
var BlockElementPublisher = require(basePath +
    '/publishing/BlockElementPublisher');
var WordWrapper = require(basePath + '/publishing/WordWrapper');
var Indent = require(basePath + '/publishing/Indent');



/**
 * A singleton class for container publisher.
 * @constructor
 * @extends {tsumekusa.dom.BlockElementPublisher}
 */
var ContainerPublisher = function() {
  BlockElementPublisher.call(this);
};
tsumekusa.inherits(ContainerPublisher, BlockElementPublisher);
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
 * Indent width for children.
 * @const
 * @type {number}
 */
ContainerPublisher.INDENT_WIDTH_FOR_CHILD = 2;


/** @override */
ContainerPublisher.prototype.getIndentWidth = function(elem) {
  var parentContainer;
  if (parentContainer = elem.getParentContainer()) {
    // Ignore an indent width from parent#getIndentWidthForChild
    var publisher = parentContainer.getPublisher();
    return publisher.getIndentWidth(parentContainer);
  }
  return this.getIndentWidthFromParent(elem);
};


/** @override */
ContainerPublisher.prototype.getIndentWidthForChild = function(elem) {
  return this.getIndentWidth(elem) + ContainerPublisher.INDENT_WIDTH_FOR_CHILD;
};


/**
 * Creates an index string on head of a header.  Index string foemat as: {@code
 * 1.1.2}.
 * @param {tsumekusa.dom.Container} container Elements container.
 * @return {string} Index string.
 */
ContainerPublisher.prototype.createIndex = function(container) {
  var ancestors = container.getAncestorContainers();
  var depth, idxs;

  if ((depth = container.getDepth()) > 1) {
    ancestors = ancestors.concat(container);
    idxs = ancestors.map(function(elem) {
      return elem.getIndex() + 1;
    });
    idxs.shift();
    return idxs.join('.');
  }
  else {
    return container.getIndex() + 1 + '.';
  }
};


/**
 * Publishes a header string.
 * @param {tsumekusa.dom.Container} container Container element.
 * @return {?string} Header string, if any.
 */
ContainerPublisher.prototype.publishHeader = function(container) {
  var indent = this.getIndent(container);
  var width = this.getDisplayWidth();
  var wrapper = new WordWrapper(width, indent);
  var index = this.createIndex(container);
  var caption = container.getCaption();

  return wrapper.wrap([index, caption]) +
      string.repeat('\n', ContainerPublisher.HEADER_BOTTOM_MARGIN + 1);
};


/**
 * Publishes top elements string.
 * @param {tsumekusa.dom.Container} container Container element.
 * @return {?string} Sub containers string, if any.
 */
ContainerPublisher.prototype.publishTopElements = function(container) {
  var topElements;
  if (topElements = container.getTopElements()) {
    return topElements.publish();
  }
  else {
    return null;
  }
};


/**
 * Publishes top contents string.
 * @param {tsumekusa.dom.Container} container Container content.
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
 * @param {tsumekusa.dom.Container} container Container content.
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
 * @param {tsumekusa.dom.Container} container Container element.
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
 * Publishes a footer string.
 * @param {tsumekusa.dom.Container} container Container element.
 * @return {?string} Footer string, if any.
 */
ContainerPublisher.prototype.publishFooter = function(container) {
  return null;
};


/**
 * Returns a saparator string that is insereted between sub containers.
 * @param {tsumekusa.dom.Container} container Container element.
 * @return {?string} Separator string, if any.
 */
ContainerPublisher.prototype.getSubContainerSeparator = function(container) {
  return null;
};


/** @override */
ContainerPublisher.prototype.publish = function(elem) {
  var output = [], outputIdx = 0;
  var wrapper = this.getWordWrapper(elem);

  var header;
  if (header = this.publishHeader(elem)) {
    output[outputIdx++] = header;
  }

  var topElements;
  if (topElements = this.publishTopElements(elem)) {
    output[outputIdx++] = topElements;
  }

  var subContainers;
  if (subContainers = this.publishSubContainers(elem)) {
    output[outputIdx++] = subContainers;
  }

  var footer;
  if (footer = this.publishFooter(elem)) {
    var subContainerSeparator = this.getSubContainerSeparator(elem) ||
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
