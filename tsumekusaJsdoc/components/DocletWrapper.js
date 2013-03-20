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

  this.ancestors = null;
  this.staticMethods = [];
  this.staticProperties = [];
  this.instanceMethods = [];
  this.instanceProperties = [];
  this.innerMethods = [];
  this.innerProperties = [];
};


/**
 * Ancestors if any.
 * @type {?Array.<tsumekusaJsdoc.components.DocletWrapper>}
 */
DocletWrapper.prototype.ancestors = null;


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
 * An array of inner methods.
 * @type {Array.<jsdoc.Doclet>}
 */
DocletWrapper.prototype.innerMethods = null;


/**
 * An array of inner properties.
 * @type {Array.<jsdoc.Doclet>}
 */
DocletWrapper.prototype.innerProperties = null;


/**
 * Sets ancestors of the doclet.  This method is chainable.
 * @param {?Array.<tsumekusaJsdoc.components.DocletWrapper>}
 */
DocletWrapper.prototype.setAncestors = function(ancestors) {
  this.ancestors = ancestors;
  return this;
};


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
 * Appends a doclet of static property.  This method is chainable.
 * @param {jsdoc.Doclet} doclet Doclet of static property.
 * @param {jsdoc.structs.DocletWrapper} This instance.
 */
DocletWrapper.prototype.appendStaticProperty = function(doclet) {
  this.staticProperties.push(doclet);
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
DocletWrapper.prototype.appendInstanceProperty = function(doclet) {
  this.instanceProperties.push(doclet);
};



/**
 * Appends a doclet of inner method.  This method is chainable.
 * @param {jsdoc.Doclet} doclet Doclet of inner method.
 * @param {jsdoc.structs.DocletWrapper} This instance.
 */
DocletWrapper.prototype.appendInnerMethod = function(doclet) {
  this.innerMethods.push(doclet);
  return this;
};


/**
 * Appends a doclet of inner property.  This method is chainable.
 * @param {jsdoc.Doclet} doclet Doclet of inner property.
 * @param {jsdoc.structs.DocletWrapper} This instance.
 */
DocletWrapper.prototype.appendInnerProperty = function(doclet) {
  this.innerProperties.push(doclet);
};

// Exports the constructor.
module.exports = DocletWrapper;
