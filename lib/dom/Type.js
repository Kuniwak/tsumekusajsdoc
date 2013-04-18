// This script licensed under the MIT.
// http://orgachem.mit-license.org

/**
 * @fileoverview A class for type expressions.
 * @author orga.cham.job@gmail.com (Orga Chem)
 */


var tsumekusa = require('../../node_modules/tsumekusa');
var util = tsumekusa.util;
var InlineElement = tsumekusa.InlineElement;
var InlineCode = tsumekusa.InlineCode;
var Link = tsumekusa.Link;

var basePath = '../../lib';
var DocElement = require(basePath + '/dom/DocElement');

var jsdoctypeparser = require('../../node_modules/jsdoctypeparser');
var TypeParser = jsdoctypeparser.Parser;
var TypeBuilder = jsdoctypeparser.Builder;
var TypeDictionary = jsdoctypeparser.Dictionary;
var dict = TypeDictionary.getInstance();



/**
 * A class for type expressions.
 * @param {jsdoc.Tag} tag Type tag.
 * @param {?module:lib/dom/DocHelper=} opt_docHelper Optional
 *     document helper.
 * @param {?module:lib/references/ReferenceHelper=} opt_refHelper Optional
 *     reference helper.
 * @constructor
 * @extends {module:lib/dom/DocElement}
 * @exports lib/dom/Type
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
 * @extends {module: tsumekusa/dom/InlineElement}
 */
Type.TypeImpl = function(tag) {
  InlineElement.call(this);

  var parser = new TypeParser();

  var union;
  if (tag.type && tag.type.names) {
    // Rollback to an original type expression to convert the link.
    union = parser.parse(tag.type.names.join('|') || '?');
    union.setOptionalType(!!tag.optional);
    union.setNullableType(!!tag.nullable);
    union.setVariableType(!!tag.variable);
  }
  else {
    union = parser.parse('?');
  }

  this.types_ = union;
};
util.inherits(Type.TypeImpl, InlineElement);


/**
 * Type contents.
 * @type {Array.<module: tsumekusa.dom.InlineElement|string>}
 * @private
 */
Type.TypeImpl.prototype.types_ = null;


/**
 * Returns elements explain types.
 * @return {Array.<module: tsumekusa.dom.InlineElement|string>} Elements explain
 *     types.
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
 * @return {module: tsumekusa/dom/InlineElement} Created element.
 * @protected
 */
Type.TypeNamePublisher.prototype.createInlineElement = function(type) {
  return dict.has(type) ? new InlineCode(type) : new Link(type);
};


/**
 * Publishes a type name object.
 * @param {module: jsdoctypeparser/TypeBuilder.TypeName} typeName Type name to publish.
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
