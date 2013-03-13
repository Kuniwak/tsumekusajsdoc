// This script licensed under the MIT.
// http://orgachem.mit-license.org

var basePath = '../../tsumekusa';
var tsumekusa = require(basePath);



/**
 * A class for tag content publisher.
 * @constructor
 * @implements {tsumekusa.publishing.ContentPublisher}
 */
var TagPublisher = function() {};
tsumekusa.addSingletonGetter(TagPublisher);


/** @override */
TagPublisher.prototype.publish = function(tag) {
  var refId = tag.getReferenceId();
  console.warn('The output format do not support a tag: ' + refId);
  return refId;
};


// Exports the constructor
module.exports = TagPublisher;
