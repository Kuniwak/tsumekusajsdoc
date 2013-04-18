// This script licensed under the MIT.
// http://orgachem.mit-license.org

/**
 * @fileoverview A class for doclet wrappers.  This wrapper stores
 * static/instance members additionally.
 * @author orga.cham.job@gmail.com (Orga Chem)
 */



/**
 * A class for doclet wrappers.  This wrapper stores static/instance members
 * additionally.
 * @param {module:lib/dom/DocletWrapper} doclet Doclet to be wrapped.
 * @constructor
 * @exports lib/dom/DocletWrapper
 */
var DocletWrapper = function(opt_doclet) {
  if (opt_doclet) {
    this.setOriginalDoclet(opt_doclet);
  }

  this.ancestors = [];
  this.staticMethods = [];
  this.staticProperties = [];
  this.instanceMethods = [];
  this.instanceProperties = [];
  this.innerMethods = [];
  this.innerProperties = [];
};


/**
 * Ancestors if any.
 * @type {Array.<string>}
 */
DocletWrapper.prototype.ancestors = null;


/**
 * An array of static methods.
 * @type {Array.<module:lib/dom/DocletWrapper>}
 */
DocletWrapper.prototype.staticMethods = null;


/**
 * An array of static properties.
 * @type {Array.<module:lib/dom/DocletWrapper>}
 */
DocletWrapper.prototype.staticProperties = null;


/**
 * An array of instance methods.
 * @type {Array.<module:lib/dom/DocletWrapper>}
 */
DocletWrapper.prototype.instanceMethods = null;


/**
 * An array of instance properties.
 * @type {Array.<module:lib/dom/DocletWrapper>}
 */
DocletWrapper.prototype.instanceProperties = null;


/**
 * An array of inner methods.
 * @type {Array.<module:lib/dom/DocletWrapper>}
 */
DocletWrapper.prototype.innerMethods = null;


/**
 * An array of inner properties.
 * @type {Array.<module:lib/dom/DocletWrapper>}
 */
DocletWrapper.prototype.innerProperties = null;


/**
 * Copies properties from a doclet.
 * @param {module:lib/dom/DocletWrapper} doclet Doclet has properties to
 *     copy.
 * @protected
 */
DocletWrapper.prototype.copyFromDoclet = function(doclet) {
  var value;
  for (var key in doclet) {
    if (doclet.hasOwnProperty(key)) {
      this[key] = doclet[key];
    }
  }
};


/**
 * Sets ancestors of the doclet.  This method is chainable.
 * @param {?Array.<module:lib/dom/DocletWrapper>}
 */
DocletWrapper.prototype.setAncestors = function(ancestors) {
  this.ancestors = ancestors;
  return this;
};


/**
 * Sets an original doclet.  This method is chainable.
 * Note: You cannot set a doclet when the wrapper was already set a doclet.
 * @param {module:lib/dom/DocletWrapper} doclet Wrapped doclet.
 * @return {tsumekusa.structs.DocletWrapper} This instance.
 */
DocletWrapper.prototype.setOriginalDoclet = function(doclet) {
  if (this.doclet_ && this.doclet_.longname !== doclet.longname) {
    throw Error('The doclet was already defined: ' + this.doclet_.longname +
        ' !== ' + doclet.longname);
  }

  this.copyFromDoclet(doclet);
  this.doclet_ = doclet;
  return this;
};


/**
 * Returns an original doclet.
 * @return {module:lib/dom/DocletWrapper} Wrapped doclet.
 */
DocletWrapper.prototype.getOriginalDoclet = function() {
  return this.doclet_;
};


/**
 * Appends a doclet of static method.  This method is chainable.
 * @param {module:lib/dom/DocletWrapper} doclet Doclet of static method.
 * @param {module:lib/dom/DocletWrapper} This instance.
 */
DocletWrapper.prototype.appendStaticMethod = function(doclet) {
  this.staticMethods.push(doclet);
  return this;
};


/**
 * Appends a doclet of static property.  This method is chainable.
 * @param {module:lib/dom/DocletWrapper} doclet Doclet of static property.
 * @param {module:lib/dom/DocletWrapper} This instance.
 */
DocletWrapper.prototype.appendStaticProperty = function(doclet) {
  this.staticProperties.push(doclet);
  return this;
};


/**
 * Appends a doclet of instance method.  This method is chainable.
 * @param {module:lib/dom/DocletWrapper} doclet Doclet of instance method.
 * @param {module:lib/dom/DocletWrapper} This instance.
 */
DocletWrapper.prototype.appendInstanceMethod = function(doclet) {
  this.instanceMethods.push(doclet);
  return this;
};


/**
 * Appends a doclet of static property.  This method is chainable.
 * @param {module:lib/dom/DocletWrapper} doclet Doclet of static property.
 * @param {module:lib/dom/DocletWrapper} This instance.
 */
DocletWrapper.prototype.appendInstanceProperty = function(doclet) {
  this.instanceProperties.push(doclet);
  return this;
};



/**
 * Appends a doclet of inner method.  This method is chainable.
 * @param {module:lib/dom/DocletWrapper} doclet Doclet of inner method.
 * @param {module:lib/dom/DocletWrapper} This instance.
 */
DocletWrapper.prototype.appendInnerMethod = function(doclet) {
  this.innerMethods.push(doclet);
  return this;
};


/**
 * Appends a doclet of inner property.  This method is chainable.
 * @param {module:lib/dom/DocletWrapper} doclet Doclet of inner property.
 * @param {module:lib/dom/DocletWrapper} This instance.
 */
DocletWrapper.prototype.appendInnerProperty = function(doclet) {
  this.innerProperties.push(doclet);
  return this;
};

// Exports the constructor.
module.exports = DocletWrapper;
