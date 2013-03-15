// This script licensed under the MIT.
// http://orgachem.mit-license.org

var basePath = '../../tsumekusa';
var tsumekusa = require(basePath);


/**
 * A singleton class for inline code publisher for vim help.
 * @constructor
 * @implements {tsumekusa.publishing.IContentPublisher}
 */
var InlineCodePublisher = function() {};
tsumekusa.addSingletonGetter(InlineCodePublisher);


/** @override */
InlineCodePublisher.prototype.publish = function(code) {
  console.warn('The output mode do not support an inline code: ' + code.getCode());
  return code.getCode();
};


// Exports the constructor.
module.exports = InlineCodePublisher;
