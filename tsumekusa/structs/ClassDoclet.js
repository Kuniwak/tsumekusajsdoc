// This script licensed under the MIT.
// http://orgachem.mit-license.org


var tsumekusa = require('../../tsumekusa');
var DocletWrapper = require('./DocletWrapper');



/**
 * A class for class doclet wrapper.
 * @param {jsdoc.Doclet} doclet Doclet to be wrapped.
 * @constructor
 * @extends {tsumekusa.structs.DocletWrapper}
 */
var ClassDoclet = function(doclet) {
  DocletWrapper.call(this, doclet);
  this.staticMethods = [];
  this.staticProperty = [];
  this.instanceMethods = [];
  this.instanceProperty = [];
};
tsumekusa.inherits(ClassDoclet, DocletWrapper);


/**
 * Appends a doclet of static method.  This method is chainable.
 * @param {jsdoc.Doclet} doclet Doclet of static method.
 * @param {jsdoc.structs.ClassDoclet} This instance.
 */
ClassDoclet.prototype.appendStaticMethod = function(doclet) {
  this.staticMethods.push(doclet);
  return this;
};


/**
 * Appends a doclet of instance method.  This method is chainable.
 * @param {jsdoc.Doclet} doclet Doclet of instance method.
 * @param {jsdoc.structs.ClassDoclet} This instance.
 */
ClassDoclet.prototype.appendInstanceMethod = function(doclet) {
  this.instanceMethods.push(doclet);
};


/**
 * Appends a doclet of static property.  This method is chainable.
 * @param {jsdoc.Doclet} doclet Doclet of static property.
 * @param {jsdoc.structs.ClassDoclet} This instance.
 */
ClassDoclet.prototype.appendStaticProperty = function(doclet) {
  this.staticPropertys.push(doclet);
};


/**
 * Appends a doclet of static property.  This method is chainable.
 * @param {jsdoc.Doclet} doclet Doclet of static property.
 * @param {jsdoc.structs.ClassDoclet} This instance.
 */
ClassDoclet.prototype.appendInstanceProperty = function(doclet) {
  this.instancePropertys.push(doclet);
};


// Exports the constructor.
module.exports = ClassDoclet;
