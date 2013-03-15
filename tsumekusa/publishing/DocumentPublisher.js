// This script licensed under the MIT.
// http://orgachem.mit-license.org


var basePath = '../../tsumekusa/';
var tsumekusa = require(basePath);
var ContentsTable = require(basePath + '/contents/ContentsTable');
var ContainerPublisher = require(basePath + '/publishing/ContainerPublisher');



/**
 * A singleton class for document publishers.
 * @constructor
 * @extends {tsumekusa.publishing.ContainerPublisher}
 */
var DocumentPublisher = function() {
  ContainerPublisher.call(this);
};
tsumekusa.inherits(DocumentPublisher, ContainerPublisher);


/**
 * Whether contents table is published.
 * @const
 * @type {boolean}
 */
DocumentPublisher.ENABLED_CONTENTS_TABLE = true;


/**
 * Returns an array of block contents as sub containers and table of contents if
 * enabled.  You can override the method, if you want to add/remove any sub
 * containers.
 * @param {tsumekusa.contents.Container} container Container content.
 * @return {?Array.<string>} Contents table and sub containers strings, if any.
 * @protected
 * @override
 */
DocumentPublisher.prototype.publishSubContainersInternal = function(container) {
  var subContainers = ContainerPublisher.prototype.publishSubContainersInternal.
      call(this, container);

  if (DocumentPublisher.ENABLED_CONTENTS_TABLE) {
    if (subContainers) {
      return [this.publishContentsTable(container)].concat(subContainers);
    }
    else {
      return [this.publishContentsTable(container)];
    }
  }
  return subContainers;
};


/**
 * Publishes table of contents.
 * @param {tsumekusa.contents.Container} container Container content.
 * @return {string} Contents table string.
 */
DocumentPublisher.prototype.publishContentsTable = function(container) {
  return ContentsTable.publisher.publish(container);
};


// Exports the constructor.
module.exports = DocumentPublisher;
