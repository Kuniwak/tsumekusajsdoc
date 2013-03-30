// This script licensed under the MIT.
// http://orgachem.mit-license.org


var basePath = '../../tsumekusa';
var tsumekusa = require(basePath);


/**
 * A singleton class for strong publisher.
 * @constructor
 * @implements {tsumekusa.publishing.IElementPublisher}
 */
var StrongPublisher = function() {};
tsumekusa.addSingletonGetter(StrongPublisher);


/** @override */
StrongPublisher.prototype.publish = function(strong) {
  return '#' + strong.getElement() + '#';
};


// Exports the constructor.
module.exports = StrongPublisher;
