// This script licensed under the MIT.
// http://orgachem.mit-license.org


var tsumekusa = require('tsumekusa');
var util = tsumekusa.util;
var InlineElement = tsumekusa.InlineElement;
var InlineCode = tsumekusa.InlineCode;
var Link = tsumekusa.Link;

var basePath = '../../lib';
var DocElement = require(basePath + '/dom/DocElement');

var jsdoctypeparser = require('jsdoctypeparser');
var TypeParser = jsdoctypeparser.Parser;
var TypeBuilder = jsdoctypeparser.Builder;
var TypeDictionary = jsdoctypeparser.Dictionary;
var dict = TypeDictionary.getInstance();



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
util.inherits(Type, DocElement);



/**
 * A private class for type implementation.
 * @param {jsdoc.Tag} tag Type tag.
 * @constructor
 * @extends {tsumekusa.dom.InlineElement}
 */
Type.TypeImpl = function(tag) {
  InlineElement.call(this);

  var parser = new TypeParser();
  this.types_ = parser.parse((tag.type && tag.type.original) || '?');
};
util.inherits(Type.TypeImpl, InlineElement);


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
  return null;
};


/** @override */
Type.TypeImpl.prototype.isBreakable = function() {
  return false;
};


/** @override */
Type.TypeImpl.prototype.publish = function() {
  return this.types_.toString();
};



/**
 * A class for type name publisher.
 * @constructor
 */
Type.TypeNamePublisher = function() {};
util.addSingletonGetter(Type.TypeNamePublisher);


/**
 * Creates an inline element by type string.
 * @param {string} type Type to be an inline element.
 * @return {tsumekusa.dom.InlineElement} Created element.
 * @protected
 */
Type.TypeNamePublisher.prototype.createInlineElement = function(type) {
  return dict.has(type) ? new InlineCode(type) : new Link(type);
};


/**
 * Publishes a type name object.
 * @param {tsumekusaJsdoc.TypeBuilder.TypeName} typeName Type name to publish.
 * @return {string} Published type name.
 */
Type.TypeNamePublisher.prototype.publish = function(typeName) {
  var name = typeName.name;
  var elem = this.createInlineElement(name);
  return elem.publish();
};


// Replace type name publisher.
TypeBuilder.TypeName.publisher = Type.TypeNamePublisher.getInstance();


// Exports the constructor.
module.exports = Type;