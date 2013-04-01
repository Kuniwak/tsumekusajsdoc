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
 * Type builder.
 * @type {tsumekusaJsdoc.TypeBuilder}
 * @private
 */
TypeParser.prototype.builder_ = null;


/**
 * Parses a type string.
 * @param {jsdoc.Tag} tag Tag has a type.
 * @return {tsumekusaJsdoc.TypeBuilder.TypeUnion} Type union object.
 */
TypeParser.prototype.parse = function(tag) {
  if (!tag.type || !tag.type.names) {
    var union = new TypeBuilder.TypeUnion();
    union.setUnknownType(true);
    return union;
  }
  else {
    // Rollback to a raw type string, because type parsing is loose in default.
    var str = tag.type.names.join('|');

    var builder = this.builder_;
    builder.setTypeString(str);

    var union = builder.build();
    union.setOptionalType(!!tag.optional);
    union.setNullableType(!!tag.nullable);
    union.setVariableType(!!tag.variable);
    union.setUnknownType(tag.type.names <= 0);
  }

  return union;
};


// Exports the constructor.
module.exports = TypeParser;
