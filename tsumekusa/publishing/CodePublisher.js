// This script licensed under the MIT.
// http://orgachem.mit-license.org

var basePath = '../../tsumekusa';
var tsumekusa = require(basePath);


/**
 * A singleton class for inline code publisher for vim help.
 * @constructor
 * @implements {tsumekusa.publishing.IContentPublisher}
 */
var CodePublisher = function() {};
tsumekusa.addSingletonGetter(CodePublisher);


/** @override */
CodePublisher.prototype.publish = function(code) {
  console.warn('The output mode do not support a code: ' + code.getCode());
  return code.getCode();
};


// Exports the constructor.
module.exports = CodePublisher;
