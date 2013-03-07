// This script licensed under the MIT.
// http://orgachem.mit-license.org



/**
 * A class for doclet wrapper.  This wrapper stores static/instance members
 * additionally.
 * @param {jsdoc.Doclet} doclet Doclet to be wrapped.
 * @constructor
 */
var DocletWrapper = function(opt_doclet) {
  if (opt_doclet) {
    this.setOriginalDoclet(opt_doclet);
  }

  this.staticMethods = [];
  this.staticProperties = [];
  this.instanceMethods = [];
  this.instanceProperties = [];
};


/**
 * An array of static methods.
 * @type {Array.<jsdoc.Doclet>}
 */
DocletWrapper.prototype.staticMethods = null;


/**
 * An array of static properties.
 * @type {Array.<jsdoc.Doclet>}
 */
DocletWrapper.prototype.staticProperties = null;


/**
 * An array of instance methods.
 * @type {Array.<jsdoc.Doclet>}
 */
DocletWrapper.prototype.instanceMethods = null;


/**
 * An array of instance properties.
 * @type {Array.<jsdoc.Doclet>}
 */
DocletWrapper.prototype.instanceProperties = null;


/**
 * Sets an original doclet.  This method is chainable.
 * Note: You cannot set a doclet when the wrapper was already set a doclet.
 * @param {jsdoc.Doclet} doclet Wrapped doclet.
 * @return {tsumekusa.structs.DocletWrapper} This instance.
 */
DocletWrapper.prototype.setOriginalDoclet = function(doclet) {
  if (this.doclet_) {
    throw Error('The doclet was already defined: ' + this.doclet_.longname);
  }

  this.doclet_ = doclet;
  return this;
};


/**
 * Returns an original doclet.
 * @return {jsdoc.Doclet} Wrapped doclet.
 */
DocletWrapper.prototype.getOriginalDoclet = function() {
  return this.doclet_;
};


/**
 * Appends a doclet of static method.  This method is chainable.
 * @param {jsdoc.Doclet} doclet Doclet of static method.
 * @param {jsdoc.structs.DocletWrapper} This instance.
 */
DocletWrapper.prototype.appendStaticMethod = function(doclet) {
  this.staticMethods.push(doclet);
  return this;
};


/**
 * Appends a doclet of instance method.  This method is chainable.
 * @param {jsdoc.Doclet} doclet Doclet of instance method.
 * @param {jsdoc.structs.DocletWrapper} This instance.
 */
DocletWrapper.prototype.appendInstanceMethod = function(doclet) {
  this.instanceMethods.push(doclet);
};


/**
 * Appends a doclet of static property.  This method is chainable.
 * @param {jsdoc.Doclet} doclet Doclet of static property.
 * @param {jsdoc.structs.DocletWrapper} This instance.
 */
DocletWrapper.prototype.appendStaticProperty = function(doclet) {
  this.staticProperties.push(doclet);
};


/**
 * Appends a doclet of static property.  This method is chainable.
 * @param {jsdoc.Doclet} doclet Doclet of static property.
 * @param {jsdoc.structs.DocletWrapper} This instance.
 */
DocletWrapper.prototype.appendInstanceProperty = function(doclet) {
  this.instanceProperties.push(doclet);
};


// Exports the constructor.
module.exports = DocletWrapper;
