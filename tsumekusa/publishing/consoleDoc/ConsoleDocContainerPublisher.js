// This script licensed under the MIT.
// http://orgachem.mit-license.org


var tsumekusa = require('../../../tsumekusa');



/**
 * A class for container publisher for console.
 * @constructor
 * @implements {tsumekusa.publishing.IContentPublisher}
 */
var ConsoleDocContainerPublisher = function() {};
tsumekusa.addSingletonGetter(ConsoleDocContainerPublisher);


/**
 * Returns a header content.
 * @param {tsumekusa.contents.Container} container Contents container.
 * @return {string} Published a header string.
 */
ConsoleDocContainerPublisher.prototype.createHeader = function(container) {
  return this.getCaption().toUpperCase();
};


/**
 * Returns a footer content.
 * @param {tsumekusa.contents.Container} container Contents container.
 * @return {string} Published a footer string.
 */
ConsoleDocContainerPublisher.prototype.createFooter = function(container) {
  return null;
};


/**
 * Creates a top content.
 * @param {tsumekusa.contents.Container} container Contents container.
 * @return {string} Top content.
 */
ConsoleDocContainerPublisher.prototype.createTopContents = function(container) {
  var topContents = container.getTopContents();

  if (topContents.length > 0) {
    return topContents.map(function(topContent) {
      return topContent.publish();
    }).join('\n\n') + '\n';
  }

  return null;
};


/**
 * Creates sub contents.
 * @param {tsumekusa.contents.Container} container Contents container.
 * @return {string} Sub contents.
 */
ConsoleDocContainerPublisher.prototype.createSubContents = function(container) {
  var subContents = container.getSubContainers();

  if (subContents.length > 0) {
    return subContents.map(function(subContainer) {
      return subContainer.publish();
    }).join('\n\n') + '\n';
  }

  return null;
};


/** @override */
ConsoleDocContainerPublisher.prototype.publish = function(container) {
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
module.exports = ConsoleDocContainerPublisher;
