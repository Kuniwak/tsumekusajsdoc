// This script licensed under the MIT.
// http://orgachem.mit-license.org


var tsumekusaPath = '../../tsumekusa';
var tsumekusa = require(tsumekusaPath);
var InlineElement = require(tsumekusaPath + '/dom/InlineElement');
var Link = require(tsumekusaPath + '/dom/Link');

var basePath = '../../tsumekusaJsdoc';
var DocElement = require(basePath +
    '/dom/DocElement');



/**
 * A class for type notation.
 * @param {jsdoc.Tag} tag Type tag.
 * @param {?tsumekusaJsdoc.dom.DocHelper=} opt_docHelper Optional
 *     document helper.
 * @param {?tsumekusaJsdoc.references.ReferenceHelper=} opt_refHelper Optional
 *     reference helper.
 * @constructor
 * @extends {tsumekusaJsdoc.dom.DocElement}
 */
var Type = function(tag, opt_docHelper, opt_refHelper) {
  DocElement.call(this, opt_docHelper, opt_refHelper);
  var typeImpl = new Type.TypeImpl(tag);
  this.setElement(typeImpl);
};
tsumekusa.inherits(Type, DocElement);



/**
 * A private class for type implementation.
 * @param {jsdoc.Tag} tag Type tag.
 * @constructor
 * @extends {tsumekusa.dom.InlineElement}
 */
Type.TypeImpl = function(tag) {
  InlineElement.call(this);
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

    if (tag.optional) {
      types[typeIdx++] = 'undefined';
    }
  }
  else {
    types = ['?'];
  }

  this.types_ = types;
};
tsumekusa.inherits(Type.TypeImpl, InlineElement);


/**
 * Type contents.
 * @type {Array.<tsumekusa.dom.InlineElement|string>}
 * @private
 */
Type.TypeImpl.prototype.types_ = null;


/**
 * Returns elements explain types.
 * @return {Array.<tsumekusa.dom.InlineElement|string>} Elements explain types.
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
