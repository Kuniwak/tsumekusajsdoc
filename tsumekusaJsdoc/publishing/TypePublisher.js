// This script licensed under the MIT.
// http://orgachem.mit-license.org


var tsumekusaPath = '../../tsumekusa';
var tsumekusa = require(tsumekusaPath);

var basePath = '../../tsumekusaJsdoc';



/**
 * A class for Type publisher.
 * @constructor
 * @implements {tsumekusa.publishing.IElementPublisher}
 */
var TypePublisher = function() {};
tsumekusa.addSingletonGetter(TypePublisher);


/**
 * Returns a Type operator character for OR.
 * @return {string} Type operator character for OR.
 * @protected
 */
TypePublisher.prototype.getOrOperatorChar = function() {
  return '|';
};


/** @override */
TypePublisher.prototype.publish = function(type) {
  return type.getTypeElements().map(function(type) {
    return typeof type === 'string' ? type : type.publish();
  }, this).join(this.getOrOperatorChar());
};


// Exports the constructor.
module.exports = TypePublisher;
