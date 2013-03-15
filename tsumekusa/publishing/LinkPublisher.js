// This script licensed under the MIT.
// http://orgachem.mit-license.org


var basePath = '../../tsumekusa';
var tsumekusa = require(basePath);



/**
 * A class for link content publisher.
 * @constructor
 * @implements {tsumekusa.publishing.IContentPublisher}
 */
var LinkPublisher = function() {};
tsumekusa.addSingletonGetter(LinkPublisher);


/** @override */
LinkPublisher.prototype.publish = function(link) {
  var refId = link.getTargetReferenceId();
  console.warn('The output format do not support a link: ' + refId);
  return refId;
};


// Exports the constructor
module.exports = LinkPublisher;
