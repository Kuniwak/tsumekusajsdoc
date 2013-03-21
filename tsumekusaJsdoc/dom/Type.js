// This script licensed under the MIT.
// http://orgachem.mit-license.org


var tsumekusaPath = '../../tsumekusa';
var tsumekusa = require(tsumekusaPath);
var InlineContent = require(tsumekusaPath + '/dom/InlineContent');
var Link = require(tsumekusaPath + '/dom/Link');

var basePath = '../../tsumekusaJsdoc';
var DocumentationContent = require(basePath +
    '/dom/DocumentationContent');



/**
 * A class for type notation.
 * @param {jsdoc.Tag} tag Type tag.
 * @param {?tsumekusaJsdoc.dom.DocumentHelper=} opt_docHelper Optional
 *     document helper.
 * @param {?tsumekusaJsdoc.references.ReferenceHelper=} opt_refHelper Optional
 *     reference helper.
 * @constructor
 * @extends {tsumekusaJsdoc.dom.DocumentationContent}
 */
var Type = function(tag, opt_docHelper, opt_refHelper) {
  DocumentationContent.call(this, opt_docHelper, opt_refHelper);
  var typeImpl = new Type.TypeImpl(tag);
  this.setContent(typeImpl);
};
tsumekusa.inherits(Type, DocumentationContent);



/**
 * A private class for type implementation.
 * @param {jsdoc.Tag} tag Type tag.
 * @constructor
 * @extends {tsumekusa.dom.InlineContent}
 */
Type.TypeImpl = function(tag) {
  InlineContent.call(this);
  var types, typeIdx = 0;

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
tsumekusa.inherits(Type.TypeImpl, InlineContent);


/**
 * Type contents.
 * @type {Array.<tsumekusa.dom.InlineContent|string>}
 * @private
 */
Type.TypeImpl.prototype.types_ = null;


/**
 * Returns elements explain types.
 * @return {Array.<tsumekusa.dom.InlineContent|string>} Elements explain types.
 */
Type.TypeImpl.prototype.getTypeElements = function() {
  return this.types_;
};


/** @override */
Type.TypeImpl.prototype.getPublisher = function() {
  return Type.publisher;
};


/** @override */
Type.TypeImpl.prototype.isBreakable = function() {
  return false;
};


// Exports the constructor.
module.exports = Type;
