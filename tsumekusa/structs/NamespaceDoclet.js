// This script licensed under the MIT.
// http://orgachem.mit-license.org


var tsumekusa = require('../../tsumekusa');
var DocletWrapper = require('./DocletWrapper');


/**
 * A class for namespace doclet wrapper.
 * @param {jsdoc.Doclet} doclet Doclet to be wrapped.
 * @constructor
 * @extends {tsumekusa.structs.DocletWrapper}
 */
var NamespaceDoclet = function(doclet) {
  DocletWrapper.call(this, doclet);
  this.staticMethods = [];
  this.staticProperty = [];
};
tsumekusa.inherits(NamespaceDoclet, DocletWrapper);


/**
 * Appends a doclet of static method.  This method is chainable.
 * @param {jsdoc.Doclet} doclet Doclet of static method.
 * @param {jsdoc.structs.NamespaceDoclet} This instance.
 */
NamespaceDoclet.prototype.appendStaticMethod = function(doclet) {
  this.staticMethods.push(doclet);
  return this;
};


/**
 * Appends a doclet of static property.  This method is chainable.
 * @param {jsdoc.Doclet} doclet Doclet of static property.
 * @param {jsdoc.structs.NamespaceDoclet} This instance.
 */
NamespaceDoclet.prototype.appendStaticProperty = function(doclet) {
  this.staticPropertys.push(doclet);
};


// Exports the constructor.
module.exports = NamespaceDoclet;
