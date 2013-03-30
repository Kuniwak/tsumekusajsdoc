// This script licensed under the MIT.
// http://orgachem.mit-license.org


var tsumekusaPath = '../tsumekusa';
var tsumekusa = require(tsumekusaPath);

var basePath = '../tsumekusaJsdoc';
var TypeBuilder = require(basePath + '/TypeBuilder');



/**
 * A class for type string parser.
 * @constructor
 */
var TypeParser = function() {
  this.builder_ = new TypeBuilder();
};


/**
 * Parses a type string.
 * @param {string} str Type string to parse.
 * @return {tsumekusaJsdoc.TypeBuilder.TypeUnion} Type union object.
 */
TypeParser.prototype.parse = function(str) {
  this.builder_.setTypeString(str);
  return this.builder_.build();
};


// Exports the constructor.
module.exports = TypeParser;
