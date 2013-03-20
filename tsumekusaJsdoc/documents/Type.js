// This script licensed under the MIT.
// http://orgachem.mit-license.org


var tsumekusaPath = '../../tsumekusa';
var tsumekusa = require(tsumekusaPath);
var Link = require(tsumekusaPath + '/contents/Link');

var basePath = '../../tsumekusaJsdoc';
var DocumentationContent = require(basePath +
    '/documents/DocumentationContent');



/**
 * A class for type notation.
 * @param {jsdoc.Tag} tag Tag.
 * @param {?tsumekusaJsdoc.documents.DocumentHelper=} opt_docHelper Optional
 *     document helper.
 * @param {?tsumekusaJsdoc.references.ReferenceHelper=} opt_refHelper Optional
 *     reference helper.
 * @constructor
 * @extends {tsumekusaJsdoc.documents.DocumentationContent}
 */
var Type = function(tag, opt_docHelper, opt_refHelper) {
  DocumentationContent.call(this, opt_docHelper, opt_refHelper);
  this.setContent(null);

  var types, typeIdx = 0;
  var refHelper = this.getReferenceHelper();

  // TODO: Generics support
  if (tag.type && tag.type.names && tag.type.names.length > 0) {
    types = [];

    tag.type.names.forEach(function(type) {
      types[typeIdx++] = new Link(type);
    }, this);

    if (tag.nullable) {
      types[typeIdx++] = 'null';
    }
  }
  else {
    types = ['?'];
  }

  this.types_ = types;
};
tsumekusa.inherits(Type, DocumentationContent);


/**
 * Type contents.
 * @type {Array.<tsumekusa.contents.InlineContent|string>}
 * @private
 */
Type.prototype.types_ = null;


/**
 * Returns a Type operator character for OR.
 * @return {string} Type operator character for OR.
 * @protected
 */
Type.prototype.getOrOperatorChar = function() {
  return '|';
};


/** @override */
Type.prototype.isBreakable = function() {
  return false;
};


/** @override */
Type.prototype.publish = function() {
  return this.types_.map(function(type) {
    return typeof type === 'string' ? type : type.publish();
  }).join(this.getOrOperatorChar());
};


// Exports the constructor.
module.exports = Type;
