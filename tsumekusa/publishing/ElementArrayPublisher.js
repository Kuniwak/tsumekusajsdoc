// This script licensed under the MIT.
// http://orgachem.mit-license.org


var basePath = '../../tsumekusa';
var tsumekusa = require(basePath);
var string = require(basePath + '/string');
var BlockElementPublisher = require(basePath +
    '/publishing/BlockElementPublisher');


/**
 * A class for element array publisher.
 * @constructor
 * @extends {tsumekusa.publishing.BlockElementPublisher}
 */
var ElementArrayPublisher = function() {
  BlockElementPublisher.call(this);
};
tsumekusa.inherits(ElementArrayPublisher, BlockElementPublisher);
tsumekusa.addSingletonGetter(ElementArrayPublisher);


/**
 * Paragraph space height.
 * @const
 * @type {number}
 */
ElementArrayPublisher.PARAGRAPH_SPACE = 1;


/**
 * Publishes for each child.
 * @param {tsumekusa.dom.ElementArray} elemArr Element array to publish.
 * @return {Array.<string>} Array of published child.
 */
ElementArrayPublisher.prototype.publishForEachChild = function(elemArr) {
  return elemArr.getChildren().map(function(elem) {
    return elem.publish();
  });
};


/** @override */
ElementArrayPublisher.prototype.publish = function(elemArr) {
  return this.publishForEachChild(elemArr).join(
      string.repeat('\n', ElementArrayPublisher.PARAGRAPH_SPACE + 1));
};


// Exports the constructor.
module.exports = ElementArrayPublisher;
