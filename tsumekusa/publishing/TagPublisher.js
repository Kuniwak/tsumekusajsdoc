// This script licensed under the MIT.
// http://orgachem.mit-license.org

var basePath = '../../tsumekusa';
var tsumekusa = require(basePath);



/**
 * A class for tag content publisher.
 * @constructor
 * @implements {tsumekusa.publishing.IElementPublisher}
 */
var TagPublisher = function() {};
tsumekusa.addSingletonGetter(TagPublisher);


/** @override */
TagPublisher.prototype.publish = function(tag) {
  tsumekusa.warn('The output format do not support a tag element: ' + refId);

  var refId = tag.getReferenceId();
  return refId;
};


// Exports the constructor.
module.exports = TagPublisher;
