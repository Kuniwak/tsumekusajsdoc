// This script licensed under the MIT.
// http://orgachem.mit-license.org



/**
 * An abstract class for doclet wrapper.  This wrapper has mem
 * @param {jsdoc.Doclet} doclet Doclet to be wrapped.
 * @constructor
 */
var DocletWrapper = function(opt_doclet) {
  if (opt_doclet) {
    this.setOriginalDoclet(opt_doclet);
  }
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


// Exports the constructor.
module.exports = DocletWrapper;
